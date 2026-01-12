"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function FuelMatePro() {
    return (
        <main>
            <Navbar mode="business" />

            <section className="hero-fuel">
                <div className="container center">
                    <img src="/assets/app_screenshot_2.png" alt="FuelMate Pro Icon" className="hero-logo" />

                    <h1>FuelMate Pro</h1>
                    <p className="hero-desc">
                        The Ultimate ERP Solution for Fuel Stations. Manage Sales, Stocks, and Payments with military-grade precision.
                    </p>

                    <div className="launch-badge">
                        <span className="dot"></span>
                        <span>Launching Very Soon</span>
                    </div>
                </div>
            </section>

            <section id="features" className="section-light">
                <div className="container">
                    <div className="section-header center">
                        <p className="label-teal">POWERFUL FEATURES</p>
                        <h2 className="title-dark">Everything You Need to Run a Pump</h2>
                    </div>

                    <div className="features-grid">
                        <FeatureCard icon="🛡️" title="Secure PIN Access" desc="Keep your data safe with PIN-verified login. Only authorized personnel can access sensitive sales data and settings." />
                        <FeatureCard icon="⛽" title="Premium Fuel & Lubes" desc="Track sales for Petrol, Diesel, XP95/Power, and Lubricants separately. Dedicated modules for every product type." />
                        <FeatureCard icon="💳" title="Payment Mode Tracking" desc="Know exactly how much you earned via Cash, Card, UPI, or Credit. Reconcile accounts effortlessly at the end of the day." />
                        <FeatureCard icon="📈" title="Daily Price Updates" desc="Set daily fuel prices instantly. The app automatically recalculates sales value based on the new rates." />
                        <FeatureCard icon="📄" title="Professional Reports" desc="Generate detailed PDF and Excel (CSV) reports. Share directly with partners or CA via WhatsApp/Email." />
                        <FeatureCard icon="☁️" title="Google Drive Sync" desc="Never lose data. Backup your entire database to Google Drive and restore it anytime on any device." />
                    </div>
                </div>
            </section>

            <section id="pricing" className="section pricing-section">
                <div className="container">
                    <div className="section-header center">
                        <h2 className="title-dark">Transparent Pricing</h2>
                        <p className="desc-gray">Choose the plan that fits your business scale.</p>
                    </div>

                    <div className="pricing-grid">
                        <PricingCard
                            title="Basic"
                            price="₹149"
                            period="per month/User"
                            features={['Basic Inventory', 'Daily Sales Report', 'Secure Access']}
                            btnText="Join Waitlist"
                            link="mailto:support@codeyantra.in"
                        />
                        <PricingCard
                            title="Standard"
                            price="₹399"
                            period="per Quarter/User"
                            features={['All Basic Features', 'Real-time Tracking', '24/7 Priority Support']}
                            btnText="Join Waitlist"
                            link="mailto:support@codeyantra.in"
                            featured={true}
                        />
                        <PricingCard
                            title="Enterprise"
                            price="₹1,399"
                            period="One Time / Lifetime"
                            features={['Full ERP Access', 'On-site Training', 'Dedicated Manager']}
                            btnText="Contact Sales"
                            link="mailto:support@codeyantra.in"
                        />
                    </div>
                </div>
            </section>

            <section className="cta-dark center">
                <h2>🚀 Coming Soon to Your Pocket</h2>
                <p>We are in the final stages of testing. Get ready for the revolution.</p>
                <Link href="#contact" className="btn-notify">Notify Me</Link>
            </section>

            <Footer mode="business" />

            <style jsx>{`
        :global(:root) {
            --fuel-primary: #11998e;
            --fuel-secondary: #38ef7d;
        }
        .hero-fuel {
            background: linear-gradient(135deg, var(--fuel-primary), var(--fuel-secondary));
            padding: 160px 0 100px;
            color: white;
            text-align: center;
        }
        .hero-logo {
            width: 120px; background: white; border-radius: 30px; padding: 10px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); margin-bottom: 20px;
        }
        .hero-fuel h1 { font-size: 3.5rem; margin: 10px 0; font-weight: 700; }
        .hero-desc { font-size: 1.3rem; max-width: 700px; margin: 0 auto 30px; opacity: 0.95; line-height: 1.6; }
        
        .launch-badge {
            display: inline-flex; align-items: center; 
            background: rgba(255,255,255,0.2); padding: 10px 25px; border-radius: 50px;
        }
        .dot { width: 10px; height: 10px; background: #fff; border-radius: 50%; margin-right: 10px; animation: pulse 2s infinite; }
        
        .section-light { background: #f9fcfb; padding: 80px 0; }
        .section-header { margin-bottom: 40px; }
        .center { text-align: center; }
        .label-teal { color: var(--fuel-primary); font-weight: bold; text-transform: uppercase; margin-bottom: 1rem; }
        .title-dark { color: #333; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
        .desc-gray { color: #666; font-size: 1.1rem; }

        .features-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;
        }

        .pricing-section { padding: 80px 0; background: white; }
        .pricing-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px;
        }

        .cta-dark { background: #333; color: white; padding: 60px 20px; }
        .cta-dark h2 { margin-bottom: 1rem; }
        .cta-dark p { opacity: 0.8; margin-bottom: 2rem; }
        .btn-notify {
            background: white; color: #1A2238; padding: 1rem 2.5rem; 
            border-radius: 50px; text-decoration: none; font-weight: 800;
            display: inline-block; text-transform: uppercase; letter-spacing: 0.5px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2); transition: 0.3s;
        }
        .btn-notify:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0,0,0,0.3); color: black; }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
      `}</style>
        </main>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="feature-card">
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <style jsx>{`
                .feature-card {
                    background: white; padding: 30px; border-radius: 20px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.05); transition: transform 0.3s;
                }
                .feature-card:hover { transform: translateY(-5px); }
                .icon { font-size: 2rem; margin-bottom: 15px; }
                h3 { color: #333; margin-bottom: 10px; font-weight: 600; }
                p { color: #666; line-height: 1.6; }
            `}</style>
        </div>
    );
}

