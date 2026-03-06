'use client'

import { motion } from 'framer-motion';

export default function TermsConditions() {
    return (
        <main className="main-content">
            <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: '3rem', marginBottom: '1rem' }}
                >
                    Terms & Conditions
                </motion.h1>
            </section>

            <section style={{ padding: '2rem 2rem 8rem', maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <div style={{ background: 'var(--glass-bg)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                    <p style={{ marginBottom: '1.5rem' }}>Last Updated: {new Date().toLocaleDateString()}</p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>1. Acceptance of Terms</h2>
                    <p>By accessing and using the MJ Tech Global website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>2. Intellectual Property Rights</h2>
                    <p>All content published and made available on our site is the property of MJ Tech Global and the site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our site.</p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>3. Limitation of Liability</h2>
                    <p>MJ Tech Global and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the site.</p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>4. Changes to Terms</h2>
                    <p>We reserve the right to modify these terms from time to time at our sole discretion. Therefore, you should review these pages periodically.</p>
                </div>
            </section>
        </main>
    );
}
