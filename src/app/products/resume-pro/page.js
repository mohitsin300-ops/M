'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../../lib/siteConfig';
import {
    FileText,
    CheckCircle2,
    Smartphone,
    ExternalLink,
    ArrowRight,
    Shield,
    Download,
    Eye,
    Layers,
    Lock,
    Sparkles,
    Briefcase,
    GraduationCap,
    Award
} from 'lucide-react';

export default function ResumeProPage() {
    const product = siteConfig.products.find(p => p.id === 'resume-pro');

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* 1. HERO SECTION (CLEAN PRODUCTIVITY THEME) */}
            <section style={{
                background: '#FFFFFF',
                borderBottom: '1px solid var(--border-color)',
                padding: '5rem 1.5rem 6rem'
            }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <span className="badge badge-success" style={{ marginBottom: '1.25rem' }}>
                                <CheckCircle2 size={14} /> Career Productivity Suite
                            </span>

                            <h1 style={{ fontSize: '3.25rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                                Create Professional Resumes with <span className="text-gradient">Modern Digital Tools</span>
                            </h1>

                            <p style={{ fontSize: '1.2rem', lineHeight: 1.65, color: 'var(--text-secondary)', marginBottom: '2.25rem', maxWidth: '580px' }}>
                                Resume Pro assists students, freshers, and experienced professionals in drafting elegant, ATS-friendly resumes formatted for modern recruitment workflows.
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
                                    style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
                                >
                                    <span>Explore Templates</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 size={16} color="var(--success)" /> ATS-Friendly Typography
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 size={16} color="var(--success)" /> 1-Minute Vector PDF Export
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 size={16} color="var(--success)" /> Device-Local Data Privacy
                                </div>
                            </div>
                        </div>

                        {/* Resume Visual Mockup */}
                        <div style={{
                            background: '#FFFFFF',
                            border: '1px solid var(--border-color)',
                            borderRadius: '20px',
                            boxShadow: 'var(--shadow-xl)',
                            padding: '2.25rem',
                            position: 'relative'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--primary-blue)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <div style={{ height: '14px', width: '180px', background: 'var(--text-main)', borderRadius: '4px', marginBottom: '6px' }} />
                                    <div style={{ height: '8px', width: '130px', background: 'var(--primary-blue)', borderRadius: '4px' }} />
                                </div>
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, background: 'var(--success-light)', color: 'var(--success)', padding: '4px 10px', borderRadius: '999px' }}>
                                    ATS Verified
                                </span>
                            </div>

                            {/* Resume Sections */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-blue)', marginBottom: '6px' }}>
                                        Work Experience
                                    </p>
                                    <div style={{ height: '8px', width: '85%', background: '#E2E8F0', borderRadius: '4px', marginBottom: '4px' }} />
                                    <div style={{ height: '8px', width: '70%', background: '#E2E8F0', borderRadius: '4px' }} />
                                </div>

                                <div>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-blue)', marginBottom: '6px' }}>
                                        Education &amp; Credentials
                                    </p>
                                    <div style={{ height: '8px', width: '80%', background: '#E2E8F0', borderRadius: '4px', marginBottom: '4px' }} />
                                    <div style={{ height: '8px', width: '65%', background: '#E2E8F0', borderRadius: '4px' }} />
                                </div>

                                <div>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-blue)', marginBottom: '6px' }}>
                                        Technical Skills
                                    </p>
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                        {['Python', 'React', 'SQL', 'Git', 'Agile'].map((skill, sIdx) => (
                                            <span key={sIdx} style={{ fontSize: '0.7rem', background: '#F1F5F9', padding: '3px 8px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                <span>Format: Standard A4 / Letter</span>
                                <span style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>Zero Watermarks</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 2. AVAILABLE FEATURES */}
            <section style={{ padding: '6rem 1.5rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem' }}>
                        <span className="badge badge-primary">Standardized Capabilities</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0' }}>Engineered for Hiring Systems</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Every design element in Resume Pro is engineered to pass algorithmic parsing without clipping, overlapping, or corrupting text.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        {product.capabilities.map((cap, cIdx) => (
                            <div key={cIdx} className="card-light" style={{ padding: '2rem' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                    <CheckCircle2 size={22} />
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{cap.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>{cap.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 3. WORKFLOW: 3 STEPS TO EXPORT */}
            <section id="workflow" style={{ padding: '6rem 1.5rem', background: '#FFFFFF', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
                        <span className="badge badge-primary">Workflow</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0' }}>How It Works</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Go from blank page to a finished, recruiter-ready resume in three straightforward steps.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        <div className="card-light" style={{ padding: '2.25rem', textAlign: 'center' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
                                1
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Enter Your Details</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                Fill out your professional history, degrees, projects, skills, and contact information with guided field prompts.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2.25rem', textAlign: 'center' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
                                2
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Select Layout Theme</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                Choose between minimalist corporate, modern engineer, or executive layout presets optimized for readability.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2.25rem', textAlign: 'center' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
                                3
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Export Clean PDF</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                Generate and download a high-res vector PDF directly onto your Android device ready to email or upload.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* 4. PRIVACY & DATA TRANSPARENCY */}
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
                            <Lock size={24} color="var(--success)" />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                                Device-First Privacy &amp; Data Safety
                            </h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                            Your resume contains sensitive contact information, work records, and career history. In Resume Pro, document generation happens directly inside your mobile device. We do not require account locks, personal data monetization, or forced cloud synchronization for basic resume drafting.
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                            {product.complianceNote}
                        </p>
                    </div>
                </div>
            </section>


            {/* 5. FUTURE AI ROADMAP */}
            <section style={{ padding: '6rem 1.5rem', background: 'var(--dark-navy)', color: '#FFFFFF' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
                        <span className="badge badge-dark">
                            <Sparkles size={14} color="#60A5FA" /> Future Roadmap
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0', color: '#FFFFFF' }}>
                            Resume Pro Planned Features
                        </h2>
                        <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>
                            Transparent development milestones. AI features are explicitly marked below and are not represented as existing rule-based templates.
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
                        Build Your ATS-Ready Resume Today
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Available on Google Play. Draft clean, formatted CVs in minutes with Resume Pro.
                    </p>
                    <a
                        href={product.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ padding: '0.95rem 2rem', fontSize: '1.05rem' }}
                    >
                        <Smartphone size={20} />
                        <span>Download Resume Pro on Google Play</span>
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
                    div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    );
}
