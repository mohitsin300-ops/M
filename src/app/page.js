'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../lib/siteConfig';
import {
    Sparkles,
    ArrowRight,
    ExternalLink,
    CheckCircle2,
    Shield,
    Cpu,
    Smartphone,
    Globe,
    Zap,
    Layers,
    MessageSquare,
    FileText,
    Wand2,
    Award,
    Code,
    ChevronRight
} from 'lucide-react';
import './Home.css';

export default function Home() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    return (
        <main className="home-main">
            {/* 1. HERO SECTION */}
            <section className="hero-section">
                <div className="hero-glow-container" aria-hidden="true">
                    <div className="hero-orb orb-primary" />
                    <div className="hero-orb orb-purple" />
                    <div className="hero-grid-pattern" />
                </div>

                <div className="container hero-container">
                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="hero-pill-badge">
                            <span className="pill-dot" />
                            <span>Software Products &bull; Automation &bull; AI</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="hero-heading">
                            Building Smarter Digital Products for <span className="text-gradient">Everyday Problems</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="hero-description">
                            MJ Tech Global develops modern mobile applications, productivity tools, and automation solutions that simplify digital experiences.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="hero-actions">
                            <Link href="/products" className="btn btn-primary btn-hero">
                                <Sparkles size={18} />
                                <span>Explore Our Products</span>
                            </Link>
                            <Link href="/about" className="btn btn-secondary btn-hero">
                                <span>Discover MJ Tech Global</span>
                                <ArrowRight size={17} />
                            </Link>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="hero-trust-bar">
                            <div className="trust-item">
                                <CheckCircle2 size={16} className="trust-check" />
                                <span>Verified Play Store Apps</span>
                            </div>
                            <div className="trust-item">
                                <CheckCircle2 size={16} className="trust-check" />
                                <span>MSME Registered Enterprise</span>
                            </div>
                            <div className="trust-item">
                                <CheckCircle2 size={16} className="trust-check" />
                                <span>Practical Engineering</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Hero Visual Mockup Composition */}
                    <motion.div
                        className="hero-visual-wrapper"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="product-showcase-stage">
                            {/* Card 1: Nexa Reply (Center/Front) */}
                            <motion.div
                                className="showcase-card showcase-nexa"
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="card-top-bar">
                                    <div className="app-meta">
                                        <div className="app-icon-squircle icon-nexa">💬</div>
                                        <div>
                                            <span className="app-card-title">Nexa Reply</span>
                                            <span className="app-card-sub">Instagram Auto DM</span>
                                        </div>
                                    </div>
                                    <span className="badge badge-primary">Flagship</span>
                                </div>

                                <div className="mockup-chat-body">
                                    <div className="chat-bubble in">
                                        <p className="bubble-sender">Instagram User</p>
                                        <p className="bubble-text">Send me the course details please!</p>
                                    </div>
                                    <div className="chat-trigger-pill">
                                        <Zap size={12} /> Keyword Triggered: "COURSE"
                                    </div>
                                    <div className="chat-bubble out">
                                        <p className="bubble-sender">Nexa Auto-Reply</p>
                                        <p className="bubble-text">Here is your private access link and syllabus! 🚀</p>
                                    </div>
                                </div>

                                <div className="card-footer-action">
                                    <span className="status-indicator">
                                        <span className="status-dot green" /> Active Automation Engine
                                    </span>
                                    <Link href="/products/nexa-reply" className="card-quick-link">
                                        View Details &rarr;
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Card 2: Resume Pro (Floating Right/Back) */}
                            <motion.div
                                className="showcase-card showcase-resume"
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            >
                                <div className="card-top-bar">
                                    <div className="app-meta">
                                        <div className="app-icon-squircle icon-resume">📄</div>
                                        <div>
                                            <span className="app-card-title">Resume Pro</span>
                                            <span className="app-card-sub">ATS CV Builder</span>
                                        </div>
                                    </div>
                                    <span className="badge badge-success">Productivity</span>
                                </div>

                                <div className="resume-mini-preview">
                                    <div className="resume-skeleton-header">
                                        <div className="resume-name-bar" />
                                        <div className="resume-sub-bar" />
                                    </div>
                                    <div className="resume-skeleton-content">
                                        <div className="resume-chip">Experience</div>
                                        <div className="resume-chip">Education</div>
                                        <div className="resume-chip">Skills</div>
                                    </div>
                                    <div className="resume-export-tag">
                                        <CheckCircle2 size={13} color="#16A34A" /> Ready for ATS 1-Min Export
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 3: Prompt Copy (Floating Left/Back) */}
                            <motion.div
                                className="showcase-card showcase-prompt"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            >
                                <div className="card-top-bar">
                                    <div className="app-meta">
                                        <div className="app-icon-squircle icon-prompt">✨</div>
                                        <div>
                                            <span className="app-card-title">Prompt Copy</span>
                                            <span className="app-card-sub">AI Image &amp; Video</span>
                                        </div>
                                    </div>
                                    <span className="badge badge-purple">Creative AI</span>
                                </div>

                                <div className="prompt-mini-preview">
                                    <p className="prompt-text-snippet">
                                        "Cinematic photorealistic portrait, 35mm lens, rim lighting, 8k..."
                                    </p>
                                    <div className="prompt-tags">
                                        <span className="tag-item">Midjourney</span>
                                        <span className="tag-item">Sora</span>
                                        <span className="tag-item">DALL-E</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* 2. COMPANY INTRODUCTION */}
            <section className="section-intro">
                <div className="container">
                    <motion.div
                        className="intro-wrapper card-light"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={fadeInUp}
                    >
                        <div className="intro-header">
                            <span className="badge badge-primary">About MJ Tech Global</span>
                            <h2>Creating Technology That Solves Real Problems</h2>
                        </div>
                        <p className="intro-body">
                            MJ Tech Global is an India-based technology and software development company founded by <strong>Mohit Singh</strong>. We prioritize practical software architecture over decorative gimmicks. Rather than building speculative IT concepts, our product lab designs and ships tangible mobile applications, creator engagement utilities, and business automation software used daily across the Google Play ecosystem.
                        </p>
                        <div className="intro-stats-row">
                            <div className="intro-stat-item">
                                <span className="stat-number">3+</span>
                                <span className="stat-label">Core Featured Software Products</span>
                            </div>
                            <div className="intro-stat-item">
                                <span className="stat-number">MSME</span>
                                <span className="stat-label">Government Registered Enterprise</span>
                            </div>
                            <div className="intro-stat-item">
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Native &amp; Cross-Platform Codebases</span>
                            </div>
                            <div className="intro-stat-item">
                                <span className="stat-number">0</span>
                                <span className="stat-label">Inflated Metrics or Fabricated Claims</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* 3. STRICT FEATURED PRODUCTS SECTION */}
            <section className="section-products">
                <div className="container">
                    <div className="section-title-wrap">
                        <span className="badge badge-primary">Our Product Suite</span>
                        <h2 className="section-title">Discover Our Products</h2>
                        <p className="section-subtitle">
                            Focused software solutions addressing real creator workflows, career productivity, and prompt engineering.
                        </p>
                    </div>

                    <div className="featured-products-grid">
                        {siteConfig.products.map((product, idx) => (
                            <motion.article
                                key={product.id}
                                className={`product-card card-light ${product.id === 'nexa-reply' ? 'is-flagship' : ''}`}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeInUp}
                            >
                                {product.id === 'nexa-reply' && (
                                    <div className="flagship-ribbon">
                                        <Sparkles size={13} /> Flagship Automation
                                    </div>
                                )}

                                <div className="product-card-header">
                                    <div className="product-card-icon-box">
                                        <span className="product-emoji">{product.icon}</span>
                                    </div>
                                    <div className="product-card-category-box">
                                        <span className="product-card-badge">{product.badge}</span>
                                        <span className="product-card-category">{product.category}</span>
                                    </div>
                                </div>

                                <h3 className="product-card-name">{product.name}</h3>
                                <p className="product-card-fullname">{product.fullName}</p>
                                <p className="product-card-desc">{product.shortDesc}</p>

                                <div className="product-highlights-box">
                                    <p className="highlights-title">Key Capabilities:</p>
                                    <ul className="highlights-list">
                                        {product.highlights.slice(0, 3).map((item, hIdx) => (
                                            <li key={hIdx}>
                                                <CheckCircle2 size={14} className="highlight-check" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="product-card-actions">
                                    <Link href={product.slug} className="btn btn-secondary btn-full">
                                        <span>Product Details</span>
                                        <ChevronRight size={16} />
                                    </Link>
                                    <a
                                        href={product.playStoreUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-playstore btn-full"
                                    >
                                        <span>Google Play</span>
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>


            {/* 4. PRODUCT CAPABILITIES & REAL PROBLEMS SOLVED */}
            <section className="section-capabilities">
                <div className="container">
                    <div className="section-title-wrap">
                        <span className="badge badge-purple">Problem Solving</span>
                        <h2 className="section-title">Built to Solve Everyday Roadblocks</h2>
                        <p className="section-subtitle">
                            Software is only valuable when it removes friction. Here is how our products deliver practical utility.
                        </p>
                    </div>

                    <div className="capabilities-grid">
                        <div className="capability-card card-light">
                            <div className="capability-icon-wrap" style={{ background: 'var(--primary-blue-light)', color: 'var(--primary-blue)' }}>
                                <MessageSquare size={26} />
                            </div>
                            <h3>Creator Engagement Overload</h3>
                            <p>
                                Instagram creators miss leads and inquiries because manual DMing does not scale. <strong>Nexa Reply</strong> automates comment-to-DM workflows and keyword triggers with user-authorized rules.
                            </p>
                            <Link href="/products/nexa-reply" className="capability-link">
                                Explore Nexa Reply &rarr;
                            </Link>
                        </div>

                        <div className="capability-card card-light">
                            <div className="capability-icon-wrap" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>
                                <FileText size={26} />
                            </div>
                            <h3>ATS Rejections &amp; Formatting Bugs</h3>
                            <p>
                                Complex resume templates crash applicant tracking parsers. <strong>Resume Pro</strong> generates standardized, ATS-tested vector PDFs in minutes on-device without subscription traps.
                            </p>
                            <Link href="/products/resume-pro" className="capability-link">
                                Explore Resume Pro &rarr;
                            </Link>
                        </div>

                        <div className="capability-card card-light">
                            <div className="capability-icon-wrap" style={{ background: 'var(--secondary-purple-light)', color: 'var(--secondary-purple)' }}>
                                <Wand2 size={26} />
                            </div>
                            <h3>Inconsistent AI Generation Results</h3>
                            <p>
                                Users waste credits guessing prompt syntax for image and video models. <strong>Prompt Copy</strong> curates tested prompt parameters, lighting keywords, and style tokens ready to copy.
                            </p>
                            <Link href="/products/prompt-copy" className="capability-link">
                                Explore Prompt Copy &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* 5. VERIFIED TECHNOLOGY STACK */}
            <section className="section-technology">
                <div className="container">
                    <div className="section-title-wrap">
                        <span className="badge badge-primary">Technical Foundation</span>
                        <h2 className="section-title">Verified Development Technologies</h2>
                        <p className="section-subtitle">
                            We build on proven, battle-tested modern platforms with strict code quality and maintainability.
                        </p>
                    </div>

                    <div className="tech-cards-grid">
                        {siteConfig.technologies.map((tech, idx) => (
                            <motion.div
                                key={idx}
                                className="tech-box card-light"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <div className="tech-icon-circle">{tech.icon}</div>
                                <div className="tech-info">
                                    <span className="tech-category-pill">{tech.category}</span>
                                    <h4>{tech.name}</h4>
                                    <p>{tech.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="tech-footer-cta">
                        <Link href="/technology" className="btn btn-secondary">
                            <span>Deep Dive into Our Architecture &amp; Tech Stack</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>


            {/* 6. AI INNOVATION (PREMIUM DARK SECTION) */}
            <section className="section-ai-dark">
                <div className="container">
                    <div className="ai-dark-container">
                        <div className="ai-header-col">
                            <span className="badge badge-dark">
                                <Sparkles size={14} color="#60A5FA" /> Responsible AI Direction
                            </span>
                            <h2 className="ai-main-title">
                                Exploring Practical AI for <span className="text-gradient-cyan">Smarter Products</span>
                            </h2>
                            <p className="ai-main-desc">
                                We treat artificial intelligence not as marketing hype, but as a contextual engine to improve real workflows. Our roadmap focuses on high-precision tasks like response suggestion, ATS keyword optimization, and prompt refiners.
                            </p>

                            <div className="ai-status-legend">
                                <div className="legend-item"><span className="legend-dot in-dev" /> In Development</div>
                                <div className="legend-item"><span className="legend-dot planned" /> Planned</div>
                                <div className="legend-item"><span className="legend-dot research" /> Research Phase</div>
                            </div>

                            <Link href="/ai-innovation" className="btn btn-primary" style={{ marginTop: '1.5rem', width: 'fit-content' }}>
                                <span>Read Full AI Innovation Roadmap</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="ai-roadmap-cards-col">
                            <div className="ai-roadmap-card">
                                <div className="roadmap-card-top">
                                    <span className="roadmap-app-tag">Nexa Reply</span>
                                    <span className="roadmap-status-pill in-dev">In Development</span>
                                </div>
                                <h4>Customer Intent Classification</h4>
                                <p>Categorizing inbound messages into sales leads, support questions, or standard comments to trigger targeted reply sequences.</p>
                            </div>

                            <div className="ai-roadmap-card">
                                <div className="roadmap-card-top">
                                    <span className="roadmap-app-tag">Resume Pro</span>
                                    <span className="roadmap-status-pill in-dev">In Development</span>
                                </div>
                                <h4>Action-Oriented Bullet Point Enhancer</h4>
                                <p>Refining resume bullet points to emphasize quantifiable impact, metrics, and active verbs for recruiter clarity.</p>
                            </div>

                            <div className="ai-roadmap-card">
                                <div className="roadmap-card-top">
                                    <span className="roadmap-app-tag">Prompt Copy</span>
                                    <span className="roadmap-status-pill research">Research</span>
                                </div>
                                <h4>Claude API Prompt Expander Exploration</h4>
                                <p>Investigating Anthropic Claude API capabilities to systematically expand simple concept inputs into multi-clause visual generation prompts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 7. COMPANY LEADERSHIP & STORY */}
            <section className="section-founder">
                <div className="container">
                    <div className="founder-card card-light">
                        <div className="founder-avatar-box">
                            <div className="founder-avatar-initials">MS</div>
                            <span className="founder-badge">Founder &amp; CEO</span>
                        </div>
                        <div className="founder-info-box">
                            <span className="badge badge-primary">Company Leadership</span>
                            <h2>Mohit Singh</h2>
                            <p className="founder-title">Founder &amp; Chief Executive Officer &bull; MJ Tech Global</p>
                            <blockquote className="founder-quote">
                                "Our mission is simple: solve tangible problems with well-crafted, lightweight digital tools. We do not chase empty buzzwords or unverified metrics. We build apps that people can install, rely upon, and use seamlessly."
                            </blockquote>
                            <div className="founder-links">
                                <Link href="/about" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                                    Read Company Story
                                </Link>
                                <a href={`mailto:${siteConfig.emails.founder}`} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                                    Email Founder Directly
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 8. CALL TO ACTION */}
            <section className="section-cta">
                <div className="container">
                    <div className="cta-banner">
                        <div className="cta-content">
                            <span className="badge badge-primary" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}>
                                Ready to Experience MJ Tech Global?
                            </span>
                            <h2>Explore the Products We're Building</h2>
                            <p>
                                Download our verified mobile applications directly from Google Play or get in touch for custom software engineering collaborations.
                            </p>
                            <div className="cta-buttons">
                                <Link href="/products" className="btn btn-secondary cta-btn-white">
                                    <Sparkles size={16} color="var(--primary-blue)" />
                                    <span>Explore All Products</span>
                                </Link>
                                <Link href="/contact" className="btn btn-dark cta-btn-outline">
                                    <span>Contact Our Team</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
