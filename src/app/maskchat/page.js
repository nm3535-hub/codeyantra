"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function MaskChat() {
    return (
        <main>
            <Navbar mode="entertainment" />
            <section className="hero-mask">
                <div className="container">
                    <div className="download-badge">🚀 Coming Soon to Play Store</div>

                    <br />
                    <img src="/assets/maskchat_logo.png" alt="MaskChat Icon" className="hero-logo" />

                    <h1>MaskChat</h1>
                    <p className="hero-desc">
                        Where connections happen naturally. <br />
                        <strong>Shake. Match. Groups.</strong> <br />
                        <span>No swiping fatigue. Just pure conversation.</span>
                    </p>

                    <Link href="#features" className="cta-btn-mask">
                        Explore Features
                    </Link>
                </div>
            </section>

            <section id="features" className="section-white">
                <div className="container">
                    <div className="section-header center">
                        <p className="label-purple">PREMIUM EXPERIENCE</p>
                        <h2 className="title-dark">Designed for Genuine Connections</h2>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="icon">📱</div>
                            <h3>Shake to Connect</h3>
                            <p>Why swipe when you can shake? Experience the thrill of finding someone new just by shaking your phone. It{`'`}s fun, fast, and absolutely free.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">🎚️</div>
                            <h3>Smart Matching</h3>
                            <p>Find exactly who you{`'`}re looking for. Filter connections by <strong>Age Group and Gender</strong> effortlessly. Connect with like-minded people instantly.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">🌍</div>
                            <h3>Nearby & Global</h3>
                            <p>Whether they are 200km away or across the globe, MaskChat brings you closer. Discover people in your city or explore worldwide conversations.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">👥</div>
                            <h3>Group Hangouts</h3>
                            <p>Expand your circle. Create or join public groups based on your interests. Chat, share, and build your own community effortlessly.</p>
                        </div>

                        <div className="feature-card">
                            <div className="icon">🛡️</div>
                            <h3>Safe Space</h3>
                            <p>Your peace of mind matters. With AI-powered moderation and a strict 3-strike policy, we ensure a gentle and respectful community.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-gray center">
                <div className="container">
                    <h2 className="title-dark">Be Gentle. Connect with Love.</h2>
                    <p className="desc-gray">MaskChat is built for meaningful conversations. We encourage kindness and respect in every chat.</p>
                </div>
            </section>

            <Footer mode="entertainment" />

            <style jsx>{`
            :global(:root) {
                --mask-primary: #4A00E0;
                --mask-secondary: #8E2DE2;
            }
            .hero-mask {
                background: linear-gradient(135deg, var(--mask-secondary) 0%, var(--mask-primary) 100%);
                padding: 160px 0 100px; /* Added top padding for fixed navbar */
                text-align: center;
                color: white;
                border-bottom-left-radius: 50px;
                border-bottom-right-radius: 50px;
            }
            .download-badge {
                background: rgba(255, 255, 255, 0.2);
                padding: 8px 20px;
                border-radius: 50px;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 0.9rem;
                letter-spacing: 1px;
                display: inline-block;
                margin-bottom: 20px;
                border: 1px solid rgba(255, 255, 255, 0.4);
            }
            .hero-logo {
                width: 130px; 
                background: white; 
                border-radius: 35px; 
                padding: 10px; 
                box-shadow: 0 15px 40px rgba(0,0,0,0.25); 
                margin-bottom: 30px;
            }
            .hero-mask h1 {
                font-size: 3.5rem; 
                margin-bottom: 15px;
                font-weight: 800;
            }
            .hero-desc {
                font-size: 1.4rem; 
                opacity: 0.95; 
                max-width: 700px; 
                margin: 0 auto 40px; 
                line-height: 1.6;
            }
            .hero-desc span {
                font-size: 1rem; 
                opacity: 0.8;
                display: block;
                margin-top: 10px;
            }
            .cta-btn-mask {
                background: white; 
                color: var(--mask-primary); 
                padding: 15px 40px; 
                border-radius: 50px; 
                text-decoration: none; 
                font-weight: 800; 
                display: inline-block; 
                box-shadow: 0 10px 25px rgba(0,0,0,0.2); 
                transition: 0.3s;
            }
            .cta-btn-mask:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            }

            .section-white { background: white; padding: 60px 0; }
            .section-gray { background: #f9f9f9; padding: 60px 20px; }
            .center { text-align: center; }
            
            .label-purple { color: var(--mask-primary); font-weight: bold; letter-spacing: 1px; margin-bottom: 0.5rem;}
            .title-dark { font-size: 2.5rem; color: #333; margin-bottom: 1rem; font-weight: 700;}
            .desc-gray { color: #666; max-width: 600px; margin: 0 auto; line-height: 1.6; }

            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px;
                margin-top: 3rem;
            }
            .feature-card {
                padding: 40px 25px;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                text-align: center;
                transition: transform 0.3s;
                background: white;
            }
            .feature-card:hover { transform: translateY(-5px); }
            .icon { font-size: 2.5rem; margin-bottom: 15px; }
            .feature-card h3 { margin: 15px 0; color: #333; font-weight: 600; }
            .feature-card p { color: #666; line-height: 1.6; }

            .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        `}</style>
        </main>
    );
}
