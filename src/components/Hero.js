"use client";
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-text fade-in">
                    <h1>
                        Empowering Businesses <span className="highlight">with</span> Intelligent Software Solutions.
                    </h1>
                    <p>
                        CodeYantra: Transforming Business Operations with Precision and Intelligence.
                        We engineer bespoke software solutions that drive efficiency, growth, and digital mastery.
                    </p>
                    <div className="hero-buttons">
                        <Link href="#business" className="btn-tab btn-business">
                            Business Solutions
                        </Link>
                        <Link href="#entertainment" className="btn-tab btn-entertainment">
                            Entertainment Lab
                        </Link>
                    </div>
                </div>

                <div className="hero-visual fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="hero-card">
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-number">+500</div>
                                <div className="stat-label">Clients</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">99.9%</div>
                                <div className="stat-label">Uptime</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">100+</div>
                                <div className="stat-label">Projects</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">10x</div>
                                <div className="stat-label">ROI</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .hero {
          padding: 14rem 0 10rem;
          position: relative;
          background: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.7)), url('/assets/hero_background.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: white;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, var(--gold) 0%, transparent 70%);
          opacity: 0.1; /* Slightly increased opacity */
          top: -400px;
          right: -400px;
          border-radius: 50%;
          animation: pulse 8s ease-in-out infinite;
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .hero-text h1 {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .highlight {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-text p {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 3rem;
          font-weight: 400;
          line-height: 1.7;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        .hero-buttons {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        .btn-tab {
          padding: 1.2rem 2.5rem;
          border-radius: 12px;
          font-weight: 800;
          transition: transform 0.3s, box-shadow 0.3s;
          display: inline-block;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 1rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          border: 2px solid transparent;
        }
        .btn-business {
            background: linear-gradient(135deg, #FF8008, #FFC837); /* Orange Theme */
            color: white;
        }
        .btn-business:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(255, 128, 8, 0.4);
            border-color: #ffe082;
        }
        .btn-entertainment {
             background: transparent;
             border: 2px solid #FF416C;
             color: white;
             position: relative;
             overflow: hidden;
             background: linear-gradient(135deg, rgba(255, 65, 108, 0.8), rgba(255, 75, 43, 0.8));
        }
        .btn-entertainment:hover {
            transform: translateY(-5px);
             box-shadow: 0 15px 35px rgba(255, 65, 108, 0.4);
             background: linear-gradient(135deg, #FF416C, #FF4B2B);
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
        }
        .hero-card {
            background: rgba(255,255,255,0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 25px;
            padding: 3rem;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }
        .stat-item { text-align: center; }
        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .stat-label {
            color: rgba(255, 255, 255, 0.6);
            margin-top: 0.5rem;
        }
        @media(max-width: 992px) {
            .hero-content { grid-template-columns: 1fr; text-align: center; }
            .hero-text h1 { font-size: 3rem; }
        }
      `}</style>
        </section>
    );
}
