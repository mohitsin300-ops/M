'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';
import {
    Sparkles,
    CheckCircle2,
    Shield,
    Award,
    Target,
    Compass,
    Code,
    Cpu,
    ArrowRight,
    Mail,
    Smartphone
} from 'lucide-react';

export default function About() {
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
                            <Shield size={14} /> Corporate Profile
                        </span>
                        <h1 style={{ fontSize: '3.25rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                            About <span className="text-gradient">MJ Tech Global</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                            We are an Indian technology and software development company dedicated to engineering practical mobile applications, creator automation tools, and productivity solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Grid */}
            <section style={{ padding: '0 1.5rem 5rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <motion.div
                            className="card-light"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            style={{ padding: '3rem', borderTop: '4px solid var(--primary-blue)' }}
                        >
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Target size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>Our Mission</h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                                "{siteConfig.tagline} — To build practical and accessible digital products that solve everyday problems."
                            </p>
                        </motion.div>

                        <motion.div
                            className="card-light"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            style={{ padding: '3rem', borderTop: '4px solid var(--secondary-purple)' }}
                        >
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--secondary-purple-light)', color: 'var(--secondary-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Compass size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>Our Vision</h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                                "To create useful software products while continuously exploring innovation and responsible AI capabilities that genuinely empower creators, professionals, and small businesses."
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Leadership & Authentic Verification */}
            <section style={{ padding: '5rem 1.5rem', background: '#FFFFFF', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
                        <div>
                            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Leadership</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                                Founded by Mohit Singh
                            </h2>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                MJ Tech Global was established under the leadership of <strong>Mohit Singh</strong> (Founder &amp; CEO) with a commitment to pragmatic engineering. Rather than pursuing speculative ideas without working code, our lab focuses on shipping functional software products into public app stores.
                            </p>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                Supported by Technical Head <strong>Mr. Rohit</strong>, we oversee end-to-end product architecture across Android mobile clients (Flutter), web services (Next.js), cloud databases (Firebase/Firestore), and automation pipelines.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <a href={`mailto:${siteConfig.emails.founder}`} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                                    <Mail size={16} /> Contact Founder
                                </a>
                                <Link href="/contact" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
                                    <span>Business Inquiries</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* Government Registration & Credibility Card */}
                        <div className="card-light" style={{ padding: '2.5rem', background: 'var(--light-bg)', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '2rem' }}>🇮🇳</div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Government Registered Enterprise</h3>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ministry of Micro, Small &amp; Medium Enterprises (MSME)</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: 0 }}>Entity Name</p>
                                    <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: '2px 0 0 0' }}>MJ Tech Global</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: 0 }}>Udyam Registration Number (URN)</p>
                                    <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-blue)', fontFamily: 'monospace', margin: '2px 0 0 0' }}>
                                        {siteConfig.registration.urn}
                                    </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, margin: 0 }}>Operational Country</p>
                                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', margin: '2px 0 0 0' }}>India (Serving Global Users)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section style={{ padding: '6rem 1.5rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
                        <span className="badge badge-primary">Principles</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0' }}>How We Build</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Our product decisions are guided by three fundamental commitments.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        <div className="card-light" style={{ padding: '2.25rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                <Smartphone size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Real Usability First</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                We build features that solve measurable pain points, whether that is reducing response latency on Instagram or speeding up resume generation to 60 seconds.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2.25rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--secondary-purple-light)', color: 'var(--secondary-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                <Code size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Clean, Maintainable Code</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                We write modular architectures in React, Next.js, and Flutter. We test thoroughly for layout stability, accessibility, and high performance across devices.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2.25rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                <Shield size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Honest Transparency</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                We refuse to fabricate client counts, partner logos, or fake certifications. What you see on our website represents verified, public software releases.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Responsive */}
            <style jsx>{`
                @media (max-width: 900px) {
                    div[style*="gridTemplateColumns: 1fr 1fr"] {
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
