"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FuelMateProRefund() {
    return (
        <main>
            <Navbar mode="business" />

            <div className="container policy-container">
                <h1>CodeYantra - Refund and Cancellation Policy</h1>
                <p>This policy applies to the mobile application <strong>CodeYantra</strong> and its digital subscription services.</p>

                <h2>1. Subscription and Charges</h2>
                <p>CodeYantra provides a digital subscription service. Payments made by you ensure continuous access to the special features of the app on a [Monthly/Quarterly/Annual] basis.</p>

                <h2>2. Refund Policy</h2>
                <ul>
                    <li><strong>No Refunds After Payment:</strong> Since our services are digital and access is granted instantly upon payment processing, <strong>no partial or full refunds will be issued under any circumstances</strong> once the payment is processed. Users are requested to fully evaluate the service nature and quality before making a purchase.</li>
                    <li>The absence of app usage during the subscription period does not qualify for a refund.</li>
                </ul>

                <h2>3. Cancellation Policy</h2>
                <ul>
                    <li><strong>Subscription Cancellation:</strong> Users may choose to cancel their subscription at any time.</li>
                    <li><strong>Continuation of Service:</strong> If a user cancels the subscription, they will continue to have access to the special features of the app until the end of the current paid period.</li>
                    <li><strong>No Pro-Rata Refund:</strong> No partial or pro-rata refund will be provided for any unused portion of a subscription term following cancellation.</li>
                </ul>

                <h2>4. Technical Exception</h2>
                <ul>
                    <li><strong>Technical Failure:</strong> Refunds may only be considered in the event of a severe technical failure originating from CodeYantra{`'`}s side, preventing the user from accessing the service for a continuous period exceeding <strong>72 hours</strong>.</li>
                    <li>Any refund under this exception is <strong>solely at the discretion of CodeYantra management</strong>.</li>
                </ul>

                <h2>5. Dispute Resolution</h2>
                <p>For any questions regarding refunds or cancellations, please contact us within <strong>7 days</strong> of the payment date at the following email address:</p>
                <p>Email: <a href="mailto:codeyantra.net@gmail.com">codeyantra.net@gmail.com</a></p>
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
                p, li { font-size: 1.05rem; margin-bottom: 15px; }
                ul { padding-left: 20px; }
                li { margin-bottom: 10px; }
                a { color: #FF8C00; text-decoration: none; font-weight: bold; }
                a:hover { text-decoration: underline; }
            `}</style>
        </main>
    );
}
