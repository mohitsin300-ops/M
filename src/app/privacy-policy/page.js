'use client'

import { motion } from 'framer-motion';
import { siteConfig } from '../../lib/siteConfig';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            <section style={{ padding: '4.5rem 1.5rem 2.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                        <Shield size={14} /> Legal &amp; Compliance
                    </span>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                        Privacy Policy
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
                            1. Introduction
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            MJ Tech Global ("we", "our", or "us") provides mobile applications (including Nexa Reply, Resume Pro, and Prompt Copy), web services, and digital productivity tools. This Privacy Policy outlines how we collect, process, and safeguard personal information when you use our website at <a href="https://www.mjtechglobal.in" style={{ color: 'var(--primary-blue)' }}>www.mjtechglobal.in</a> and our applications distributed via Google Play.
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            2. Scope &amp; Application-Specific Disclosures
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            This overarching policy applies to all MJ Tech Global digital properties. Individual mobile applications may maintain supplementary in-app data safety declarations on Google Play specifying app-specific permissions (such as notification listener permissions or storage access).
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            3. Information We Collect
                        </h2>
                        <p style={{ marginBottom: '1rem' }}>Depending on the specific service or application used, we may collect:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                            <li><strong>Identity &amp; Contact Data:</strong> Name and email address when you submit contact inquiries, internship applications, or register an account.</li>
                            <li><strong>Technical &amp; Device Information:</strong> Device model, operating system version, and anonymous crash telemetry to resolve software defects.</li>
                            <li><strong>User-Generated Configuration:</strong> In-app settings, message templates, keyword triggers, or resume text entered by the user. Wherever possible (as in Resume Pro), this data is retained locally on your device.</li>
                        </ul>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            4. How We Use Information
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Collected information is utilized strictly to provide, maintain, and troubleshoot our applications; process student internship applications; verify certificate authenticity; respond to customer support inquiries; and comply with applicable statutory requirements. We do not sell or monetize personal information.
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            5. Data Security &amp; Retention
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            We implement industry-standard technical measures (including HTTPS encryption and secure database access controls through Firebase) to protect user information from unauthorized access. Data is retained only for as long as necessary to fulfill the operational purpose for which it was collected.
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            6. User Rights &amp; Data Deletion Requests
                        </h2>
                        <p style={{ marginBottom: '1.5rem' }}>
                            You may request access to, correction of, or permanent deletion of any personal data submitted to MJ Tech Global. To submit a data deletion request, email our support team at <a href={`mailto:${siteConfig.emails.support}`} style={{ color: 'var(--primary-blue)' }}>{siteConfig.emails.support}</a> with the subject line "Data Deletion Request".
                        </p>

                        <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem' }}>
                            7. Contact Information
                        </h2>
                        <p style={{ margin: 0 }}>
                            For questions regarding this policy, contact our privacy officer at:<br />
                            <strong>Email:</strong> <a href={`mailto:${siteConfig.emails.support}`} style={{ color: 'var(--primary-blue)' }}>{siteConfig.emails.support}</a><br />
                            <strong>Executive Office:</strong> <a href={`mailto:${siteConfig.emails.founder}`} style={{ color: 'var(--primary-blue)' }}>{siteConfig.emails.founder}</a><br />
                            <strong>Registered Enterprise:</strong> MJ Tech Global (MSME URN: {siteConfig.registration.urn}), India.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
