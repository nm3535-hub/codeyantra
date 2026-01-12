"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MaskChatPrivacy() {
    return (
        <main>
            <Navbar mode="entertainment" />

            <div className="container policy-container">
                <h1>MaskChat Legal Center</h1>
                <p className="date">Effective Date: December 09, 2025</p>
                <p>Welcome to <strong>MaskChat</strong>. Please read these Terms and Policies carefully into before using our application. By downloading or using the app, you agree to be bound by these terms.</p>

                <h2>1. Privacy Policy</h2>
                <p>This Privacy Policy explains how CodeYantra ("Service Provider", "we", "us") collects, uses, and protects your information.</p>

                <h3>1.1 Information We Collect</h3>
                <ul>
                    <li><strong>Location Data (Precise & Coarse):</strong> We collect your location data <em>only</em> when you actively use the "Shake & Connect" feature to find nearby users. This data is used for real-time matching and is not stored historically on our servers.</li>
                    <li><strong>Camera & Gallery Access:</strong> We request access to your device's camera and photo gallery to allow you to upload profile pictures or send images in chat. This data is only accessed when you explicitly choose to upload an image.</li>
                    <li><strong>Sensor Data (Accelerometer):</strong> We access your device's sensors (accelerometer/gyroscope) solely to detect the "Shake" gesture required to connect with new users. This sensor data is processed locally on your device.</li>
                    <li><strong>User Generated Content (UGC):</strong> Messages, profile photos, and other content you generate are processed securely through Google Firebase to enable chat functionality.</li>
                    <li><strong>Device & Identifiers:</strong> We collect IP addresses, Device IDs, and Advertising IDs to prevent fraud, enforce bans, and serve personalized advertisements.</li>
                </ul>

                <h3>1.2 How We Use Your Data</h3>
                <p>Your data is used to:</p>
                <ul>
                    <li>Provide core functionality (messaging, matching nearby users).</li>
                    <li>Maintain safety and security (detecting spam, banning abusive users).</li>
                    <li>Display advertisements via Google AdMob (to keep the app free).</li>
                </ul>

                <h3>1.3 Account Deletion & Data Rights</h3>
                <div className="info-box">
                    <strong>Instant Deletion:</strong> You have the right to delete your account and all associated data instantly. Go to <strong>Settings &gt; Delete Account</strong> within the app. This action is irreversible and permanently removes your profile, chats, and media from our servers immediately.<br /><br />
                    <strong>Web Request:</strong> If you are unable to access the app or wish to request deletion remotely, please contact us at <a href="mailto:support@codeyantra.in">support@codeyantra.in</a> with the subject line "Account Deletion Request". We will process your request within the legally required timeframe.
                </div>

                <h2>2. Advertising & Monetization</h2>
                <p>MaskChat is a Freemium service supported by advertisements.</p>
                <ul>
                    <li><strong>Google AdMob:</strong> We use Google AdMob to serve ads. AdMob may use your device{`'`}s Advertising ID to show personalized ads based on your interests.</li>
                    <li><strong>Opt-Out:</strong> You can opt-out of personalized tracking in your device settings (Settings &gt; Google &gt; Ads &gt; Delete Advertising ID).</li>
                </ul>

                <h2>3. Child Safety & Zero Tolerance (CSAE)</h2>
                <div className="alert-box">
                    ⚠️ STRICT POLICY: CHILD SEXUAL ABUSE MATERIAL (CSAM) IS PROHIBITED.
                </div>
                <p>We are committed to the safety of minors. Our platform is strictly for users aged <strong>13 and above</strong>.</p>
                <ul>
                    <li><strong>Automated Detection:</strong> We utilize automated moderation tools to detect and block nudity and CSAM in profile images.</li>
                    <li><strong>Reporting to Authorities:</strong> If any CSAM is detected, we will preserve the data and report it to the <strong>National Center for Missing & Exploited Children (NCMEC)</strong> and relevant law enforcement agencies immediately.</li>
                    <li><strong>Permanent Ban:</strong> Any user involved in such activities will be permanently banned and their device ID blocked.</li>
                </ul>

                <h2>4. Terms of Service & Acceptable Use</h2>
                <p>By using MaskChat, you agree to conduct yourself responsibly. The following behaviors are strictly prohibited:</p>
                <ul>
                    <li><strong>Harassment & Bullying:</strong> Do not engage in targeted abuse or harassment.</li>
                    <li><strong>Hate Speech:</strong> Content promoting violence or hatred against individuals or groups based on race, religion, gender, or orientation is forbidden.</li>
                    <li><strong>Illegal Activities:</strong> Do not use the app for scams, fraud, or selling illegal goods.</li>
                    <li><strong>Impersonation:</strong> Do not pretend to be someone else or a representative of MaskChat.</li>
                </ul>

                <p><strong>Enforcement:</strong> We reserve the right to suspend or terminate your account without notice if you violate these terms. Users can report or block abusive users directly from the chat screen.</p>

                <h2>5. Limitation of Liability & Indemnification</h2>
                <p><strong>Use at Your Own Risk:</strong> The Service Provider is not responsible for the actions, content, information, or data of third parties (other users). You utilize the app at your own risk.</p>
                <p><strong>No Warranty:</strong> The Application is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, whether express or implied.</p>
                <p><strong>Limitation of Liability:</strong> To the maximum extent permitted by law, the Service Provider shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>

                <h2>6. Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of <strong>India</strong>.</p>

                <h2>7. Contact Us</h2>
                <p>If you have any questions about these Terms or our Privacy Policy, please contact us:</p>
                <p><strong>Email:</strong> <a href="mailto:support@codeyantra.in">support@codeyantra.in</a></p>
                <p><strong>Developer:</strong> CodeYantra Solutions</p>
            </div>

            <Footer mode="entertainment" />

            <style jsx>{`
                .policy-container {
                    padding: 120px 20px 60px;
                    max-width: 900px;
                    margin: 0 auto;
                    color: #333;
                    line-height: 1.8;
                }
                h1 { color: #4A00E0; text-align: center; margin-bottom: 10px; font-weight: 800; font-size: 2.5rem; }
                .date { text-align: center; color: #666; margin-bottom: 40px; font-style: italic; }
                h2 { color: #333; border-bottom: 2px solid #4A00E0; padding-bottom: 10px; margin-top: 40px; font-size: 1.8rem; font-weight: 700; }
                h3 { color: #555; margin-top: 25px; font-size: 1.3rem; font-weight: 600; }
                p, li { font-size: 1.05rem; margin-bottom: 15px; }
                ul { padding-left: 20px; }
                li { margin-bottom: 10px; }
                
                .alert-box {
                    background-color: #ffebee;
                    border-left: 5px solid #d32f2f;
                    padding: 20px;
                    margin: 30px 0;
                    color: #b71c1c;
                    font-weight: bold;
                    border-radius: 5px;
                }
                .info-box {
                    background-color: #e3f2fd;
                    border-left: 5px solid #1976d2;
                    padding: 20px;
                    margin: 30px 0;
                    color: #0d47a1;
                    border-radius: 5px;
                }
                a { color: #4A00E0; text-decoration: none; font-weight: bold; }
                a:hover { text-decoration: underline; }
            `}</style>
        </main>
    );
}
