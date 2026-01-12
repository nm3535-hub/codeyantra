import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/services.dart';
import 'package:profanity_filter/profanity_filter.dart';

import '../widgets/chat_input_field.dart';
import '../widgets/message_bubble.dart';
import '../models/app_user.dart';
import '../main.dart';
import '../theme/app_theme.dart';

class ChatScreen extends StatefulWidget {
  static const routeName = '/chat';

  final String chatId;
  final String partnerName;
  final String? partnerId; // ✅ Added for viewing contact
  final bool isBot;

  const ChatScreen({
    super.key,
    required this.chatId,
    required this.partnerName,
    this.partnerId,
    this.isBot = false,
  });

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  bool _isUnmasked = false;
  bool _isUploading = false;
  final ScrollController _scrollController = ScrollController();

  // Spam Prevention
  DateTime? _lastMessageTime;
  String? _lastMessageText;
  bool _isMediaLocked = true;

  // Profanity Filter
  late final ProfanityFilter _filter;

  // Message count tracking
  int _myMessageCount = 0;
  int _partnerMessageCount = 0;

  // Auto-scroll state
  bool _isNearBottom = true;

  // ✅ Chat Background Color
  Color _chatBackgroundColor = Colors.white;

  @override
  void initState() {
    super.initState();

    _filter = ProfanityFilter.filterAdditionally([
      'kutta', 'kamine', 'pagal', 'stupid', 'idiot', 'scam', 'fraud',
      'chut', 'lund', 'kill', 'die', 'murder', 'suicide', 'sex',
      'nude', 'naked', 'slut', 'boobs', 'pussy', 'lick'
    ]);

    _isUnmasked = widget.isBot;

    final appState = Provider.of<AppState>(context, listen: false);
    try {
      final existingChat = appState.allChats.firstWhere(
        (chat) => chat.chatId == widget.chatId,
      );
      _isUnmasked = existingChat.isUnmasked;
    } catch (e) {
      debugPrint('Chat not found in AppState: $e');
    }

    if (widget.isBot) {
      _sendBotWelcomeMessage();
    }

    _markMessagesAsRead();
    _scrollController.addListener(_scrollListener);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_scrollListener);
    _scrollController.dispose();
    super.dispose();
  }

  void _scrollListener() {
    if (_scrollController.hasClients) {
      _isNearBottom = _scrollController.offset < 100;
    }
  }

  bool _isMessageSafe(String text) {
    if (_lastMessageTime != null) {
      final difference = DateTime.now().difference(_lastMessageTime!);
      if (difference.inMilliseconds < 1000) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('⏳ Please type slowly! No spamming.')),
        );
        return false;
      }
    }

    if (_lastMessageText == text) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('⚠️ Do not send the same message twice.')),
      );
      return false;
    }

    final linkRegex = RegExp(
      r'(http|https|www\.|[a-zA-Z0-9]+\.(com|in|net|org|xyz))',
      caseSensitive: false,
    );
    if (linkRegex.hasMatch(text)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('🚫 Links are not allowed for safety.'),
          backgroundColor: Colors.red,
        ),
      );
      return false;
    }

    return true;
  }

  void _calculateMediaLock(List<QueryDocumentSnapshot> messages) {
    if (widget.isBot) {
      if (_isMediaLocked) {
        _isMediaLocked = false;
      }
      return;
    }

    final appState = Provider.of<AppState>(context, listen: false);
    final myUid = appState.currentUser.uid;

    int myCount = 0;
    int partnerCount = 0;

    for (var msg in messages) {
      final data = msg.data() as Map<String, dynamic>;
      if (data['type'] == 'text') {
        if (data['senderId'] == myUid) {
          myCount++;
        } else {
          partnerCount++;
        }
      }
    }

    if (_myMessageCount != myCount || _partnerMessageCount != partnerCount) {
      _myMessageCount = myCount;
      _partnerMessageCount = partnerCount;

      bool shouldLock = (myCount < 4 || partnerCount < 4);

      if (_isMediaLocked != shouldLock) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted) {
            setState(() {
              _isMediaLocked = shouldLock;
            });
          }
        });
      }
    }
  }

  Future<String?> _uploadFile(String filePath, String folderName) async {
    try {
      File file = File(filePath);
      if (!file.existsSync()) return null;

      String fileName =
          '${DateTime.now().millisecondsSinceEpoch}_${widget.chatId}';
      Reference ref =
          FirebaseStorage.instance.ref().child('$folderName/$fileName');

      UploadTask uploadTask = ref.putFile(file);
      TaskSnapshot snapshot = await uploadTask;
      return await snapshot.ref.getDownloadURL();
    } catch (e) {
      debugPrint("Upload Error: $e");
      return null;
    }
  }

  Future<void> _handleSend(
    String text, {
    String? attachmentPath,
    String? attachmentType,
  }) async {
    final isAudio = attachmentType == 'audio';

    if (text.trim().isEmpty && attachmentPath == null) return;

    if (attachmentPath != null) {
      if (_isMediaLocked && !widget.isBot) {
        showDialog(
          context: context,
          builder: (ctx) => AlertDialog(
            title: const Text('🔒 Media Locked'),
            content: const Text(
              'To protect users, you must exchange at least 4 text messages each before sending photos or voice notes.',
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('OK'),
              ),
            ],
          ),
        );
        return;
      }
    }

    if (attachmentPath == null && !isAudio) {
      if (!_isMessageSafe(text)) return;
    }

    final appState = Provider.of<AppState>(context, listen: false);
    final currentUserId = appState.currentUser.uid;

    String messageText = text;
    if (text.isNotEmpty) {
      messageText = _filter.censor(text);
    }

    setState(() => _isUploading = true);

    _lastMessageTime = DateTime.now();
    _lastMessageText = text;

    String? downloadUrl;
    String messageType = 'text';

    try {
      if (attachmentPath != null) {
        String folder = isAudio ? 'chat_audio' : 'chat_images';
        downloadUrl = await _uploadFile(attachmentPath, folder);
        if (downloadUrl == null) throw Exception("Upload failed");
        messageType = isAudio ? 'audio' : 'image';
      }

      await FirebaseFirestore.instance
          .collection('chats')
          .doc(widget.chatId)
          .collection('messages')
          .add({
        'senderId': currentUserId,
        'text': messageText,
        'timestamp': FieldValue.serverTimestamp(),
        'isRead': false,
        'type': messageType,
        'attachmentPath': downloadUrl,
      });

      String previewText = messageText.isNotEmpty
          ? messageText
          : (isAudio ? '🎤 Voice message' : '📷 Image');

      await FirebaseFirestore.instance.collection('chats').doc(widget.chatId).set({
        'lastMessage': previewText,
        'lastMessageTime': FieldValue.serverTimestamp(),
        'participants': [currentUserId, widget.chatId.split('_').last],
        'userInfo_$currentUserId': {
          'name': appState.currentUser.displayName,
          'isPaid': appState.currentUser.isPaid
        },
      }, SetOptions(merge: true));

      if (appState.isSoundEnabled) SystemSound.play(SystemSoundType.click);
      if (appState.isVibrationEnabled) HapticFeedback.lightImpact();

      if (_isNearBottom) {
        _scrollToBottom();
      }

      if (widget.isBot) _sendBotReply();
    } catch (e) {
      debugPrint('Send Error: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to send. Please check internet.'),
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isUploading = false);
    }
  }

  Future<void> _sendBotWelcomeMessage() async {
    await Future.delayed(const Duration(milliseconds: 500));
    if (!mounted) return;

    final docs = await FirebaseFirestore.instance
        .collection('chats')
        .doc(widget.chatId)
        .collection('messages')
        .limit(1)
        .get();

    if (docs.docs.isEmpty) {
      await FirebaseFirestore.instance
          .collection('chats')
          .doc(widget.chatId)
          .collection('messages')
          .add({
        'senderId': 'bot',
        'text': 'Hello! I am ${widget.partnerName}. How can I help you?',
        'timestamp': FieldValue.serverTimestamp(),
        'isRead': false,
        'type': 'text',
      });
    }
  }

  Future<void> _markMessagesAsRead() async {
    final appState = Provider.of<AppState>(context, listen: false);
    final currentUserId = appState.currentUser.uid;

    try {
      final unreadMessages = await FirebaseFirestore.instance
          .collection('chats')
          .doc(widget.chatId)
          .collection('messages')
          .where('senderId', isNotEqualTo: currentUserId)
          .where('isRead', isEqualTo: false)
          .get();

      for (var doc in unreadMessages.docs) {
        doc.reference.update({'isRead': true});
      }
    } catch (e) {
      debugPrint('Mark as read error: $e');
    }
  }

  void _toggleUnmask() {
    setState(() => _isUnmasked = !_isUnmasked);

    final appState = Provider.of<AppState>(context, listen: false);
    appState.toggleChatUnmasked(widget.chatId);

    FirebaseFirestore.instance.collection('chats').doc(widget.chatId).set({
      'isUnmasked_${appState.currentUser.uid}': _isUnmasked
    }, SetOptions(merge: true));

    final msg = _isUnmasked
        ? '❤️ Added to favorites!'
        : '💔 Removed from favorites.';

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(msg),
        backgroundColor: _isUnmasked ? Colors.pink : Colors.grey,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _scrollToBottom() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(
        0,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }

  Future<void> _sendBotReply() async {
    await Future.delayed(const Duration(seconds: 1));
    if (!mounted) return;

    final replies = [
      'Interesting!',
      'Tell me more.',
      'Haha!',
      'Really?',
      'That\'s cool! 😊'
    ];

    await FirebaseFirestore.instance
        .collection('chats')
        .doc(widget.chatId)
        .collection('messages')
        .add({
      'senderId': 'bot',
      'text': replies[DateTime.now().second % replies.length],
      'timestamp': FieldValue.serverTimestamp(),
      'isRead': false,
      'type': 'text',
    });
  }

  // ═══════════════════════════════════
  // 📱 VIEW CONTACT INFO
  // ═══════════════════════════════════
  void _viewContactInfo() async {
    if (widget.partnerId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Contact info not available')),
      );
      return;
    }

    try {
      final doc = await FirebaseFirestore.instance
          .collection('users')
          .doc(widget.partnerId)
          .get();

      if (!doc.exists || !mounted) return;

      final userData = doc.data()!;
      
      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: const Text('Contact Info'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Name: ${userData['displayName'] ?? 'Unknown'}'),
              Text('Age: ${userData['age'] ?? 'N/A'}'),
              Text('Gender: ${userData['gender'] ?? 'N/A'}'),
              const SizedBox(height: 10),
              Text('Bio: ${userData['bio'] ?? 'No bio available'}'),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Close'),
            ),
          ],
        ),
      );
    } catch (e) {
      debugPrint('Error fetching contact: $e');
    }
  }

  // ═══════════════════════════════════
  // 📊 CHAT DETAILS (Message Count)
  // ═══════════════════════════════════
  void _showChatDetails() async {
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('chats')
          .doc(widget.chatId)
          .collection('messages')
          .get();

      final totalMessages = snapshot.docs.length;
      final myMessages = snapshot.docs
          .where((doc) =>
              (doc.data()['senderId'] ==
                  Provider.of<AppState>(context, listen: false)
                      .currentUser
                      .uid))
          .length;
      final partnerMessages = totalMessages - myMessages;

      if (!mounted) return;

      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: const Text('Chat Details'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Total Messages: $totalMessages'),
              Text('Your Messages: $myMessages'),
              Text('Partner Messages: $partnerMessages'),
              const SizedBox(height: 10),
              Text(
                _isMediaLocked
                    ? '🔒 Media: Locked (Need ${4 - _myMessageCount} more from you)'
                    : '✅ Media: Unlocked',
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Close'),
            ),
          ],
        ),
      );
    } catch (e) {
      debugPrint('Error: $e');
    }
  }

  // ═══════════════════════════════════
  // 🎨 CHANGE BACKGROUND COLOR
  // ═══════════════════════════════════
  void _changeBackground() {
    final colors = [
      Colors.white,
      Colors.grey.shade100,
      Colors.blue.shade50,
      Colors.green.shade50,
      Colors.pink.shade50,
      Colors.purple.shade50,
    ];

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Choose Background'),
        content: Wrap(
          spacing: 10,
          children: colors.map((color) {
            return GestureDetector(
              onTap: () {
                setState(() {
                  _chatBackgroundColor = color;
                });
                Navigator.pop(ctx);
              },
              child: Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: color,
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  // ═══════════════════════════════════
  // 🗑️ CLEAR CHAT
  // ═══════════════════════════════════
  void _clearChat() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Clear Chat?'),
        content: const Text(
          'This will delete all messages in this conversation. This action cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () async {
              try {
                final snapshot = await FirebaseFirestore.instance
                    .collection('chats')
                    .doc(widget.chatId)
                    .collection('messages')
                    .get();

                for (var doc in snapshot.docs) {
                  await doc.reference.delete();
                }

                Navigator.pop(ctx);
                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('✅ Chat cleared')),
                  );
                }
              } catch (e) {
                debugPrint('Error: $e');
              }
            },
            child: const Text('Clear', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  // ═══════════════════════════════════
  // 🚫 BLOCK USER
  // ═══════════════════════════════════
  void _blockUser() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Block User?'),
        content: const Text('They will not be able to message you.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () async {
              final appState = Provider.of<AppState>(context, listen: false);
              await FirebaseFirestore.instance
                  .collection('users')
                  .doc(appState.currentUser.uid)
                  .update({
                'blockedUsers':
                    FieldValue.arrayUnion([widget.chatId.split('_').last]),
              });

              Navigator.pop(ctx);
              Navigator.pop(context);
              
              if (mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('User blocked')),
                );
              }
            },
            child: const Text('Block', style: TextStyle(color: Colors.orange)),
          ),
        ],
      ),
    );
  }

  // ═══════════════════════════════════
  // 🚨 REPORT USER
  // ═══════════════════════════════════
  void _reportUser() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Report User'),
        content: const Text('Report for inappropriate content?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('✅ Report Submitted')),
              );
            },
            child: const Text('Report', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appState = Provider.of<AppState>(context);

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            CircleAvatar(
              backgroundColor:
                  _isUnmasked ? Colors.pink : theme.colorScheme.primary,
              child: Icon(
                widget.isBot
                    ? Icons.smart_toy_outlined
                    : (_isUnmasked ? Icons.favorite : Icons.masks_outlined),
                color: Colors.white,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.partnerName,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    _isUnmasked ? 'Favorite Contact' : 'Anonymous',
                    style: TextStyle(
                      fontSize: 12,
                      color: theme.colorScheme.onPrimary.withOpacity(0.8),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        backgroundColor: theme.colorScheme.primary,
        foregroundColor: Colors.white,
        actions: [
          if (_isUploading)
            const Padding(
              padding: EdgeInsets.all(12.0),
              child: SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(
                  color: Colors.white,
                  strokeWidth: 2,
                ),
              ),
            ),
          if (!widget.isBot)
            IconButton(
              icon: Icon(
                _isUnmasked ? Icons.favorite : Icons.favorite_border,
                color: _isUnmasked ? Colors.pink.shade200 : Colors.white,
              ),
              onPressed: _toggleUnmask,
            ),
          
          // ✅ COMPLETE MENU
          PopupMenuButton<String>(
            icon: const Icon(Icons.more_vert, color: Colors.white),
            onSelected: (value) {
              switch (value) {
                case 'view_contact':
                  _viewContactInfo();
                  break;
                case 'chat_details':
                  _showChatDetails();
                  break;
                case 'change_background':
                  _changeBackground();
                  break;
                case 'clear_chat':
                  _clearChat();
                  break;
                case 'block':
                  _blockUser();
                  break;
                case 'report':
                  _reportUser();
                  break;
              }
            },
            itemBuilder: (context) => [
              if (!widget.isBot)
                const PopupMenuItem(
                  value: 'view_contact',
                  child: Row(
                    children: [
                      Icon(Icons.person, size: 20),
                      SizedBox(width: 10),
                      Text('View Contact'),
                    ],
                  ),
                ),
              const PopupMenuItem(
                value: 'chat_details',
                child: Row(
                  children: [
                    Icon(Icons.info_outline, size: 20),
                    SizedBox(width: 10),
                    Text('Chat Details'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'change_background',
                child: Row(
                  children: [
                    Icon(Icons.color_lens, size: 20),
                    SizedBox(width: 10),
                    Text('Change Background'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'clear_chat',
                child: Row(
                  children: [
                    Icon(Icons.delete_sweep, size: 20),
                    SizedBox(width: 10),
                    Text('Clear Chat'),
                  ],
                ),
              ),
              if (!widget.isBot) ...[
                const PopupMenuDivider(),
                const PopupMenuItem(
                  value: 'block',
                  child: Row(
                    children: [
                      Icon(Icons.block, size: 20, color: Colors.orange),
                      SizedBox(width: 10),
                      Text('Block User', style: TextStyle(color: Colors.orange)),
                    ],
                  ),
                ),
                const PopupMenuItem(
                  value: 'report',
                  child: Row(
                    children: [
                      Icon(Icons.report, size: 20, color: Colors.red),
                      SizedBox(width: 10),
                      Text('Report User', style: TextStyle(color: Colors.red)),
                    ],
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
      body: Container(
        color: _chatBackgroundColor, // ✅ Dynamic Background
        child: Column(
          children: [
            if (_isUnmasked)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 8),
                color: Colors.pink.shade50,
                child: const Text(
                  '❤️ Favorite Contact',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.pink,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),

            if (_isMediaLocked && !widget.isBot)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 4),
                color: Colors.amber.shade100,
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.lock, size: 12, color: Colors.brown),
                    SizedBox(width: 4),
                    Text(
                      '🔒 Chat more to unlock Photos & Audio',
                      style: TextStyle(
                        fontSize: 11,
                        color: Colors.brown,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),

            Expanded(
              child: StreamBuilder<QuerySnapshot>(
                stream: FirebaseFirestore.instance
                    .collection('chats')
                    .doc(widget.chatId)
                    .collection('messages')
                    .orderBy('timestamp', descending: true)
                    .snapshots(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }

                  if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                    return const Center(
                      child: Text('No messages yet. Say Hi! 👋'),
                    );
                  }

                  final messages = snapshot.data!.docs;
                  _calculateMediaLock(messages);

                  return ListView.builder(
                    reverse: true,
                    controller: _scrollController,
                    itemCount: messages.length,
                    itemBuilder: (ctx, idx) {
                      final msgData = messages[idx].data() as Map<String, dynamic>;
                      final messageId = messages[idx].id;

                      return MessageBubble(
                        key: ValueKey(messageId),
                        text: msgData['text'] ?? '',
                        isMe: msgData['senderId'] == appState.currentUser.uid,
                        attachmentPath: msgData['attachmentPath'],
                        attachmentType: msgData['type'] == 'image'
                            ? 'image'
                            : (msgData['type'] == 'audio' ? 'audio' : null),
                        isRead: msgData['isRead'] ?? false,
                      );
                    },
                  );
                },
              ),
            ),

            ChatInputField(
              onSend: (text, {attachmentPath, attachmentType}) {
                _handleSend(
                  text,
                  attachmentPath: attachmentPath,
                  attachmentType: attachmentType,
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}