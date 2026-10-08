'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../../lib/siteConfig';
import {
    Sparkles,
    CheckCircle2,
    Smartphone,
    ExternalLink,
    ArrowRight,
    Shield,
    Copy,
    Wand2,
    Layers,
    Search,
    Bookmark,
    Video,
    Image as ImageIcon
} from 'lucide-react';

export default function PromptCopyPage() {
    const product = siteConfig.products.find(p => p.id === 'prompt-copy');

    const promptCategories = [
        { title: "Photorealistic & Portrait", icon: "📸", desc: "Detailed camera settings, rim lighting, 85mm lens tokens, and natural skin textures." },
        { title: "Cinematic & Film Mood", icon: "🎬", desc: "Color grading, volumetric smoke, anamorphic lens flares, and dramatic framing." },
        { title: "3D Render & CGI", icon: "🧊", desc: "Octane render, unreal engine 5, claymation, and futuristic isometric concepts." },
        { title: "Digital Concept Art", icon: "🎨", desc: "Fantasy landscapes, cyberpunk cityscapes, matte painting, and anime illustration." },
        { title: "Generative Video Prompts", icon: "🎥", desc: "Motion direction, camera panning hints, and pacing prompts for Sora and Runway." },
        { title: "Vector & Logo Design", icon: "✒️", desc: "Minimalist brand vectors, flat icons, clean sticker art, and badge emblems." }
    ];

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* 1. HERO SECTION (CREATIVE PURPLE ACCENTS) */}
            <section style={{
                background: 'linear-gradient(135deg, #1E1B4B 0%, #2E1065 50%, #0F172A 100%)',
                color: '#FFFFFF',
                padding: '6rem 1.5rem 7rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-15%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <span className="badge badge-purple" style={{ background: 'rgba(124, 58, 237, 0.25)', color: '#C084FC', borderColor: 'rgba(192, 132, 252, 0.3)', marginBottom: '1.25rem' }}>
                                <Wand2 size={14} /> Creative AI Workflow Engine
                            </span>

                            <h1 style={{ fontSize: '3.25rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: '#FFFFFF' }}>
                                Explore Creative AI Prompts for <br />
                                <span className="text-gradient-purple">Images &amp; Videos</span>
                            </h1>

                            <p style={{ fontSize: '1.2rem', lineHeight: 1.65, color: '#CBD5E1', marginBottom: '2.25rem', maxWidth: '580px' }}>
                                Prompt Copy helps users discover, organize, and reuse prompts for AI image and video creation workflows.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                                <a
                                    href={product.playStoreUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', padding: '0.85rem 1.75rem', fontSize: '1rem' }}
                                >
                                    <Smartphone size={18} />
                                    <span>Download on Google Play</span>
                                    <ExternalLink size={15} />
                                </a>
                                <Link
                                    href="#categories"
                                    className="btn btn-secondary"
                                    style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)', padding: '0.85rem 1.75rem', fontSize: '1rem' }}
                                >
                                    <span>Browse Categories</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#E2E8F0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 size={16} color="#C084FC" /> One-Click Copy &amp; Reuse
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 size={16} color="#C084FC" /> Tested Multi-Clause Syntax
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CheckCircle2 size={16} color="#C084FC" /> Midjourney &bull; DALL-E &bull; Sora
                                </div>
                            </div>
                        </div>

                        {/* Interactive Prompt Card */}
                        <div style={{
                            background: 'rgba(15, 23, 42, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '24px',
                            padding: '2.25rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ImageIcon size={18} color="#C084FC" />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#E2E8F0', letterSpacing: '0.05em' }}>
                                        Curated Prompt Card
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.72rem', background: 'rgba(124, 58, 237, 0.3)', color: '#E9D5FF', padding: '3px 10px', borderRadius: '999px', fontWeight: 600 }}>
                                    Photorealism
                                </span>
                            </div>

                            <div style={{ background: '#0B1220', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.25rem' }}>
                                <p style={{ fontSize: '0.88rem', color: '#F8FAFC', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                                    "Hyper-realistic portrait of an astronaut exploring a glowing bioluminescent forest on an alien planet, dramatic rim lighting, shot on 35mm lens, f/1.8, cinematic lighting, 8k resolution, octane render --ar 16:9"
                                </p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '4px', color: '#CBD5E1' }}>Midjourney v6</span>
                                    <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '4px', color: '#CBD5E1' }}>16:9 Ratio</span>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', padding: '0.45rem 1rem', fontSize: '0.8rem', borderRadius: '8px' }}
                                    onClick={() => alert('Prompt copied to clipboard simulation!')}
                                >
                                    <Copy size={14} /> Copy Prompt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 2. CATEGORIES */}
            <section id="categories" style={{ padding: '6rem 1.5rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem' }}>
                        <span className="badge badge-purple">Structured Library</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0' }}>Curated Across Visual Styles</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Explore dozens of pre-tested modifiers, lighting parameters, and aspect ratios categorized for instant productivity.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        {promptCategories.map((cat, cIdx) => (
                            <div key={cIdx} className="card-light" style={{ padding: '2rem' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{cat.icon}</div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{cat.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 3. WORKFLOW */}
            <section style={{ padding: '6rem 1.5rem', background: '#FFFFFF', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
                        <span className="badge badge-primary">Instant Utility</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0' }}>The Copy-and-Use Workflow</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Designed to eliminate creative friction and speed up your image generation workflow.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        <div className="card-light" style={{ padding: '2.25rem', textAlign: 'center' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--secondary-purple-light)', color: 'var(--secondary-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
                                1
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Browse Categories</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                Select your desired visual genre, from photorealism to cinematic concepts and AI video triggers.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2.25rem', textAlign: 'center' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--secondary-purple-light)', color: 'var(--secondary-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
                                2
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>One-Tap Copy</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                Tap to copy tested prompts directly with full syntax, lighting keywords, and aspect ratio flags.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2.25rem', textAlign: 'center' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--secondary-purple-light)', color: 'var(--secondary-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
                                3
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Paste Into Any AI Tool</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                Paste into Discord, Web UIs, or API endpoints (Midjourney, Stable Diffusion, DALL-E, Sora) for instant results.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* 4. TRANSPARENCY STATEMENT */}
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
                            <Shield size={24} color="var(--secondary-purple)" />
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                                Product Role &amp; Technical Scope
                            </h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                            {product.complianceNote}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                            Prompt Copy is a creator reference tool. We do not claim built-in model weights or server-side GPU rendering inside the mobile client. All model trademarks belong to their respective creators.
                        </p>
                    </div>
                </div>
            </section>


            {/* 5. FUTURE ROADMAP */}
            <section style={{ padding: '6rem 1.5rem', background: 'var(--dark-navy)', color: '#FFFFFF' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
                        <span className="badge badge-dark">
                            <Wand2 size={14} color="#C084FC" /> Future Exploration
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.75rem 0', color: '#FFFFFF' }}>
                            Prompt Copy AI Roadmap
                        </h2>
                        <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>
                            Features in active development or research phase.
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
                        Elevate Your AI Creation Workflows
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Install Prompt Copy on Android to explore hundreds of verified creative prompts.
                    </p>
                    <a
                        href={product.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', padding: '0.95rem 2rem', fontSize: '1.05rem' }}
                    >
                        <Smartphone size={20} />
                        <span>Get Prompt Copy on Google Play</span>
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
