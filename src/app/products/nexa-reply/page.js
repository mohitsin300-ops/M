'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../../lib/siteConfig';
import {
    MessageSquare,
    Zap,
    ExternalLink,
    CheckCircle2,
    Shield,
    Smartphone,
    Layers,
    ArrowRight,
    Sparkles,
    AlertCircle,
    Clock,
    Lock,
    Settings,
    Send,
    Bot
} from 'lucide-react';

export default function NexaReplyPage() {
    const product = siteConfig.products.find(p => p.id === 'nexa-reply');

    const fadeInUp = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <main style={{ paddingTop: '75px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* 1. PRODUCT HERO (PREMIUM DARK BLUE HERO) */}
            <section style={{
                background: 'linear-gradient(135deg, #0B1220 0%, #111827 50%, #1E293B 100%)',
                color: '#FFFFFF',
                padding: '6rem 1.5rem 7rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <span className="badge badge-primary" style={{ background: 'rgba(37, 99, 235, 0.2)', color: '#60A5FA', borderColor: 'rgba(96, 165, 250, 0.3)', marginBottom: '1.25rem' }}>
                                <Zap size={14} /> Flagship Creator &amp; Business Automation
                            </span>

                            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: '#FFFFFF' }}>
                                Automate Instagram <br />
                                <span className="text-gradient-cyan">Conversations &amp; Engagement</span>
                            </h1>

                            <p style={{ fontSize: '1.2rem', lineHeight: 1.65, color: '#94A3B8', marginBottom: '2.25rem', maxWidth: '580px' }}>
                                Nexa Reply helps creators and businesses manage messaging workflows and customer engagement through automated communication tools.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                                <a
                                    href={product.playStoreUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
                                >
                                    <Smartphone size={18} />
                                    <span>Download on Google Play</span>
                                    <ExternalLink size={15} />
                                </a>
                                <Link
                                    href="#workflow"
                                    className="btn btn-secondary"
                                    style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.15)', padding: '0.85rem 1.75rem', fontSize: '1rem' }}
                                >
                                    <span>See How It Works</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#CBD5E1' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 size={16} color="#10B981" /> Keyword-Triggered DMs
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 size={16} color="#10B981" /> Comment-to-DM Triggers
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 size={16} color="#10B981" /> Custom Message Templates
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hero Visual */}
                        <div style={{
                            background: 'rgba(17, 24, 39, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '24px',
                            padding: '2rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <MessageSquare size={18} color="#FFFFFF" />
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem', color: '#FFFFFF' }}>Automation Dashboard</p>
                                        <p style={{ margin: 0, fontSize: '0.72rem', color: '#94A3B8' }}>Live Trigger Rules</p>
                                    </div>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} /> Active
                                </span>
                            </div>

                            {/* Simulated Chat Feed */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#0B1220', borderRadius: '14px', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                <div style={{ background: '#1E293B', padding: '0.75rem 1rem', borderRadius: '12px', alignSelf: 'flex-start', maxWidth: '85%' }}>
                                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600 }}>Instagram User (@creator_fan)</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#FFFFFF' }}>Can you share the eBook link from your latest reel?</p>
                                </div>

                                <div style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(37, 99, 235, 0.15)', color: '#60A5FA', padding: '3px 12px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>
                                    <Zap size={12} /> Matched Rule: Keyword "EBOOK"
                                </div>

                                <div style={{ background: 'var(--primary-blue)', padding: '0.75rem 1rem', borderRadius: '12px', alignSelf: 'flex-end', maxWidth: '85%' }}>
                                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Nexa Instant Auto-Reply</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#FFFFFF' }}>Here is your free download link! Check your inbox anytime: https://resource.link 🎁</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.78rem', color: '#94A3B8' }}>
                                <span>Response Time: &lt; 2 seconds</span>
                                <span style={{ color: '#60A5FA', fontWeight: 600 }}>Zero Missed Conversations</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 2. PROBLEM & SOLUTION */}
            <section style={{ padding: '6rem 1.5rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem' }}>
                        <span className="badge badge-primary">Problem &amp; Solution</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0' }}>The Challenge of Social Scale</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                            When viral reels or product campaigns generate hundreds of comments and direct messages, manual replies break down immediately.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                        <div className="card-light" style={{ padding: '2.5rem', borderLeft: '4px solid #EF4444' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: '#DC2626' }}>
                                The Manual Dilemma
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <li style={{ display: 'flex', gap: '10px' }}>
                                    <span style={{ color: '#EF4444', fontWeight: 'bold' }}>&times;</span>
                                    <span>Delayed responses cause warm leads to lose interest before hearing back.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '10px' }}>
                                    <span style={{ color: '#EF4444', fontWeight: 'bold' }}>&times;</span>
                                    <span>Repetitive copy-pasting links burns hours of creator time every day.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '10px' }}>
                                    <span style={{ color: '#EF4444', fontWeight: 'bold' }}>&times;</span>
                                    <span>Inconsistent responses create unprofessional customer impressions.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="card-light" style={{ padding: '2.5rem', borderLeft: '4px solid var(--primary-blue)' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary-blue)' }}>
                                The Nexa Reply Solution
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <li style={{ display: 'flex', gap: '10px' }}>
                                    <CheckCircle2 size={18} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
                                    <span>Instant automated replies triggered directly by keywords specified by you.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '10px' }}>
                                    <CheckCircle2 size={18} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
                                    <span>Comment-to-DM triggers send links to followers as soon as they leave a comment.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '10px' }}>
                                    <CheckCircle2 size={18} color="var(--primary-blue)" style={{ flexShrink: 0 }} />
                                    <span>Maintain complete control over templates, timing, and connection settings.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* 3. HOW IT WORKS / WORKFLOW */}
            <section id="workflow" style={{ padding: '6rem 1.5rem', background: '#FFFFFF', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
                        <span className="badge badge-primary">Simple Setup</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0' }}>How Nexa Reply Works</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            A streamlined 3-step workflow designed to take under 5 minutes to configure.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        <div className="card-light" style={{ padding: '2.25rem', textAlign: 'center' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
                                1
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Connect Account</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                Authenticate your account through standard connection permissions directly in the app.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2.25rem', textAlign: 'center' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
                                2
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Set Keyword Rules</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                Choose keywords (e.g. "PRICE", "GUIDE", "LINK") and craft personalized reply templates.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2.25rem', textAlign: 'center' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
                                3
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Automate Seamlessly</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                Nexa Reply monitors inbound signals and delivers replies promptly to incoming inquiries.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* 4. COMPLIANCE & TRANSPARENCY NOTICE */}
            <section style={{ padding: '5rem 1.5rem' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--border-color)',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                            <Shield size={24} color="var(--primary-blue)" />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                                Platform Compliance &amp; Transparency Statement
                            </h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                            {product.complianceNote}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                            <strong>Responsible Automation Note:</strong> Nexa Reply is an independent tool developed by MJ Tech Global. We do not claim official Meta partnership, endorsement, or guaranteed follower growth. Users are encouraged to maintain reasonable frequency limits and provide authentic value in all automated responses.
                        </p>
                    </div>
                </div>
            </section>


            {/* 5. FUTURE AI ROADMAP */}
            <section style={{ padding: '6rem 1.5rem', background: 'var(--dark-navy)', color: '#FFFFFF' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
                        <span className="badge badge-dark">
                            <Bot size={14} color="#60A5FA" /> Future Capabilities
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0', color: '#FFFFFF' }}>
                            Nexa Reply AI Roadmap
                        </h2>
                        <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>
                            Transparent development milestones. Unreleased capabilities are clearly classified below.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {product.futureRoadmap.map((item, rIdx) => (
                            <div key={rIdx} style={{
                                background: 'rgba(17, 24, 39, 0.85)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '16px',
                                padding: '1.75rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '1.5rem',
                                flexWrap: 'wrap'
                            }}>
                                <div>
                                    <h4 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '0.35rem' }}>{item.feature}</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0, maxWidth: '650px' }}>{item.desc}</p>
                                </div>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    padding: '4px 12px',
                                    borderRadius: '999px',
                                    background: item.status === 'In Development' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(168, 85, 247, 0.2)',
                                    color: item.status === 'In Development' ? '#60A5FA' : '#C084FC',
                                    border: `1px solid ${item.status === 'In Development' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(168, 85, 247, 0.4)'}`
                                }}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 6. DOWNLOAD CTA */}
            <section style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '750px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                        Ready to Streamline Your Social Inquiries?
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Install Nexa Reply today from Google Play and never miss an opportunity to connect with your audience.
                    </p>
                    <a
                        href={product.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ padding: '0.95rem 2rem', fontSize: '1.05rem' }}
                    >
                        <Smartphone size={20} />
                        <span>Get Nexa Reply on Google Play</span>
                        <ExternalLink size={16} />
                    </a>
                </div>
            </section>

            {/* Media Query Injection */}
            <style jsx>{`
                @media (max-width: 900px) {
                    section:first-of-type .container > div {
                        grid-template-columns: 1fr !important;
                    }
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
