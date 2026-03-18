const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const axios = require("axios"); // Telegram ke liye axios add kiya hai

admin.initializeApp();

const godaddyEmail = defineSecret("GODADDY_EMAIL");
const godaddyPass = defineSecret("GODADDY_PASSWORD");

// 🛡️ Telegram Bot Details (Yahan apni details bharein)
const TELEGRAM_TOKEN = "";
const TELEGRAM_CHAT_ID = "";

exports.handleRazorpayWebhook = onRequest(
    { secrets: [godaddyEmail, godaddyPass] },
    async (req, res) => {
        const event = req.body.event;
        const payment = req.body.payload.payment.entity;

        if (event === "payment.captured") {
            try {
                const db = admin.firestore();

                // 1. Fetch Latest Pending Order
                const orderSnapshot = await db.collection("orders")
                    .where("status", "==", "pending")
                    .orderBy("timestamp", "desc")
                    .limit(1)
                    .get();

                if (orderSnapshot.empty) return res.status(200).send("No pending order");

                const orderDoc = orderSnapshot.docs[0];
                const orderData = orderDoc.data();
                const targetEmail = orderData.email;

                // 2. Fetch Unused License Key
                const keySnapshot = await db.collection("license_keys")
                    .where("isUsed", "==", false).limit(1).get();
                
                if (keySnapshot.empty) {
                    // 🚨 Stock khatam ho gaya toh alert bhejo
                    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                        chat_id: TELEGRAM_CHAT_ID,
                        text: "⚠️ ALERT: License keys exhausted! Customer paid but didn't get a key."
                    });
                    return res.status(500).send("No keys available");
                }
                
                const keyDoc = keySnapshot.docs[0];
                const licenseKey = keyDoc.data().code_preview;

                // 3. SMTP Setup (GoDaddy/Zoho)
                const transporter = nodemailer.createTransport({
                    host: 'smtpout.secureserver.net',
                    port: 465,
                    secure: true,
                    auth: {
                        user: godaddyEmail.value(),
                        pass: godaddyPass.value()
                    }
                });

                // 4. Send Email with BCC Tracking
                await transporter.sendMail({
                    from: `"CodeYantra Technologies" <${godaddyEmail.value()}>`,
                    to: targetEmail,
                    bcc: "codeyantra.official@gmail.com", // Aapki tracking mail
                    subject: `Invoice & License Key: ${orderData.pumpName}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
                            <div style="padding: 30px; text-align: center; border-bottom: 3px solid #1a73e8;">
                                <img src="https://firebasestorage.googleapis.com/v0/b/fuelmate-pro-93101.firebasestorage.app/o/codeyantra.png?alt=media&token=0f91bd3c-bd1a-4916-9bd6-9efec602594d" 
                                     alt="CodeYantra" style="max-height: 70px; margin-bottom: 10px;">
                                <h1 style="margin: 0; font-size: 26px; color: #1a73e8;">CodeYantra</h1>
                                <p style="margin: 0; font-size: 10px; letter-spacing: 2px; color: #5f6368; font-weight: bold; text-transform: uppercase;">Innovation Labs</p>
                            </div>
                            
                            <div style="padding: 30px;">
                                <p>Hi ${orderData.name}, thanks for upgrading to FuelMate Pro!</p>
                                <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; text-align: center; border: 1px dashed #1a73e8; margin-bottom: 25px;">
                                    <p style="margin: 0; color: #5f6368; font-size: 13px; font-weight: bold;">YOUR LICENSE KEY</p>
                                    <h2 style="margin: 10px 0; color: #1a73e8; font-family: 'Courier New', monospace; letter-spacing: 4px; font-size: 28px;">${licenseKey}</h2>
                                    <p style="margin: 0; color: #777; font-size: 11px;">(Open FuelMate App > Subscription > Activate)</p>
                                </div>
                                <p>Total Amount Paid: <b>₹${orderData.amount}.00</b></p>
                            </div>
                        </div>
                    `
                });

                // 5. Database Batch Update
                const batch = db.batch();
                batch.update(keyDoc.ref, {
                    isUsed: false, // User app se true karega
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

                // 🚀 6. Telegram Instant Alert
                const msg = `🚀 *New Sale Alert!*\n\n👤 *Customer:* ${orderData.name}\n⛽ *Pump:* ${orderData.pumpName}\n💰 *Amount:* ₹${orderData.amount}\n🔑 *Key:* ${licenseKey}`;
                await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                    chat_id: TELEGRAM_CHAT_ID,
                    text: msg,
                    parse_mode: "Markdown"
                });

                return res.status(200).send("Success");

            } catch (error) {
                console.error("System Error:", error);
                return res.status(500).send(error.message);
            }
        }
        res.status(200).send("OK");
    }
);
