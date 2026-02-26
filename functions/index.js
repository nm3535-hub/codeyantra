const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Tijori (Secrets) ke labels define kar rahe hain
const godaddyEmail = defineSecret("GODADDY_EMAIL");
const godaddyPass = defineSecret("GODADDY_PASSWORD");

exports.handleRazorpayWebhook = onRequest(
    { secrets: [godaddyEmail, godaddyPass] }, // In secrets ka access de rahe hain
    async (req, res) => {
        // Razorpay se aane wala data
        const event = req.body.event;
        const payment = req.body.payload.payment.entity;
        const userEmail = payment.email;

        // Sirf tabhi kaam karo jab payment confirm ho jaye
        if (event === "payment.captured") {
            try {
                const db = admin.firestore();

                // 1. GoDaddy SMTP Transporter Setup
                const transporter = nodemailer.createTransport({
                    host: 'smtpout.secureserver.net',
                    port: 465,
                    secure: true,
                    auth: {
                        user: godaddyEmail.value(),
                        pass: godaddyPass.value()
                    }
                });

                // 2. Firestore se ek unused license key uthao
                const snapshot = await db.collection("license_keys") // 'licenses' ko 'license_keys' karein
                .where("isUsed", "==", false)
                .limit(1)
                .get();

                if (snapshot.empty) {
                    console.error("No license keys left in database!");
                    return res.status(500).send("No keys available");
                }

                const doc = snapshot.docs[0];
                const licenseKey = doc.data().code_preview;
                // 3. Professional HTML Email bhejo
                await transporter.sendMail({
                    from: `"CodeYantra Support" <${godaddyEmail.value()}>`,
                    to: userEmail,
                    subject: 'FuelMate - Your License Key is Here! 🔑',
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
                            <h2 style="color: #0056b3;">Thank you for your purchase!</h2>
                            <p>Hello,</p>
                            <p>Your payment for <b>FuelMate Pro 360</b> was successful. Below is your official license key:</p>
                            <div style="background: #f4f4f4; padding: 20px; font-size: 24px; font-weight: bold; color: #d35400; border: 2px dashed #bbb; border-radius: 8px; text-align: center; margin: 20px 0;">
                                ${licenseKey}
                            </div>
                            <p><b>Validity:</b> 1 Year from activation.</p>
                            <p><b>How to activate:</b> Open your FuelMate Mobile app, go to Subscription Page > License, and enter this key.</p>
                            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                            <p style="font-size: 12px; color: #777;">If you have any questions, reply to this email or contact support@codeyantra.in</p>
                            <p>Best Regards,<br><b>Team CodeYantra</b></p>
                        </div>
                    `
                });

                // 4. Key ko 'Used' mark karo taaki ye dobara kisi ko na jaye
                await doc.ref.update({
                    isUsed: true,
                    assignedTo: userEmail,
                    paymentId: payment.id,
                    usedAt: admin.firestore.FieldValue.serverTimestamp()
                });

                console.log(`Success: Key ${licenseKey} sent to ${userEmail}`);
                return res.status(200).send("Email Sent Successfully");

            } catch (error) {
                console.error("Error processing request:", error);
                return res.status(500).send("Internal Server Error");
            }
        }

        // Agar koi aur event hai (jaise payment.failed) toh bas OK bol do
        res.status(200).send("Event ignored");
    }
);