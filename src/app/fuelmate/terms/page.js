"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FuelMateTerms() {
    return (
        <main>
            <Navbar mode="business" />

            <div className="container policy-container">
                <h1>Terms & Conditions</h1>
                <p className="date">Application: FUELMATE Dip & Density (CODEYANTRA) | Effective Date: 2025-10-28</p>

                <p>These terms and conditions apply to the <strong>Fuelmate Dip & Density app</strong> (hereby referred to as "Application") for mobile devices that was created by <strong>Neeraj Mishra</strong> (hereby referred to as "Service Provider") as an Ad Supported service.</p>

                <p>Upon downloading or utilizing the Application, you are automatically agreeing to the following terms. It is strongly advised that you thoroughly read and understand these terms prior to using the Application. Unauthorized copying, modification of the Application, any part of the Application, or our trademarks is strictly prohibited. Any attempts to extract the source code of the Application, translate the Application into other languages, or create derivative versions are not permitted. All trademarks, copyrights, database rights, and other intellectual property rights related to the Application remain the property of the Service Provider.</p>

                <p>The Service Provider is dedicated to ensuring that the Application is as beneficial and efficient as possible. As such, they reserve the right to modify the Application or charge for their services at any time and for any reason. The Service Provider assures you that any charges for the Application or its services will be clearly communicated to you.</p>

                <p>The Application stores and processes personal data that you have provided to the Service Provider in order to provide the Service. It is your responsibility to maintain the security of your phone and access to the Application. The Service Provider strongly advise against jailbreaking or rooting your phone, which involves removing software restrictions and limitations imposed by the official operating system of your device. Such actions could expose your phone to malware, viruses, malicious programs, compromise your phone{`'`}s security features, and may result in the Application not functioning correctly or at all.</p>

                <p>Please note that the Application utilizes third-party services that have their own Terms and Conditions. Below are the links to the Terms and Conditions of the third-party service providers used by the Application:</p>
                <ul>
                    <li>AdMob</li>
                </ul>

                <p>Please be aware that the Service Provider does not assume responsibility for certain aspects. Some functions of the Application require an active internet connection, which can be Wi-Fi or provided by your mobile network provider. The Service Provider cannot be held responsible if the Application does not function at full capacity due to lack of access to Wi-Fi or if you have exhausted your data allowance.</p>

                <p>If you are using the application outside of a Wi-Fi area, please be aware that your mobile network provider{`'`}s agreement terms still apply. Consequently, you may incur charges from your mobile provider for data usage during the connection to the application, or other third-party charges. By using the application, you accept responsibility for any such charges, including roaming data charges if you use the application outside of your home territory (i.e., region or country) without disabling data roaming.</p>

                <p>The Service Provider may wish to update the application at some point. The application is currently available as per the requirements for the operating system (and for any additional systems they decide to extend the availability of the application to) may change, and you will need to download the updates if you want to continue using the application. The Service Provider does not guarantee that it will always update the application so that it is relevant to you and/or compatible with the particular operating system version installed on your device. However, you agree to always accept updates to the application when offered to you. The Service Provider may also wish to cease providing the application and may terminate its use at any time without providing termination notice to you. Unless they inform you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must cease using the application, and (if necessary) delete it from your device.</p>

                <h2>Changes to These Terms and Conditions</h2>
                <p>The Service Provider may periodically update their Terms and Conditions. Therefore, you are advised to review this page regularly for any changes. The Service Provider will notify you of any changes by posting the new Terms and Conditions on this page.</p>
                <p>These terms and conditions are effective as of 2025-10-28</p>

                <h2>Contact Us</h2>
                <p>If you have any questions or suggestions about the Terms and Conditions, please do not hesitate to contact the Service Provider at <a href="mailto:codeyantra.net@gmail.com">codeyantra.net@gmail.com</a>.</p>
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
                h2 { color: #333; border-bottom: 2px solid #FF8008; padding-bottom: 10px; margin-top: 40px; font-size: 1.8rem; font-weight: 700; }
                p, li { font-size: 1.05rem; margin-bottom: 15px; }
                ul { padding-left: 20px; }
                li { margin-bottom: 10px; }
                a { color: #FF8008; text-decoration: none; font-weight: bold; }
                a:hover { text-decoration: underline; }
            `}</style>
        </main>
    );
}
