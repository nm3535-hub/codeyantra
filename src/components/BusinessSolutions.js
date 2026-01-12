"use client";
import React from 'react';
import Link from 'next/link';

const products = [
  {
    name: 'FuelMate Pro',
    desc: 'Complete ERP for Fuel Stations (Pricing & Plans).',
    img: '/assets/app_screenshot_2.png',
    bg: 'linear-gradient(135deg, #11998e, #38ef7d)',
    link: '/fuelmate-pro',
    btn: 'View Pricing'
  },
  {
    name: 'FuelMate',
    desc: 'Essential Calculator for Daily Operations.',
    img: '/assets/app_screenshot_1.png',
    bg: 'linear-gradient(135deg, #FF8008, #FFC837)',
    link: '/fuelmate',
    btn: 'Download App'
  }
];

export default function BusinessSolutions() {
  return (
    <section id="business" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-label">CODEYANTRA BUSINESS SOLUTIONS</p>
          <h2 className="section-title">Fuel Your Growth</h2>
          <p className="section-description">Advanced ERP and management tools for the energy sector.</p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card" style={{ background: product.bg }}>
              <img src={product.img} alt={product.name} className="product-img" />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <Link href={product.link} className="premium-btn">{product.btn} &rarr;</Link>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section { padding: 8rem 0; background: white; }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 3rem; }
        .section-header { text-align: center; max-width: 800px; margin: 0 auto 5rem; }
        .section-label { color: var(--gold); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1rem; }
        .section-title { font-size: 3rem; font-weight: 800; color: var(--navy); margin-bottom: 1.5rem; }
        .section-description { font-size: 1.25rem; color: #666; font-weight: 300; }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          justify-content: center;
        }
        
        .product-card {
          padding: 3rem;
          border-radius: 24px;
          color: white;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
        }
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }
        .product-img {
          width: 100px; height: 100px;
          border-radius: 22px;
          background: white;
          padding: 10px;
          object-fit: contain;
          margin-bottom: 1.5rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .product-card h3 { font-size: 1.8rem; margin-bottom: 1rem; font-weight: 800; }
        .product-card p { opacity: 0.95; margin-bottom: 2rem; font-size: 1.1rem; line-height: 1.5; }
        
        .premium-btn {
          background: linear-gradient(135deg, #1A2238, #2a3456);
          color: white;
          padding: 1rem 2.5rem;
          border-radius: 12px;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          font-size: 0.95rem;
          text-transform: uppercase;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          letter-spacing: 0.5px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .premium-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
          background: linear-gradient(135deg, #2a3456, #1A2238);
        }
      `}</style>
    </section>
  );
}
