"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
    return (
        <main>
            <Navbar mode="home" />

            <div className="container policy-container">
                <h1>CodeYantra - Privacy Policy</h1>
                <p className="date">Last updated November 11, 2025</p>

                <p>This Privacy Notice for Codeyantra ('we', 'us', or 'our'), describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:</p>

                <ul>
                    <li>Visit our website at <a href="http://www.codeyantra.in" target="_blank">http://www.codeyantra.in</a> or any website of ours that links to this Privacy Notice</li>
                    <li>Download and use our mobile application (Fuelmate & Fuelmate Pro), or any other application of ours that links to this Privacy Notice</li>
                    <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                </ul>

                <h2>1. PRIVACY SUMMARY</h2>
                <p>We respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website or use our apps.</p>

                <h2>2. WHAT INFORMATION DO WE COLLECT?</h2>
                <p><strong>Personal information you disclose to us.</strong> We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                <p>The personal information we collect may include: names, phone numbers, email addresses, job titles, usernames, passwords, and billing addresses.</p>

                <h2>3. SECURITY</h2>
                <p>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>

                <h2>4. CONTACT US</h2>
                <p>If you have questions or comments about this notice, you may email us at <a href="mailto:codeyantra.net@gmail.com">codeyantra.net@gmail.com</a> or contact us by post at:</p>
                <address>
                    <strong>Codeyantra</strong><br />
                    New Anand Puri<br />
                    Kali sadak<br />
                    Ludhiana, Punjab 141001<br />
                    India
                </address>

            </div>

            <Footer />

            <style jsx>{`
                .policy-container {
                    padding: 120px 20px 60px;
                    max-width: 900px;
                    margin: 0 auto;
                    color: #333;
                    line-height: 1.8;
                }
                h1 { color: #d4af37; text-align: center; margin-bottom: 10px; font-weight: 800; font-size: 2.5rem; }
                .date { text-align: center; color: #666; margin-bottom: 40px; font-style: italic; }
                h2 { color: #1a2238; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 40px; font-size: 1.8rem; font-weight: 700; }
                p, li { font-size: 1.05rem; margin-bottom: 15px; }
                ul { padding-left: 20px; }
                li { margin-bottom: 10px; }
                a { color: #d4af37; text-decoration: none; font-weight: bold; }
                a:hover { text-decoration: underline; }
                address { font-style: normal; margin-top: 10px; color: #555; }
            `}</style>
        </main>
    );
}
