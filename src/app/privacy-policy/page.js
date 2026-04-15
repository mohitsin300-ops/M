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
                    <p>
                        MJ Tech Global provides software services, digital content, and subscription-based app features.
                        This Privacy Policy explains how we collect, use, and protect personal information when you use our website,
                        mobile apps, and related digital services.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>2. Scope for Website and Apps</h2>
                    <p>
                        This policy applies to all MJ Tech Global products. Each app may have app-specific terms, refund rules,
                        and feature details shown inside that app listing, checkout page, or in-app legal section.
                        If there is a conflict, the app-specific legal disclosure for that app will apply for that app feature.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>3. Data We Collect</h2>
                    <p>
                        Depending on service usage, we may collect identity data (name), contact data (email, phone),
                        account data (UID, login provider), transaction data (plan, amount, payment reference),
                        device data (IP, browser/app version), and support communication records.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>4. Subscription and Auto-Pay Data</h2>
                    <p>
                        For subscription plans, recurring billing may be processed by approved payment partners.
                        We do not store full card details on our own servers. Payment tokenization, mandate approval,
                        and auto-debit processing are handled by the payment gateway or banking partners as per their compliance requirements.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>5. How We Use Data</h2>
                    <p>
                        We use data to create and maintain accounts, deliver purchased services, verify subscriptions,
                        process renewals, detect fraud, respond to support requests, improve product performance,
                        and meet legal obligations.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>6. Data Sharing</h2>
                    <p>
                        We may share limited data with cloud providers, analytics tools, customer support tools,
                        payment gateways, and legal authorities when required. We do not sell personal data.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>7. Data Retention and Security</h2>
                    <p>
                        We retain data only as long as needed for service delivery, compliance, and dispute handling.
                        We use reasonable technical and organizational safeguards to protect your data.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>8. Your Rights</h2>
                    <p>
                        You may request access, correction, deletion, or restriction of your personal data,
                        subject to legal and operational limitations. You may also request cancellation of auto-renewal
                        for future billing cycles as per the active plan terms.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>9. Policy Updates</h2>
                    <p>
                        We may update this policy from time to time to reflect product, legal, or payment-compliance changes.
                        Updated versions are effective from the published date.
                    </p>

                    <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', margin: '2rem 0 1rem' }}>10. Contact Us</h2>
                    <p>
                        For privacy, subscription, or auto-pay related questions, contact us at
                        <strong> mjtechglobal@zohomail.in </strong>
                        or
                        <strong> mjtechbharat@gmail.com</strong>.
                    </p>
                </div>
            </section>
        </main>
    );
}
