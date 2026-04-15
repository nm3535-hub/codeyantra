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

            // ── Fetch unused license key ──
            const keySnap = await db.collection("license_keys")
                .where("isUsed", "==", false)
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

            await transporter.sendMail({
                from: `"CodeYantra Technologies" <${godaddyEmail.value()}>`,
                to: targetEmail,
                bcc: "codeyantra.official@gmail.com",
                subject: `FuelMate License Key — ${orderData.pumpName}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
                        <div style="padding: 30px; text-align: center; border-bottom: 3px solid #1a73e8;">
                            <img src="https://firebasestorage.googleapis.com/v0/b/fuelmate-pro-93101.firebasestorage.app/o/codeyantra.png?alt=media&token=0f91bd3c-bd1a-4916-9bd6-9efec602594d"
                                 alt="CodeYantra" style="max-height: 70px; margin-bottom: 10px;">
                            <h1 style="margin: 0; font-size: 26px; color: #1a73e8;">CodeYantra</h1>
                            <p style="margin: 0; font-size: 10px; letter-spacing: 2px; color: #5f6368; font-weight: bold; text-transform: uppercase;">Innovation Labs</p>
                        </div>
                        <div style="padding: 30px;">
                            <p>Hi ${orderData.name}, FuelMate upgrade ke liye shukriya! 🎉</p>
                            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; text-align: center; border: 1px dashed #1a73e8; margin-bottom: 25px;">
                                <p style="margin: 0; color: #5f6368; font-size: 13px; font-weight: bold;">YOUR LICENSE KEY</p>
                                <h2 style="margin: 10px 0; color: #1a73e8; font-family: 'Courier New', monospace; letter-spacing: 4px; font-size: 28px;">${licenseKey}</h2>
                                <p style="margin: 0; color: #777; font-size: 11px;">(FuelMate App > Subscription > Activate)</p>
                            </div>
                            <p>Pump Name: <b>${orderData.pumpName}</b></p>
                            <p>Total Amount Paid: <b>₹${orderData.amount}.00</b></p>
                            <p>Payment ID: <code>${payment.id}</code></p>
                        </div>
                        <div style="padding: 15px 30px; background: #f8f9fa; text-align: center; font-size: 12px; color: #999;">
                            Help chahiye? Telegram: <a href="https://t.me/codeyantrasupportbot">@codeyantrasupportbot</a>
                        </div>
                    </div>
                `
            });

            // ── Batch Update Firestore ──
            const batch = db.batch();
            batch.update(keyDoc.ref, {
                isUsed: true,                   // ✅ BUG FIX: was false
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
            const msg = `🚀 *New FuelMate Sale!*\n\n👤 *Customer:* ${orderData.name}\n⛽ *Pump:* ${orderData.pumpName}\n🏙️ *City:* ${orderData.city}\n💰 *Amount:* ₹${orderData.amount}\n🔑 *Key:* \`${licenseKey}\`\n🆔 *Payment ID:* ${payment.id}`;
            await axios.post(
                `https://api.telegram.org/bot${telegramToken.value()}/sendMessage`,
                { chat_id: telegramChatId.value(), text: msg, parse_mode: "Markdown" }
            );

            return res.status(200).send("Success");

        } catch (error) {
            console.error("Webhook handler error:", error);
            return res.status(500).send(error.message);
        }
    }
);