function PricingCard({ title, price, period, features, btnText, link, featured }) {
    return (
        <div className={`pricing-card ${featured ? 'featured' : ''}`}>
            <h3>{title}</h3>
            <p className="price">{price}</p>
            <p className="period">{period}</p>
            <ul>
                {features.map((f, i) => <li key={i}>✓ {f}</li>)}
            </ul>
            <a href={link} className="btn-price">{btnText}</a>

            <style jsx>{`
                .pricing-card {
                    background: white; padding: 30px; border-radius: 20px; text-align: center;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 2px solid transparent;
                }
                .featured {
                    background: #11998e; color: white; transform: scale(1.05);
                    box-shadow: 0 15px 40px rgba(17, 153, 142, 0.2);
                }
                h3 { color: inherit; font-size: 1.5rem; margin-bottom: 10px; font-weight: 600; }
                .price { font-size: 2.5rem; font-weight: bold; margin: 10px 0; color: inherit; }
                .period { opacity: 0.8; margin-bottom: 20px; font-size: 0.9rem; }
                
                ul { text-align: left; list-style: none; padding: 0; margin-bottom: 30px; }
                li { margin-bottom: 10px; color: inherit; display: flex; align-items: center; gap: 10px; opacity: 0.9; }
                
                .btn-price {
                    background: ${featured ? 'white' : '#11998e'};
                    color: ${featured ? '#11998e' : 'white'};
                    padding: 12px 25px; border-radius: 50px; font-weight: bold;
                    display: inline-block; text-decoration: none;
                    transition: 0.3s;
                }
                .btn-price:hover { transform: scale(1.05); opacity: 0.9; }
            `}</style>
        </div>
    );
}
