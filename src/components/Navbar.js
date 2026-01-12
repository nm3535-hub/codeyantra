"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar({ mode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <Link href="/" className="logo">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/assets/logo.png" alt="CodeYantra" style={{ height: '60px' }} />
            <span style={{ color: 'var(--gold)' }}>CodeYantra</span>
          </div>
        </Link>
        <div className="nav-links">
          {(!mode || mode === 'home') && (
            <>
              <Link href="#business">Business</Link>
              <Link href="#entertainment">Entertainment</Link>
              <Link href="#contact">Contact</Link>
            </>
          )}

          {mode === 'business' && (
            <>
              <Link href="/#entertainment">Entertainment Lab</Link>
              <Link href="#features">Features</Link>
              <Link href="/fuelmate/privacy">Policy</Link>
              <Link href="#contact">Contact</Link>
            </>
          )}

          {mode === 'entertainment' && (
            <>
              <Link href="/">Business Solutions</Link>
              <Link href="#features">Features</Link>
              <Link href="/maskchat/privacy">Privacy & Safety</Link>
            </>
          )}

          {mode === 'unmute' && (
            <>
              <Link href="/">Business Solutions</Link>
              <Link href="#features">Features</Link>
              <Link href="/privacy-policy">Privacy & Safety</Link>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: all 0.3s ease;
          background: transparent;
        }
        /* Navbar Scrolled State */
        .header.scrolled {
          background: rgba(26, 34, 56, 0.95);
          backdrop-filter: blur(10px);
          padding: 1.2rem 0;
          box-shadow: 0 4px 30px rgba(0,0,0,0.3);
        }
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 2.2rem; /* Increased size */
          font-weight: 900;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }
        .nav-links a {
          color: #FFFFFF !important; /* Force Bright White */
          font-weight: 900;
          transition: color 0.3s, transform 0.2s;
          font-size: 1.3rem; 
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 0 10px rgba(255,255,255,0.3); /* Glow for visibility */
        }
        .nav-links a:hover {
          color: var(--gold);
          transform: translateY(-2px);
        }
        @media(max-width: 768px) {
            .nav-links { display: none; } 
        }
      `}</style>
    </nav>
  );
}
