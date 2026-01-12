"use client";
import Link from 'next/link';

export default function Footer({ mode }) {
    return (
        <footer className="footer" id="about">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Link href="/">
                            <h3>CodeYantra</h3>
                        </Link>
                        <p>Innovating for a smarter future.</p>
                        <div style={{ marginTop: '1.5rem', opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6' }}>
                            <h4 style={{ color: 'var(--gold)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>About CodeYantra</h4>
                            <p>We are a forward-thinking tech company dedicated to building intelligent solutions that bridge the gap between business needs and user entertainment.</p>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Explore</h4>
                        <ul className="footer-links">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="#business">Business</Link></li>
                            <li><Link href="#entertainment">Entertainment</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Legal & Support</h4>
                        <ul className="footer-links">
                            <li><a href="mailto:support@codeyantra.in">Email Support</a></li>

                            {/* MaskChat Content links */}
                            {(mode === 'entertainment' || mode === 'unmute') && (
                                <>
                                    <li><Link href="/maskchat/privacy">MaskChat Privacy</Link></li>
                                </>
                            )}

                            {/* FuelMate Content links */}
                            {mode === 'business' && (
                                <>
                                    <li><Link href="/fuelmate/privacy">FuelMate Privacy</Link></li>
                                    <li><Link href="/fuelmate/terms">FuelMate Terms</Link></li>
                                    <li><Link href="/fuelmate-pro/privacy">FuelMate Pro Privacy</Link></li>
                                    <li><Link href="/fuelmate-pro/terms">FuelMate Pro Terms</Link></li>
                                    <li><Link href="/fuelmate-pro/refund">Refund Policy</Link></li>
                                </>
                            )}

                            {/* Generic links for home */}
                            {(!mode || mode === 'home') && (
                                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            )}

                            <li><a href="/app-ads.txt" target="_blank" style={{ color: 'rgba(248, 249, 250, 0.7)' }}>app-ads.txt</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 CodeYantra. All rights reserved.</p>
                </div>
            </div>

            <style jsx>{`
        .footer { background: var(--black); color: var(--off-white); padding: 4rem 0 2rem; }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 3rem; }
        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }
        .footer-brand h3 {
          font-size: 2rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          font-weight: 800;
        }
        .footer-brand p { color: rgba(248, 249, 250, 0.7); line-height: 1.7; }
        .footer-section h4 { color: var(--gold); margin-bottom: 1.5rem; font-weight: 600; }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 0.8rem; }
        .footer-links a { color: rgba(248, 249, 250, 0.7); transition: color 0.3s; }
        .footer-links a:hover { color: var(--gold); }
        .footer-bottom {
          border-top: 1px solid rgba(248, 249, 250, 0.1);
          padding-top: 1.5rem;
          text-align: center;
          color: rgba(248, 249, 250, 0.5);
          font-size: 0.9rem;
        }
        @media(max-width: 992px) {
            .footer-content { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>
        </footer>
    );
}
