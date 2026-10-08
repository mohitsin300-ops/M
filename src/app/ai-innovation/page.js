'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';
import {
    Sparkles,
    Bot,
    Cpu,
    CheckCircle2,
    Shield,
    ArrowRight,
    Zap,
    Lock,
    HelpCircle,
    Layers,
    Code
} from 'lucide-react';

export default function AIInnovationPage() {
    const roadmapItems = [
        {
            app: "Nexa Reply",
            title: "Customer Intent Classification",
            status: "In Development",
            category: "Natural Language Processing",
            desc: "Classifying incoming direct messages into intent categories (pricing query, technical question, feedback, partnership) to route into appropriate templated branches."
        },
        {
            app: "Resume Pro",
            title: "Action-Oriented Bullet Point Enhancer",
            status: "In Development",
            category: "Content Optimization",
            desc: "Helping candidates rewrite passive resume phrases into quantifiable, metric-driven achievements tailored for recruiter readability."
        },
        {
            app: "Prompt Copy",
            title: "Claude API Prompt Expansion Pipeline",
            status: "Research Phase",
            category: "Generative AI Exploration",
            desc: "Exploring Anthropic Claude API prompt engineering workflows to take high-level creative concepts and synthesize structured, multi-clause generation prompts."
        },
        {
            app: "Nexa Reply",
            title: "AI-Assisted Reply Drafting",
            status: "Planned",
            category: "Workflow Assistance",
            desc: "Drafting suggested responses for complex creator messages that require human review before dispatch."
        },
        {
            app: "Resume Pro",
            title: "Job Description Match Scoring",
            status: "Planned",
            category: "Recruitment Alignment",
            desc: "Algorithmic comparison between resume content and job description keywords to highlight missing qualifications."
        }
    ];

    const principles = [
        {
            title: "User In The Loop",
            desc: "Automated systems should augment human intent, never displace control. Critical messages and career documents always provide review mechanisms."
        },
        {
            title: "Zero Hallucinated Metrics",
            desc: "We do not claim machine learning exists where simple rule engines suffice. We clearly delineate deterministic algorithms from generative models."
        },
        {
            title: "Data Minimization & Privacy",
            desc: "User inputs sent for inference must be stripped of unnecessary identifiers and never retained to train proprietary models without consent."
        },
        {
            title: "Clear Developmental Status",
            desc: "Every AI capability is transparently labeled as Available, In Development, Planned, or Research. We do not market roadmaps as existing software."
        }
    ];

    return (
        <main style={{ paddingTop: '75px', minHeight: '100vh', background: 'var(--dark-navy)', color: '#FFFFFF' }}>
            {/* 1. HERO SECTION (DARK TECHNOLOGY THEME) */}
            <section style={{
                padding: '6rem 1.5rem 5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '800px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ maxWidth: '880px', position: 'relative', zIndex: 1 }}>
                    <span className="badge badge-dark" style={{ marginBottom: '1.25rem' }}>
                        <Sparkles size={14} color="#60A5FA" /> Applied Artificial Intelligence
                    </span>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: '#FFFFFF' }}>
                        Exploring Practical AI for <br />
                        <span className="text-gradient-cyan">Smarter Digital Products</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#94A3B8', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto 2.5rem' }}>
                        Our AI research is pragmatic: we integrate language models and machine intelligence only where they reduce human friction, improve document precision, and streamline customer communication.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#CBD5E1' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} /> In Development
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#A855F7' }} /> Planned Releases
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EAB308' }} /> Research Phase
                        </span>
                    </div>
                </div>
            </section>


            {/* 2. PHILOSOPHY & ANTHROPIC CLAUDE EXPLORATION */}
            <section style={{ padding: '6rem 1.5rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <span className="badge badge-dark" style={{ marginBottom: '1rem' }}>Development Philosophy</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.25rem', color: '#FFFFFF' }}>
                                Pragmatic Integration Over Speculative Hype
                            </h2>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#94A3B8', marginBottom: '1.25rem' }}>
                                Modern artificial intelligence is a powerful accelerator when applied to bounded, well-defined problems. Rather than claiming our products are wholly autonomous, we explore API integrations that deliver immediate utility: drafting suggestions for creators, syntax restructuring for resumes, and prompt engineering taxonomies.
                            </p>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#94A3B8', marginBottom: '1.75rem' }}>
                                As part of our product evolution, our team is researching the <strong>Anthropic Claude API</strong> to evaluate its potential for context-aware customer response recommendations and high-precision structured text generation.
                            </p>
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '12px',
                                padding: '1.25rem',
                                fontSize: '0.85rem',
                                color: '#CBD5E1',
                                lineHeight: 1.6
                            }}>
                                <strong style={{ color: '#FFFFFF' }}>Compliance &amp; Relationship Transparency:</strong> MJ Tech Global conducts independent technical research into LLM APIs including Claude. We do not claim official corporate partnership, sponsorship, or pre-approval from Anthropic or third-party AI lab providers.
                            </div>
                        </div>

                        {/* Interactive Feature Matrix */}
                        <div style={{
                            background: '#111827',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '24px',
                            padding: '2.5rem'
                        }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem' }}>
                                Target Integration Architecture
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ background: '#1E293B', padding: '1rem', borderRadius: '10px' }}>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#60A5FA', fontWeight: 700, textTransform: 'uppercase' }}>Layer 1: Input Ingestion</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#FFFFFF' }}>Direct message, resume section, or prompt seed</p>
                                </div>
                                <div style={{ background: '#1E293B', padding: '1rem', borderRadius: '10px' }}>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#A855F7', fontWeight: 700, textTransform: 'uppercase' }}>Layer 2: Prompt Orchestration</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#FFFFFF' }}>Structured system guidelines, safety boundaries, few-shot examples</p>
                                </div>
                                <div style={{ background: '#1E293B', padding: '1rem', borderRadius: '10px' }}>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#10B981', fontWeight: 700, textTransform: 'uppercase' }}>Layer 3: Human Verification</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#FFFFFF' }}>Candidate preview, creator review, and final user dispatch</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 3. DETAILED AI ROADMAP */}
            <section style={{ padding: '6rem 1.5rem', background: '#070C15', borderTop: '1px solid rgba(255, 255, 255, 0.08)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
                        <span className="badge badge-dark">Development Milestones</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0', color: '#FFFFFF' }}>
                            AI Capabilities Roadmap
                        </h2>
                        <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>
                            Classified by development status across our product portfolio.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {roadmapItems.map((item, idx) => (
                            <div key={idx} style={{
                                background: '#111827',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '18px',
                                padding: '2rem',
                                display: 'grid',
                                gridTemplateColumns: '1.2fr 0.8fr',
                                gap: '2rem',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#60A5FA' }}>
                                            {item.app}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>&bull;</span>
                                        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{item.category}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', fontWeight: 700, marginBottom: '0.5rem' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                                        {item.desc}
                                    </p>
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                    <span style={{
                                        fontSize: '0.78rem',
                                        fontWeight: 700,
                                        padding: '5px 14px',
                                        borderRadius: '999px',
                                        background: item.status === 'In Development' ? 'rgba(59, 130, 246, 0.2)' : item.status === 'Planned' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                                        color: item.status === 'In Development' ? '#60A5FA' : item.status === 'Planned' ? '#C084FC' : '#FACC15',
                                        border: `1px solid ${item.status === 'In Development' ? 'rgba(59, 130, 246, 0.4)' : item.status === 'Planned' ? 'rgba(168, 85, 247, 0.4)' : 'rgba(234, 179, 8, 0.4)'}`
                                    }}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 4. RESPONSIBLE AI PRINCIPLES */}
            <section style={{ padding: '6rem 1.5rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
                        <span className="badge badge-dark">Ethics &amp; Safety</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0', color: '#FFFFFF' }}>
                            Responsible AI Principles
                        </h2>
                        <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>
                            Our commitments to privacy, user agency, and safety across every automated experience.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {principles.map((pr, pIdx) => (
                            <div key={pIdx} style={{
                                background: '#111827',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '18px',
                                padding: '2.25rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                                    <Shield size={20} color="#60A5FA" />
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>{pr.title}</h3>
                                </div>
                                <p style={{ fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>{pr.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <Link href="/products" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                            <span>Explore Our Active Software Products</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Responsive */}
            <style jsx>{`
                @media (max-width: 900px) {
                    section:nth-of-type(2) .container > div {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="gridTemplateColumns: 1.2fr 0.8fr"] {
                        grid-template-columns: 1fr !important;
                        text-align: left;
                    }
                    div[style*="gridTemplateColumns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    );
}
