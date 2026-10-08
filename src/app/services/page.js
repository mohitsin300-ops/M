'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';
import {
    Smartphone,
    Globe,
    Zap,
    Bot,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Shield,
    Code,
    Cpu
} from 'lucide-react';

export default function Services() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* Header */}
            <section style={{ padding: '5rem 1.5rem 3.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '850px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                            <Code size={14} /> Technology Offerings
                        </span>
                        <h1 style={{ fontSize: '3.25rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                            Software Development &amp; <span className="text-gradient">Engineering Services</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                            We partner with founders and businesses to build high-performance mobile apps, full-stack web platforms, and automated workflow solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services List */}
            <section style={{ padding: '0 1.5rem 6rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        {siteConfig.services.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                id={service.id}
                                className="card-light"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-60px" }}
                                variants={fadeInUp}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1.2fr 0.8fr',
                                    gap: '3rem',
                                    padding: '3rem',
                                    borderRadius: '24px',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{service.icon}</div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
                                        {service.title}
                                    </h2>
                                    <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                                        {service.desc}
                                    </p>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                            Capabilities Delivered
                                        </p>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                            {service.features.map((f, fIdx) => (
                                                <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                                    <CheckCircle2 size={16} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
                                                    <span>{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Link href="/contact" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                                        <span>Request a Consultation</span>
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>

                                <div style={{
                                    background: 'var(--light-bg)',
                                    borderRadius: '16px',
                                    border: '1px solid var(--border-color)',
                                    padding: '2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                                        Ideal For
                                    </h4>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                        Startups needing clean MVPs, small businesses scaling past manual operational spreadsheets, and creators seeking customized social workflows.
                                    </p>
                                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        <strong>Stack:</strong> Flutter &bull; Next.js &bull; Node.js &bull; Firebase
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Responsive */}
            <style jsx>{`
                @media (max-width: 900px) {
                    .card-light {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </main>
    );
}
