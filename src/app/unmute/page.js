"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Unmute() {
    return (
        <main>
            <Navbar mode="unmute" />

            <section className="hero-unmute">
                <div className="container center">
                    <div className="launch-badge">🎙️ Speak Freely</div>

                    <br />
                    <img src="/assets/unmute_logo.png" alt="Unmute Icon" className="hero-logo" />

                    <h1>Unmute</h1>
                    <p className="hero-desc">
                        Overcome Your Fear of Public Speaking. <br />
                        <strong>Practice. Perform. Earn.</strong> <br />
                        <span>The ultimate platform for voice creators and learners.</span>
                    </p>

                    <Link href="#features" className="cta-btn-unmute">
                        Start Speaking
                    </Link>
                </div>
            </section>

            <section id="features" className="section-white">
                <div className="container">
                    <div className="section-header center">
                        <p className="label-red">YOUR STAGE IS READY</p>
                        <h2 className="title-dark">Find Your Voice</h2>
                    </div>

                    <div className="features-grid">
                        <FeatureCard icon="🗣️" title="English Practice" desc="Join pre-built rooms to practice English conversation with strangers. No judgement, just learning." />
                        <FeatureCard icon="🎤" title="Open Mic" desc="Showcase your talent! Stand-up comedy, storytelling, poetry, or singing. The stage is yours." />
                        <FeatureCard icon="debate" title="Debate Club" desc="Engage in healthy discussions on trending topics. sharpen your critical thinking and argumentation skills." />
                        <FeatureCard icon="🌙" title="Late Night Chill" desc="Just want to relax? Join our late-night chill rooms to hang out and talk about life, music, and everything in between." />
                        <FeatureCard icon="💰" title="Private Paid Rooms" desc="Are you an expert? Create private rooms for teaching, mentoring, or exclusive shows. Set an entry fee and earn." />
                        <FeatureCard icon="🤝" title="Anonymous Tech Talk" desc="Discuss technology, coding, and career advice anonymously. Get honest feedback without the pressure." />
                    </div>
                </div>
            </section>

            <section className="section-gray center">
                <div className="container">
                    <h2 className="title-dark">Why Unmute?</h2>
                    <p className="desc-gray">Public speaking is a skill, not a talent. We provide the safe space you need to practice, fail, learn, and grow.</p>
                </div>
            </section>

            <section className="cta-red center">
                <h2>🚀 Coming Soon</h2>
                <p>We are building the future of social audio. Stay tuned.</p>
                <Link href="#contact" className="btn-notify">Join Waitlist</Link>
            </section>

            <Footer mode="unmute" />

            <style jsx>{`
            :global(:root) {
                --unmute-primary: #FF416C;
                --unmute-secondary: #FF4B2B;
            }
            .hero-unmute {
                background: linear-gradient(135deg, var(--unmute-secondary) 0%, var(--unmute-primary) 100%);
                padding: 160px 0 100px;
                text-align: center;
                color: white;
                border-bottom-left-radius: 50px;
                border-bottom-right-radius: 50px;
            }
            .launch-badge {
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
            .hero-unmute h1 { font-size: 3.5rem; margin-bottom: 15px; font-weight: 800; }
            .hero-desc { font-size: 1.4rem; opacity: 0.95; max-width: 700px; margin: 0 auto 40px; line-height: 1.6; }
            .hero-desc span { font-size: 1rem; opacity: 0.8; display: block; margin-top: 10px; }
            
            .cta-btn-unmute {
                background: white; color: #1A2238; padding: 1rem 2.5rem; 
                border-radius: 50px; text-decoration: none; font-weight: 800; 
                display: inline-block; box-shadow: 0 10px 25px rgba(0,0,0,0.2); transition: 0.3s;
                text-transform: uppercase; letter-spacing: 0.5px;
            }
            .cta-btn-unmute:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0,0,0,0.3); color: black; }

            .section-white { background: white; padding: 80px 0; }
            .section-gray { background: #f9f9f9; padding: 80px 20px; }
            .center { text-align: center; }
            
            .label-red { color: var(--unmute-primary); font-weight: bold; letter-spacing: 1px; margin-bottom: 0.5rem;}
            .title-dark { font-size: 2.5rem; color: #333; margin-bottom: 1rem; font-weight: 700;}
            .desc-gray { color: #666; max-width: 600px; margin: 0 auto; line-height: 1.6; font-size: 1.1rem; }

            .features-grid {
                display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 3rem;
            }
            
            .cta-red { background: var(--unmute-primary); color: white; padding: 60px 20px; }
            .cta-red h2 { margin-bottom: 1rem; }
            .cta-red p { opacity: 0.9; margin-bottom: 2rem; }
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
            <div className="icon">
                {icon === 'debate' ? <span>⚖️</span> : icon}
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <style jsx>{`
                .feature-card {
                    padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    text-align: center; transition: transform 0.3s; background: white;
                    border-bottom: 4px solid #FF416C;
                }
                .feature-card:hover { transform: translateY(-5px); }
                .icon { font-size: 2.5rem; margin-bottom: 15px; }
                h3 { margin: 15px 0; color: #333; font-weight: 700; }
                p { color: #666; line-height: 1.6; }
            `}</style>
        </div>
    );
}
