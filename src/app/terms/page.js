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
                    <p>
                        By using MJ Tech Global website, apps, and digital services, you agree to these Terms.
                        Additional app-specific terms may be shown at checkout, in app settings, or within plan details.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>2. Services and Digital Content</h2>
                    <p>
                        We provide software development services, digital products, educational/technical content,
                        and subscription features. Access to paid features depends on successful payment and compliance checks.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>3. Subscription, Auto-Pay, and Mandate Consent</h2>
                    <p>
                        For eligible plans, subscription may renew automatically at the chosen billing frequency.
                        By enabling auto-pay, you authorize recurring debit as per the amount, cycle, and terms displayed at checkout.
                        You are responsible for ensuring sufficient balance and valid payment instruments.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>4. Cancellation and Renewal Control</h2>
                    <p>
                        You can request cancellation of future renewals before the next billing date.
                        Cancellation stops upcoming cycles and does not automatically reverse already processed charges,
                        except where required by law or explicitly stated in an app-specific refund policy.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>5. Pricing, Taxes, and Payment Failure</h2>
                    <p>
                        All prices are shown in applicable currency and may include/exclude taxes as stated at checkout.
                        Failed, reversed, or disputed payments may result in suspension of premium access.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>6. Intellectual Property Rights</h2>
                    <p>
                        All content, software, branding, and digital assets on our platforms are owned by MJ Tech Global
                        or licensed to us. Unauthorized copying, resale, scraping, or redistribution is prohibited.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>7. Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, MJ Tech Global is not liable for indirect,
                        incidental, special, or consequential losses arising from service use, payment delays,
                        third-party gateway downtime, or user-side misconfiguration.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>8. App-Specific Legal Documents</h2>
                    <p>
                        Privacy policy, terms, and refund conditions may differ by app/plan.
                        Where app-specific documents are published, those conditions apply to that app in addition to these general Terms.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>9. Changes to Terms</h2>
                    <p>
                        We may update these Terms at our discretion for legal, operational, or payment-compliance reasons.
                        Continued use after update constitutes acceptance of revised Terms.
                    </p>
                </div>
            </section>
        </main>
    );
}
