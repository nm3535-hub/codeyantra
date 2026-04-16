const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const axios = require("axios");
const crypto = require("crypto");

admin.initializeApp();

// 🔐 Secrets
const godaddyEmail        = defineSecret("GODADDY_EMAIL");
const godaddyPass         = defineSecret("GODADDY_PASSWORD");
const telegramToken       = defineSecret("TELEGRAM_TOKEN");
const telegramChatId      = defineSecret("TELEGRAM_CHAT_ID");
const razorpayKeyId       = defineSecret("RAZORPAY_KEY_ID");
const razorpayKeySecret   = defineSecret("RAZORPAY_KEY_SECRET");
const razorpayWebhookSecret = defineSecret("RAZORPAY_WEBHOOK_SECRET");

// ─────────────────────────────────────────────────────────────
// 1. CREATE RAZORPAY ORDER
//    Frontend calls this before opening Razorpay checkout.
//    Returns order_id so exact match is possible in webhook.
// ─────────────────────────────────────────────────────────────
exports.createRazorpayOrder = onRequest(
    { secrets: [razorpayKeyId, razorpayKeySecret] },
    async (req, res) => {
        // CORS
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        if (req.method === "OPTIONS") return res.status(204).send("");
        if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

        const { amount, firestoreOrderId } = req.body;

        if (!amount || !firestoreOrderId) {
            return res.status(400).json({ error: "amount aur firestoreOrderId required hai" });
        }

        try {
            // Razorpay API se order create karo
            const rzpRes = await axios.post(
                "https://api.razorpay.com/v1/orders",
                {
                    amount: amount,       // paise mein (e.g. 69900 = ₹699)
                    currency: "INR",
                    receipt: firestoreOrderId.substring(0, 40), // max 40 chars
                },
                {
                    auth: {
                        username: razorpayKeyId.value(),
                        password: razorpayKeySecret.value()
                    }
                }
            );

            const rzpOrder = rzpRes.data;

            // Firestore document mein razorpay_order_id save karo
            await admin.firestore()
                .collection("orders")
                .doc(firestoreOrderId)
                .update({
                    razorpay_order_id: rzpOrder.id,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                });

            return res.status(200).json({
                order_id: rzpOrder.id,
                amount: rzpOrder.amount,
                currency: rzpOrder.currency,
                key: razorpayKeyId.value()
            });

        } catch (err) {
            console.error("Order creation error:", err.response?.data || err.message);
            return res.status(500).json({ error: "Razorpay order create nahi hua" });
        }
    }
);

