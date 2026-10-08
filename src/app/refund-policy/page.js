'use client'

import { motion } from 'framer-motion';
import { siteConfig } from '../../lib/siteConfig';
import { Shield } from 'lucide-react';

export default function RefundPolicy() {
    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            <section style={{ padding: '4.5rem 1.5rem 2.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                        <Shield size={14} /> Purchases &amp; Billing
                    </span>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                        Refund Policy
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Last Updated: March 2026 &bull; MJ Tech Global
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 1.5rem 6rem' }}>
                <div className="container" style={{ maxWidth: '850px' }}>
                    <div className="card-light" style={{ padding: '3.5rem', borderRadius: '24px', fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: 0, marginBottom: '1rem' }}>
                            1. Digital Software &amp; Purchases
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            MJ Tech Global provides digital applications, software tools, and digital services. All in-app purchases or subscriptions initiated through the Google Play Store are processed subject to Google Play billing policies and consumer protection guidelines.
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            2. Eligible Refund Circumstances
                        </h2>
                        <p style={{ marginBottom: '1rem' }}>We review refund claims under the following circumstances:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                            <li>Verified technical failure where paid digital features could not be delivered despite reasonable developer troubleshooting.</li>
                            <li>Duplicate payment or accidental double-charge caused by billing gateway glitches.</li>
                            <li>Requests submitted in accordance with statutory consumer cooling-off rights.</li>
                        </ul>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            3. Refund Request Process
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            To request an inquiry or refund regarding any MJ Tech Global software product, please contact our support team at <a href={`mailto:${siteConfig.emails.support}`} style={{ color: 'var(--primary-blue)' }}>{siteConfig.emails.support}</a> within 7 days of the transaction, including your order number, registered account email, and reason for the request.
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            4. Support Contact
                        </h2>
                        <p style={{ margin: 0 }}>
                            <strong>App &amp; Store Support:</strong> <a href={`mailto:${siteConfig.emails.support}`} style={{ color: 'var(--primary-blue)' }}>{siteConfig.emails.support}</a><br />
                            <strong>Business Correspondence:</strong> <a href={`mailto:${siteConfig.emails.businessSupplied}`} style={{ color: 'var(--primary-blue)' }}>{siteConfig.emails.businessSupplied}</a><br />
                            <strong>Entity:</strong> MJ Tech Global, India (MSME URN: {siteConfig.registration.urn})
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
