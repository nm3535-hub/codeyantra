"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FuelMateProTerms() {
    return (
        <main>
            <Navbar mode="business" />

            <div className="container policy-container">
                <h1>CodeYantra - Terms and Conditions</h1>

                <p>These terms and conditions outline the rules and regulations for the use of CodeYantra{`'`}s Website, located at <strong>www.codeyantra.in</strong>.</p>
                <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use <strong>www.codeyantra.in</strong> if you do not agree to take all of the terms and conditions stated on this page.</p>

                <h2>Cookies</h2>
                <p>We employ the use of cookies. By accessing <strong>www.codeyantra.in</strong>, you agreed to use cookies in agreement with the CodeYantra{`'`}s Privacy Policy.</p>

                <h2>License</h2>
                <p>Unless otherwise stated, <strong>CodeYantra</strong> and/or its licensors own the intellectual property rights for all material on <strong>www.codeyantra.in</strong>. All intellectual property rights are reserved. You may access this from <strong>www.codeyantra.in</strong> for your own personal use subjected to restrictions set in these terms and conditions.</p>

                <h3>You must not:</h3>
                <ul>
                    <li>Republish material from www.codeyantra.in</li>
                    <li>Sell, rent or sub-license material from www.codeyantra.in</li>
                    <li>Reproduce, duplicate or copy material from www.codeyantra.in</li>
                    <li>Redistribute content from www.codeyantra.in</li>
                </ul>

                <h2>Content Liability</h2>
                <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website.</p>

                <h2>Disclaimer</h2>
                <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.</p>
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
                h1 { color: #FF8C00; text-align: center; margin-bottom: 10px; font-weight: 800; font-size: 2.5rem; }
                h2 { color: #000080; border-bottom: 2px solid #FF8C00; padding-bottom: 10px; margin-top: 40px; font-size: 1.8rem; font-weight: 700; }
                h3 { color: #333; margin-top: 25px; font-size: 1.3rem; font-weight: 600; }
                p, li { font-size: 1.05rem; margin-bottom: 15px; }
                ul { padding-left: 20px; }
                li { margin-bottom: 10px; }
            `}</style>
        </main>
    );
}
