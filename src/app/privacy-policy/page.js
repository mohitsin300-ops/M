'use client'

import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
    return (
        <main className="main-content">
            <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: '3rem', marginBottom: '1rem' }}
                >
                    Privacy Policy
                </motion.h1>
            </section>

            <section style={{ padding: '2rem 2rem 8rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <div style={{ background: 'var(--glass-bg)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                    <p style={{ marginBottom: '1.5rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>1. Introduction</h2>
                    <p>Welcome to MJ Tech Global. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>2. Data We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data (Name), Contact Data (Email, Phone), and Technical Data (IP address, browser type).</p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>3. How We Use Your Data</h2>
                    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to respond to your inquiries, process internship applications, or improve our website layout.</p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>4. Contact Us</h2>
                    <p>If you have any questions about this privacy policy, please contact us at <strong>mjtechglobal@zohomail.in</strong> or <strong>mjtechglobal@gmail.com</strong>.</p>
                </div>
            </section>
        </main>
    );
}