// ─────────────────────────────────────────────────────────────
// 2. RAZORPAY WEBHOOK HANDLER
//    Razorpay dashboard mein is URL ko register karo.
//    payment.captured event pe license key email karta hai.
// ─────────────────────────────────────────────────────────────
exports.handleRazorpayWebhook = onRequest(
    { secrets: [godaddyEmail, godaddyPass, telegramToken, telegramChatId, razorpayWebhookSecret] },
    async (req, res) => {

        // ── Webhook Signature Verify ──
        const signature = req.headers["x-razorpay-signature"];
        const rawBody   = req.rawBody;

        if (!signature || !rawBody) {
            return res.status(400).send("Missing signature or body");
        }

        const expectedSig = crypto
            .createHmac("sha256", razorpayWebhookSecret.value())
            .update(rawBody)
            .digest("hex");

        if (signature !== expectedSig) {
            console.error("Invalid webhook signature");
            return res.status(400).send("Invalid signature");
        }

        const event   = req.body.event;
        const payment = req.body.payload.payment.entity;

        if (event !== "payment.captured") {
            return res.status(200).send("Ignored");
        }

        try {
            const db = admin.firestore();
            const razorpayOrderId = payment.order_id;

            if (!razorpayOrderId) {
                console.error("order_id missing in payment payload");
                return res.status(400).send("order_id missing");
            }

            // ── Exact order match by razorpay_order_id ──
            const orderSnap = await db.collection("orders")
                .where("razorpay_order_id", "==", razorpayOrderId)
                .limit(1)
                .get();

            if (orderSnap.empty) {
                console.error("No Firestore order found for:", razorpayOrderId);
                return res.status(200).send("Order not found");
            }

            const orderDoc  = orderSnap.docs[0];
            const orderData = orderDoc.data();

            // ── Duplicate webhook protection ──
            if (orderData.status === "success") {
                console.log("Already processed:", razorpayOrderId);
                return res.status(200).send("Already processed");
            }

            const targetEmail = orderData.email;

            // ── Fetch available license key (isUsed:false + available:true) ──
            const keySnap = await db.collection("license_keys")
                .where("isUsed", "==", false)
                .where("available", "==", true)
                .limit(1)
                .get();

            if (keySnap.empty) {
                // Stock khatam — Telegram alert
                await axios.post(
                    `https://api.telegram.org/bot${telegramToken.value()}/sendMessage`,
                    {
                        chat_id: telegramChatId.value(),
                        text: `⚠️ CRITICAL: License keys khatam ho gayi!\n\nCustomer: ${targetEmail}\nPayment ID: ${payment.id}\nAmount: ₹${orderData.amount}`
                    }
                );
                return res.status(500).send("No license keys available");
            }

            const keyDoc    = keySnap.docs[0];
            const licenseKey = keyDoc.data().code_preview;

            // ── Send Email ──
            const transporter = nodemailer.createTransport({
                host: "smtpout.secureserver.net",
                port: 465,
                secure: true,
                auth: {
                    user: godaddyEmail.value(),
                    pass: godaddyPass.value()
                }
            });

            const emailHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;max-width:600px;">

      <!-- Header -->
      <tr><td style="background:#0056b3;padding:28px 30px;text-align:center;">
        <img src="https://firebasestorage.googleapis.com/v0/b/fuelmate-pro-93101.firebasestorage.app/o/codeyantra.png?alt=media&token=0f91bd3c-bd1a-4916-9bd6-9efec602594d"
             alt="CodeYantra Technologies" style="max-height:60px;margin-bottom:10px;display:block;margin-left:auto;margin-right:auto;">
        <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:1px;">CodeYantra Technologies</p>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:35px 30px;">
        <p style="margin:0 0 16px;font-size:16px;color:#333;">Dear ${orderData.name},</p>
        <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6;">
          Thank you for purchasing <strong>FuelMate</strong>. Your payment has been confirmed and your activation key is ready.
        </p>

        <!-- Key Box -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="background:#f0f6ff;border:2px dashed #0056b3;border-radius:8px;padding:24px;text-align:center;">
            <p style="margin:0 0 8px;font-size:12px;font-weight:bold;color:#666;text-transform:uppercase;letter-spacing:1px;">Your Activation Key</p>
            <p style="margin:0 0 10px;font-size:28px;font-weight:bold;color:#0056b3;font-family:'Courier New',monospace;letter-spacing:6px;">${licenseKey}</p>
            <p style="margin:0;font-size:12px;color:#888;">Open FuelMate App &rarr; Subscription &rarr; Activate License</p>
          </td></tr>
        </table>

        <!-- Order Details -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;border-collapse:collapse;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#666;">Petrol Pump Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#333;font-weight:bold;text-align:right;">${orderData.pumpName}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#666;">Amount Paid</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#333;font-weight:bold;text-align:right;">&#8377;${orderData.amount}.00</td></tr>
          <tr><td style="padding:10px 0;font-size:13px;color:#888;">Payment ID</td>
              <td style="padding:10px 0;font-size:13px;color:#888;text-align:right;">${payment.id}</td></tr>
        </table>

        <p style="margin:24px 0 0;font-size:14px;color:#555;line-height:1.6;">
          If you need any help with activation, please contact us on Telegram:
          <a href="https://t.me/codeyantrasupportbot" style="color:#0056b3;text-decoration:none;">@codeyantrasupportbot</a>
        </p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f8f9fa;padding:18px 30px;text-align:center;border-top:1px solid #e0e0e0;">
        <p style="margin:0;font-size:12px;color:#999;">&copy; ${new Date().getFullYear()} CodeYantra Technologies. All rights reserved.</p>
        <p style="margin:4px 0 0;font-size:12px;color:#bbb;">This is a transactional email regarding your purchase.</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;

            const emailText = `Dear ${orderData.name},\n\nThank you for purchasing FuelMate.\n\nYour Activation Key: ${licenseKey}\n\nTo activate: Open FuelMate App > Subscription > Activate License\n\nPetrol Pump: ${orderData.pumpName}\nAmount Paid: Rs.${orderData.amount}.00\nPayment ID: ${payment.id}\n\nNeed help? Contact us on Telegram: @codeyantrasupportbot\n\nCodeYantra Technologies`;

            await transporter.sendMail({
                from: `"CodeYantra Technologies" <${godaddyEmail.value()}>`,
                to: targetEmail,
                bcc: "codeyantra.official@gmail.com",
                replyTo: godaddyEmail.value(),
                subject: `Your FuelMate Activation Key — Order Confirmed`,
                text: emailText,
                html: emailHtml,
                headers: {
                    "X-Mailer": "CodeYantra Mailer",
                    "List-Unsubscribe": `<mailto:${godaddyEmail.value()}?subject=unsubscribe>`
                }
            });

            // ── Batch Update Firestore ──
            const batch = db.batch();
            batch.update(keyDoc.ref, {
                isUsed: false,          // App activation ke liye false rakho — app khud true karega
                available: false,       // Re-assignment rokne ke liye
                status: "assigned",
                assignedTo: targetEmail,
                paymentId: payment.id,
                assignedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            batch.update(orderDoc.ref, {
                status: "success",
                paymentId: payment.id,
                licenseKeySent: licenseKey,
                processedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            await batch.commit();

            // ── Telegram Sale Alert ──
            try {
                const tToken = telegramToken.value();
                const tChat  = telegramChatId.value();
                if (tToken && tChat) {
                    const msg = `🚀 *New FuelMate Sale!*\n\n👤 *Customer:* ${orderData.name}\n⛽ *Pump:* ${orderData.pumpName}\n🏙️ *City:* ${orderData.city}\n💰 *Amount:* ₹${orderData.amount}\n🔑 *Key:* \`${licenseKey}\`\n🆔 *Payment ID:* ${payment.id}`;
                    await axios.post(
                        `https://api.telegram.org/bot${tToken}/sendMessage`,
                        { chat_id: tChat, text: msg, parse_mode: "Markdown" }
                    );
                } else {
                    console.warn("Telegram secrets not set — skipping alert");
                }
            } catch (tgErr) {
                console.error("Telegram alert failed (non-critical):", tgErr.message);
            }

            return res.status(200).send("Success");

        } catch (error) {
            console.error("Webhook handler error:", error);
            return res.status(500).send(error.message);
        }
    }
);
