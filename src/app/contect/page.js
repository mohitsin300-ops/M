'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        // Simulated form submission since API route is next step
        setTimeout(() => {
            setStatus('Message sent successfully! We will contact you soon.');
            e.target.reset();
        }, 1500);
    };

    return (
        <main className="main-content">
            <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
                >
                    Contact Us
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
                >
                    Have a project in mind? Reach out to us, and let's build something amazing together.
                </motion.p>
            </section>

            <section style={{ padding: '2rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="contact-info"
                    style={{ background: 'var(--glass-bg)', padding: '3rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Get In Touch</h2>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>Email Support</h3>
                        <p style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>mjtechglobal@zohomail.in</p>
                        <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginTop: '0.5rem' }}>mjtechglobal@gmail.com</p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>Business Hours</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Monday - Friday</p>
                        <p style={{ color: 'var(--text-muted)' }}>9:00 AM - 6:00 PM (IST)</p>
                    </div>

                    <div style={{ marginTop: '3rem', height: '250px', width: '100%', borderRadius: '12px', overflow: 'hidden', background: '#333' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0621376046777!2d77.373857!3d28.627909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0!2zMjjCsDM3JzQwLjUiTiA3N8KwMjInMjUuOSJF!5e0!3m2!1sen!2sin!4v1"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="contact-form"
                >
                    <form className="glass-card" onSubmit={handleSubmit} style={{ padding: '3rem', borderRadius: '20px', background: 'var(--secondary)', border: '1px solid var(--glass-border)' }}>
                        <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Send Us a Message</h2>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Full Name</label>
                            <input type="text" required style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address</label>
                            <input type="email" required style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Subject</label>
                            <input type="text" required style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Message</label>
                            <textarea required rows="5" style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem', resize: 'vertical' }}></textarea>
                        </div>

                        <button type="submit" className="btn-primary-large" style={{ width: '100%', cursor: 'pointer', border: 'none' }}>
                            Submit Message
                        </button>
                        {status && <p style={{ marginTop: '1rem', textAlign: 'center', color: status.includes('success') ? '#27c93f' : 'var(--accent)' }}>{status}</p>}
                    </form>
                </motion.div>
            </section>

            {/* Inject Media query for mobile */}
            <style jsx>{`
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
        </main>
    );
}
