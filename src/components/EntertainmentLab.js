"use client";
import React from 'react';
import Link from 'next/link';

export default function EntertainmentLab() {
    return (
        <section id="entertainment" className="section">
            <div className="container">
                <div className="section-header">
                    <p className="section-label">CODEYANTRA ENTERTAINMENT LAB</p>
                    <h2 className="section-title">Connect. Engage. Enjoy.</h2>
                    <p className="section-description">Building stress-free social experiences.</p>
                </div>

                <div className="entertainment-grid">
                    {/* MaskChat Card */}
                    <div className="product-card-large maskchat-card">
                        <div className="product-content">
                            <img src="/assets/maskchat_logo.png" alt="MaskChat" className="product-img" />
                            <div className="text-content">
                                <h3>MaskChat</h3>
                                <p>Anonymous Social Discovery & Secure Chat. No swiping, just connections.</p>
                                <Link href="/maskchat" className="premium-btn btn-mask">Visit Page &rarr;</Link>
                            </div>
                        </div>
                    </div>

                    {/* Unmute Card */}
                    <div className="product-card-large unmute-card">
                        <div className="product-content">
                            <img src="/assets/unmute_logo.png" alt="Unmute" className="product-img" />
                            <div className="text-content">
                                <h3>Unmute</h3>
                                <p>Overcome fear of public speaking. Practice, Perform, and Earn.</p>
                                <Link href="/unmute" className="premium-btn btn-unmute">Visit Page &rarr;</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .section { padding: 8rem 0; background: #f9fafb; }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 3rem; }
        .section-header { text-align: center; max-width: 800px; margin: 0 auto 5rem; }
        .section-label { color: var(--mask-primary, #4A00E0); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1rem; }
        .section-title { font-size: 3rem; font-weight: 800; color: var(--navy); margin-bottom: 1.5rem; }
        .section-description { font-size: 1.25rem; color: #666; font-weight: 300; }

        .entertainment-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
            gap: 40px;
        }

        .product-card-large {
            border-radius: 30px;
            padding: 3rem;
            color: white;
            transition: transform 0.3s;
            position: relative;
            overflow: hidden;
        }
        
        .maskchat-card {
            background: linear-gradient(135deg, #8E2DE2, #4A00E0);
            box-shadow: 0 20px 60px rgba(74, 0, 224, 0.2);
        }
        
        .unmute-card {
            background: linear-gradient(135deg, #FF4B2B, #FF416C);
            box-shadow: 0 20px 60px rgba(255, 65, 108, 0.2);
        }

        .product-card-large:hover { transform: translateY(-5px); }

        .product-content {
            display: flex;
            align-items: center;
            gap: 2rem;
            justify-content: center;
            flex-wrap: wrap;
            text-align: center;
            position: relative;
            z-index: 2;
        }
        
        .product-img {
            width: 100px; height: 100px;
            border-radius: 25px;
            background: white;
            padding: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .text-content h3 { font-size: 2rem; margin-bottom: 0.5rem; font-weight: 800; }
        .text-content p { font-size: 1.1rem; margin-bottom: 1.5rem; opacity: 0.95; line-height: 1.5; }

        .premium-btn {
          background: white;
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-weight: 900;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          text-transform: uppercase;
          font-size: 0.95rem;
          letter-spacing: 1px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .btn-mask { color: #4A00E0; }
        .btn-unmute { color: #FF416C; }
        
        .premium-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }
        
        @media(max-width: 768px) {
            .entertainment-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </section>
    );
}
