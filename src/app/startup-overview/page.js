'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';
import {
    Sparkles,
    Shield,
    CheckCircle2,
    ExternalLink,
    Smartphone,
    Mail,
    ArrowRight,
    Award,
    FileText,
    Cpu,
    Globe
} from 'lucide-react';

export default function StartupOverviewPage() {
    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* Header */}
            <section style={{ padding: '5rem 1.5rem 3rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '850px' }}>
                    <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                        <Shield size={14} /> Executive Briefing
                    </span>
                    <h1 style={{ fontSize: '3.25rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                        Startup Overview: <span className="text-gradient">MJ Tech Global</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                        A consolidated company dossier for technology partners, accelerator reviewers, and software collaborators.
                    </p>
                </div>
            </section>

            {/* Snapshot Dossier Table */}
            <section style={{ padding: '0 1.5rem 5rem' }}>
                <div className="container" style={{ maxWidth: '1050px' }}>
                    <div className="card-light" style={{ padding: '3rem', borderRadius: '24px', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.75rem' }}>
                            Company Snapshot
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.75rem' }}>
                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: 0 }}>Company Name</p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '4px 0 0 0' }}>MJ Tech Global</p>
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: 0 }}>Founder &amp; CEO</p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '4px 0 0 0' }}>Mohit Singh</p>
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: 0 }}>Official Headquarters</p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', margin: '4px 0 0 0' }}>India</p>
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: 0 }}>Primary Domain</p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-blue)', margin: '4px 0 0 0' }}>
                                    <a href="https://www.mjtechglobal.in" target="_blank" rel="noopener noreferrer">www.mjtechglobal.in</a>
                                </p>
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: 0 }}>Government Registration</p>
                                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                                    MSME Certified (URN: <span style={{ fontFamily: 'monospace', color: 'var(--primary-blue)' }}>{siteConfig.registration.urn}</span>)
                                </p>
                            </div>

                            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: 0 }}>Core Specialization</p>
                                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', margin: '4px 0 0 0' }}>Software Products, Mobile App Development, Business Automation</p>
                            </div>
                        </div>
                    </div>

                    {/* Products In Market */}
                    <div className="card-light" style={{ padding: '3rem', borderRadius: '24px', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                            Verified Public Software Releases
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>
                            We do not showcase mock concepts. Below are our live applications released on Google Play:
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {siteConfig.products.map((p) => (
                                <div key={p.id} style={{
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '16px',
                                    padding: '1.75rem',
                                    background: 'var(--light-bg)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '1.25rem'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '1.2rem' }}>{p.icon}</span>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{p.fullName}</h3>
                                        </div>
                                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Category: {p.category}</p>
                                        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '650px' }}>{p.shortDesc}</p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Link href={p.slug} className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                                            Specs
                                        </Link>
                                        <a href={p.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-playstore" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
                                            Google Play <ExternalLink size={13} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Official Channels & Inquiries */}
                    <div className="card-light" style={{ padding: '3rem', borderRadius: '24px' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                            Verified Contact &amp; Program Channels
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            <div style={{ background: 'var(--light-bg)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Founder Communication</p>
                                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '6px' }}>
                                    <a href={`mailto:${siteConfig.emails.founder}`}>{siteConfig.emails.founder}</a>
                                </p>
                            </div>

                            <div style={{ background: 'var(--light-bg)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Application Support</p>
                                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '6px' }}>
                                    <a href={`mailto:${siteConfig.emails.support}`}>{siteConfig.emails.support}</a>
                                </p>
                            </div>

                            <div style={{ background: 'var(--light-bg)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Business Inquiries</p>
                                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '6px' }}>
                                    <a href={`mailto:${siteConfig.emails.businessSupplied}`}>{siteConfig.emails.businessSupplied}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Responsive */}
            <style jsx>{`
                @media (max-width: 800px) {
                    div[style*="gridTemplateColumns: repeat(2, 1fr)"] {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    );
}
