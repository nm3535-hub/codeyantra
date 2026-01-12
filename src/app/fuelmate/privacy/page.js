"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FuelMatePrivacy() {
    return (
        <main>
            <Navbar mode="business" />

            <div className="container policy-container">
                <h1>FuelMate - Privacy Policy</h1>
                <p className="date">Last updated November 11, 2025</p>

                <p>This Privacy Notice for Codeyantra ('we', 'us', or 'our'), describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:</p>

                <ul>
                    <li>Visit our website at <a href="http://www.codeyantra.in" target="_blank">http://www.codeyantra.in</a> or any website of ours that links to this Privacy Notice</li>
                    <li>Download and use our mobile application (Fuelmate & Fuelmate Pro), or any other application of ours that links to this Privacy Notice</li>
                    <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                </ul>

                <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
                <p><strong>Personal information you disclose to us.</strong> We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                <p>The personal information we collect may include: names, phone numbers, email addresses, job titles, usernames, passwords, and billing addresses.</p>

                <p><strong>Mobile Device Data.</strong> We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information. This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.</p>

                <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                <p>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>

                <h2>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
                <p>We may share information in specific situations and with specific third parties, particularly for Business Transfers (mergers/sales) or with third-party advertising partners like <strong>Google AdMob</strong>.</p>

                <h2>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
                <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
                <ul>
                    <li><strong>Google Analytics:</strong> We may share your information with Google Analytics to track and analyse the use of the Services.</li>
                </ul>

                <h2>5. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                <p>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>

                <h2>6. HOW CAN YOU CONTACT US?</h2>
                <p>If you have questions or comments about this notice, you may email us at <a href="mailto:codeyantra.net@gmail.com">codeyantra.net@gmail.com</a> or contact us by post at:</p>
                <address>
                    <strong>Codeyantra</strong><br />
                    New Anand Puri<br />
                    Kali sadak<br />
                    Ludhiana, Punjab 141001<br />
                    India
                </address>

            </div>

            <Footer mode="business" />

            <style jsx>{`
                .policy-container {
                    padding: 120px 20px 60px;
                    max-width: 900px;
                    margin: 0 auto;
                    color: #333;
                    line-height: 1.8;
                }
                h1 { color: #FF8008; text-align: center; margin-bottom: 10px; font-weight: 800; font-size: 2.5rem; }
                .date { text-align: center; color: #666; margin-bottom: 40px; font-style: italic; }
                h2 { color: #11998e; border-bottom: 2px solid #FF8008; padding-bottom: 10px; margin-top: 40px; font-size: 1.8rem; font-weight: 700; }
                p, li { font-size: 1.05rem; margin-bottom: 15px; }
                ul { padding-left: 20px; }
                li { margin-bottom: 10px; }
                a { color: #FF8008; text-decoration: none; font-weight: bold; }
                a:hover { text-decoration: underline; }
                address { font-style: normal; margin-top: 10px; color: #555; }
            `}</style>
        </main>
    );
}
