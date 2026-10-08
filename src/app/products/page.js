'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';
import {
    Sparkles,
    ExternalLink,
    CheckCircle2,
    ArrowRight,
    Shield,
    Smartphone,
    Layers,
    FileText,
    MessageSquare,
    Wand2,
    Lock,
    Zap
} from 'lucide-react';

export default function ProductsPage() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* Page Header */}
            <section style={{ padding: '4.5rem 1.5rem 3.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                            <Sparkles size={14} /> Software Portfolio
                        </span>
                        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                            Featured <span className="text-gradient">Software Products</span>
                        </h1>
                        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            A focused suite of mobile and web applications built to address creator workflows, professional career productivity, and prompt engineering.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Products Grid */}
            <section style={{ padding: '0 1.5rem 6rem' }}>
                <div className="container" style={{ maxWidth: '1180px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
                        {siteConfig.products.map((product, idx) => (
                            <motion.div
                                key={product.id}
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
                                    border: product.id === 'nexa-reply' ? '2px solid rgba(37, 99, 235, 0.35)' : '1px solid var(--border-color)',
                                    boxShadow: product.id === 'nexa-reply' ? '0 10px 30px rgba(37, 99, 235, 0.08)' : 'var(--shadow-sm)'
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                            <span className="badge badge-primary">{product.badge}</span>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                                {product.category}
                                            </span>
                                        </div>

                                        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                                            {product.name}
                                        </h2>
                                        <p style={{ fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 600, marginBottom: '1.25rem' }}>
                                            {product.fullName}
                                        </p>
                                        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                                            {product.fullDesc}
                                        </p>

                                        {/* Capabilities */}
                                        <div style={{ marginBottom: '2rem' }}>
                                            <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                                Core Capabilities
                                            </p>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                                {product.highlights.map((h, hIdx) => (
                                                    <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                                                        <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                        <span>{h}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                                        <Link href={product.slug} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                                            <span>Full Product Details</span>
                                            <ArrowRight size={16} />
                                        </Link>
                                        <a
                                            href={product.playStoreUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-playstore"
                                            style={{ padding: '0.75rem 1.5rem' }}
                                        >
                                            <Smartphone size={16} />
                                            <span>Get on Google Play</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>

                                {/* Visual Preview Card */}
                                <div style={{
                                    background: product.id === 'nexa-reply' ? 'linear-gradient(145deg, #0B1220 0%, #1E293B 100%)' : product.id === 'resume-pro' ? '#F1F5F9' : 'linear-gradient(145deg, #2E1065 0%, #1E1B4B 100%)',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    color: product.id === 'resume-pro' ? 'var(--text-main)' : '#FFFFFF',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    border: '1px solid var(--border-color)',
                                    minHeight: '320px'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.15)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem'
                                        }}>
                                            {product.icon}
                                        </div>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            padding: '4px 10px',
                                            borderRadius: '999px',
                                            background: product.id === 'resume-pro' ? 'var(--primary-blue-light)' : 'rgba(255,255,255,0.15)',
                                            color: product.id === 'resume-pro' ? 'var(--primary-blue)' : '#FFFFFF'
                                        }}>
                                            Verified App
                                        </span>
                                    </div>

                                    {/* Preview Content */}
                                    <div style={{ margin: '2rem 0' }}>
                                        {product.id === 'nexa-reply' && (
                                            <div>
                                                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
                                                    <p style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '4px' }}>Rule: Keyword Match</p>
                                                    <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#FFFFFF' }}>IF message contains "INFO" &rarr; SEND Catalog PDF Link</p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: '#60A5FA' }}>
                                                    <Zap size={14} /> Automatic Instant DM Reply
                                                </div>
                                            </div>
                                        )}

                                        {product.id === 'resume-pro' && (
                                            <div>
                                                <div style={{ background: '#FFFFFF', borderRadius: '10px', padding: '1rem', border: '1px solid var(--border-color)', marginBottom: '0.75rem' }}>
                                                    <div style={{ height: '8px', width: '50%', background: '#0F172A', borderRadius: '4px', marginBottom: '8px' }} />
                                                    <div style={{ height: '6px', width: '75%', background: '#64748B', borderRadius: '4px', marginBottom: '12px' }} />
                                                    <div style={{ display: 'flex', gap: '6px' }}>
                                                        <span style={{ fontSize: '0.7rem', background: '#F8FAFC', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>ATS Friendly</span>
                                                        <span style={{ fontSize: '0.7rem', background: '#F8FAFC', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>Vector PDF</span>
                                                    </div>
                                                </div>
                                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Structured layout engine</p>
                                            </div>
                                        )}

                                        {product.id === 'prompt-copy' && (
                                            <div>
                                                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
                                                    <p style={{ fontSize: '0.72rem', color: '#E9D5FF', marginBottom: '4px' }}>Curated Category: Cinematic</p>
                                                    <p style={{ fontSize: '0.82rem', color: '#FFFFFF', fontStyle: 'italic', lineHeight: 1.4 }}>
                                                        "Hyper-detailed portrait, volumetric lighting, photorealistic octane render..."
                                                    </p>
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem', color: '#F472B6' }}>
                                                    <Wand2 size={14} /> One-Click Copy &amp; Clipboard Sync
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Compliance Pill */}
                                    <div style={{
                                        fontSize: '0.72rem',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        background: product.id === 'resume-pro' ? '#FFFFFF' : 'rgba(0,0,0,0.3)',
                                        color: product.id === 'resume-pro' ? 'var(--text-muted)' : '#CBD5E1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}>
                                        <Shield size={13} color="var(--primary-blue)" />
                                        <span>Official Android Release on Google Play</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Media Query Injection */}
            <style jsx>{`
                @media (max-width: 900px) {
                    .card-light {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    );
}
