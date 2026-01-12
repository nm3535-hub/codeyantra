"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function FuelMate() {
    return (
        <main>
            <Navbar mode="business" />

            <section className="hero-fuel">
                <div className="container center">
                    <img src="/assets/app_screenshot_1.png" alt="FuelMate Icon" className="hero-logo" />

                    <h1>FuelMate</h1>
                    <p className="hero-desc">
                        Advanced Dip & Density Calculator for Indian OMCs. <br />
                        Accurate measurements for MS, HSD, and E20 Petrol.
                    </p>

                    <a href="https://play.google.com/store/apps/details?id=com.codeyantra.fuelmate" target="_blank" className="btn-download">
                        Download on Google Play
                    </a>
                </div>
            </section>

            <section id="features" className="section-white">
                <div className="container">
                    <div className="section-header center">
                        <p className="label-orange">WHY CHOOSE FUELMATE?</p>
                        <h2 className="title-dark">Precision for Every Tank</h2>
                    </div>

                    <div className="features-grid">
                        <FeatureCard icon="🛢️" title="No Manual Entry Required" desc="Forget entering Tank Diameter and Height manually. We have pre-set calibration data for all standard tanks. Just select your tank size and enter the dip." />
                        <FeatureCard icon="📏" title="Unique Tank Sizes" desc="We support rare tank capacities that other apps miss. Get accurate charts for 10KL, 15KL, 20KL, 22KL, 45KL, and 70KL tanks instantly." />
                        <FeatureCard icon="🧮" title="Advanced Density Calc" desc="Calculate density at 15°C with precision. Fully compatible with MS (Petrol), HSD (Diesel), and XP95/E20 blends." />
                        <FeatureCard icon="⛽" title="Indian OMC Ready" desc="Tailored for IOCL, BPCL, and HPCL dealers. Our algorithms align with official charts to ensure your stock reconciliation is perfect." />
                    </div>
                </div>
            </section>

            <Footer mode="business" />

            <style jsx>{`
        :global(:root) {
            --fuel-primary: #FF8008;
            --fuel-secondary: #FFC837;
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
        .hero-desc { font-size: 1.3rem; max-width: 800px; margin: 0 auto 30px; opacity: 0.95; line-height: 1.6; }
        
        .btn-download {
            background: #000; color: white; padding: 15px 35px; border-radius: 50px; 
            text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3); transition: 0.3s; font-size: 1.1rem;
        }
        .btn-download:hover { transform: scale(1.05); background: #333; }
        
        .section-white { background: #fff; padding: 80px 0; }
        .section-header { margin-bottom: 40px; }
        .center { text-align: center; }
        .label-orange { color: var(--fuel-primary); font-weight: bold; text-transform: uppercase; margin-bottom: 1rem; }
        .title-dark { color: #333; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }

        .features-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;
        }

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
                    border-bottom: 4px solid #FF8008;
                }
                .feature-card:hover { transform: translateY(-5px); }
                .icon { font-size: 2.5rem; margin-bottom: 15px; }
                h3 { color: #333; margin-bottom: 10px; font-weight: 600; }
                p { color: #666; line-height: 1.6; }
            `}</style>
        </div>
    );
}
