'use client'

import { motion } from 'framer-motion';
import { siteConfig } from '../../lib/siteConfig';
import { FileText } from 'lucide-react';

export default function TermsConditions() {
    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            <section style={{ padding: '4.5rem 1.5rem 2.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                        <FileText size={14} /> Legal Agreement
                    </span>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                        Terms &amp; Conditions
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
                            1. Acceptance of Terms
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            By accessing the website at <a href="https://www.mjtechglobal.in" style={{ color: 'var(--primary-blue)' }}>www.mjtechglobal.in</a> or installing any software application published by MJ Tech Global (including Nexa Reply, Resume Pro, and Prompt Copy), you agree to be bound by these Terms and Conditions.
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            2. Use of Software &amp; Acceptable Behavior
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Our applications are intended to provide genuine productivity and automation benefits. Users agree not to use our automation software (such as Nexa Reply) for unsolicited commercial spam, harassment, hate speech, or violations of third-party platform community terms.
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            3. Intellectual Property Rights
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            All source code, user interfaces, branding, visual identity, and documentation are proprietary to MJ Tech Global or licensed appropriately. Unauthorized reverse engineering, scraping, or redistribution of proprietary application binaries is prohibited.
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            4. Disclaimer of Warranties &amp; Limitation of Liability
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Our digital tools and website services are provided on an "as is" and "as available" basis without warranties of any kind. While we strive for high uptime and smooth performance, MJ Tech Global is not liable for indirect or consequential losses resulting from third-party social network downtime or platform API modifications.
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            5. Inquiries &amp; Legal Notices
                        </h2>
                        <p style={{ margin: 0 }}>
                            Direct legal inquiries and communication to:<br />
                            <strong>Executive Email:</strong> <a href={`mailto:${siteConfig.emails.founder}`} style={{ color: 'var(--primary-blue)' }}>{siteConfig.emails.founder}</a><br />
                            <strong>Support:</strong> <a href={`mailto:${siteConfig.emails.support}`} style={{ color: 'var(--primary-blue)' }}>{siteConfig.emails.support}</a><br />
                            <strong>Registered Enterprise:</strong> MJ Tech Global, India (MSME URN: {siteConfig.registration.urn})
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
