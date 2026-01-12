"use client";
import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        setStatus('sending');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();
            if (response.status === 200) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
                console.error(result);
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section className="section contact-section" id="contact">
            <div className="container contact-content">
                <div className="contact-info">
                    <h2>Ready to Transform Your Operations?</h2>
                    <p>We build software that adapts to your business, not the other way around. Contact our experts today.</p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="contact-item-icon">✉</div>
                            <div className="contact-item-content">
                                <h4>Email Us</h4>
                                <p>support@codeyantra.in</p>
                                <p>codeyantra.net@gmail.com</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-item-icon">🌐</div>
                            <div className="contact-item-content">
                                <h4>Website</h4>
                                <p>www.codeyantra.in</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <h3>Send Us a Message</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="access_key" value="46f2baf2-20d0-4f96-8e32-6c701c93e189" />
                        <input type="hidden" name="subject" value="New Inquiry from CodeYantra Website" />
                        <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Your Email" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" placeholder="Your message here..." required></textarea>
                        </div>

                        <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>

                        {status === 'success' && (
                            <p className="success-message">✅ Message Sent Successfully! We will contact you soon.</p>
                        )}
                        {status === 'error' && (
                            <p className="error-message">❌ Something went wrong!</p>
                        )}
                    </form>
                </div>
            </div>

            <style jsx>{`
        .contact-section {
          background: var(--gradient-dark);
          color: var(--off-white);
          padding: 8rem 0;
        }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 3rem; }
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          align-items: start;
        }
        .contact-info h2 { font-size: 3rem; margin-bottom: 1.5rem; font-weight: 800; color:white; }
        .contact-info p { font-size: 1.2rem; color: rgba(255,255,255,0.8); margin-bottom: 3rem; line-height: 1.7; }
        
        .contact-item { display: flex; gap: 1.5rem; margin-bottom: 2rem; }
        .contact-item-icon {
          width: 60px; height: 60px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 15px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; color: var(--gold);
        }
        .contact-item-content h4 { color: var(--gold); font-size: 1.1rem; margin-bottom: 0.5rem; }
        
        .contact-form {
          background: rgba(255,255,255,0.05);
          padding: 3.5rem;
          border-radius: 30px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.2);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .form-group { margin-bottom: 1.8rem; }
        .form-group label { display: block; margin-bottom: 0.8rem; color: var(--gold); font-weight: 600; }
        
        input, textarea {
          width: 100%;
          padding: 1.2rem 1.5rem;
          border: 2px solid rgba(212, 175, 55, 0.2);
          border-radius: 15px;
          background: rgba(255,255,255,0.08);
          color: white;
          font-size: 1rem;
          font-family: inherit;
        }
        input:focus, textarea:focus { outline: none; border-color: var(--gold); background: rgba(255,255,255,0.12); }
        textarea { min-height: 160px; resize: vertical; }
        
        .submit-btn {
          width: 100%; padding: 1.3rem;
          background: var(--gradient-primary);
          color: white; border: none; border-radius: 15px;
          font-size: 1.1rem; font-weight: 700; cursor: pointer;
          transition: transform 0.3s;
        }
        .submit-btn:hover { transform: translateY(-3px); }
        .success-message { color: #4CAF50; margin-top: 1rem; text-align: center; font-weight: bold; }
        .error-message { color: #ff5252; margin-top: 1rem; text-align: center; }

        @media(max-width: 992px) {
            .contact-content { grid-template-columns: 1fr; }
        }
      `}</style>
        </section>
    );
}
