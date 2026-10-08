'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';
import { Sparkles, ArrowRight, ExternalLink, Smartphone, CheckCircle2 } from 'lucide-react';

export default function Portfolio() {
    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            <section style={{ padding: '4.5rem 1.5rem 3rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                        <Sparkles size={14} /> Product Portfolio
                    </span>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                        Software Products &amp; <span className="text-gradient">Core Applications</span>
                    </h1>
                    <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Our engineering focus centers on practical business automation, professional productivity utilities, and creative AI workflows.
                    </p>
                </div>
            </section>

            <section style={{ padding: '0 1.5rem 6rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        {siteConfig.products.map((item) => (
                            <div
                                key={item.id}
                                className="card-light"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    padding: '2rem',
                                    borderRadius: '20px'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--light-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid var(--border-color)' }}>
                                            {item.icon}
                                        </div>
                                        <span className="badge badge-primary">{item.badge}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>{item.name}</h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{item.fullName}</p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                        {item.shortDesc}
                                    </p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
                                    <Link href={item.slug} className="btn btn-secondary" style={{ width: '100%', padding: '0.65rem', fontSize: '0.88rem' }}>
                                        <span>Product Overview</span>
                                        <ArrowRight size={15} />
                                    </Link>
                                    <a
                                        href={item.playStoreUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-playstore"
                                        style={{ width: '100%', padding: '0.65rem', fontSize: '0.88rem', justifyContent: 'center' }}
                                    >
                                        <Smartphone size={15} />
                                        <span>Google Play</span>
                                        <ExternalLink size={13} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '4rem',
                        padding: '2.5rem',
                        background: '#FFFFFF',
                        border: '1px solid var(--border-color)',
                        borderRadius: '20px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                            Looking for our dedicated Product Showcase?
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                            Visit our new Products directory for in-depth technical breakdowns, workflow diagrams, and feature comparisons.
                        </p>
                        <Link href="/products" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
                            <span>Explore Full Products Page</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Responsive */}
            <style jsx>{`
                @media (max-width: 900px) {
                    div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    );
}
