'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';
import {
    Code,
    Cpu,
    Smartphone,
    Globe,
    Zap,
    Shield,
    Layers,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

export default function TechnologyPage() {
    const techStack = [
        {
            layer: "Mobile Client Engineering",
            tech: "Flutter & Dart",
            desc: "Flutter serves as our primary framework for building high-performance Android mobile applications. It enables native 60fps rendering, responsive UI canvas manipulation, and consistent offline-first data caching.",
            productsUsed: ["Nexa Reply", "Resume Pro", "Prompt Copy"],
            icon: "📱",
            benefits: ["Consistent Material & Cupertino rendering", "Fast on-device rendering loop", "Reliable Android SDK integration"]
        },
        {
            layer: "Full-Stack Web & Portals",
            tech: "React & Next.js",
            desc: "Next.js powers our server-rendered public web applications, verification portals, and authenticated administrative dashboards. Leveraging App Router and streaming SSR for sub-second page loads.",
            productsUsed: ["MJ Tech Global Portal", "Certificate Verification Engine", "Student Application Portal"],
            icon: "⚡",
            benefits: ["Server-Side Rendering (SSR)", "Automatic static optimization", "Integrated API routing & edge caching"]
        },
        {
            layer: "Realtime Data & Serverless",
            tech: "Firebase & Cloud Firestore",
            desc: "Firestore and Firebase Admin provide our realtime document database and authentication layer. Supporting rule-governed role access, real-time certificate record synchronization, and managed identity.",
            productsUsed: ["Verification Database", "Internship Records", "User Authentication"],
            icon: "🔥",
            benefits: ["Sub-100ms real-time queries", "Secure role-based security rules", "Serverless scalability"]
        },
        {
            layer: "Cloud Infrastructure & Object Storage",
            tech: "Amazon Web Services (AWS)",
            desc: "AWS provides scalable cloud computing, S3 object storage for application assets, and secure worker pipelines to ensure resilient and high-availability operations.",
            productsUsed: ["Asset Storage (S3)", "Cloud Infrastructure", "Worker Microservices"],
            icon: "☁️",
            benefits: ["Industry-standard 99.99% durability", "Elastic compute scaling", "Global cloud availability zones"]
        },
        {
            layer: "Edge CDN & Network Protection",
            tech: "Cloudflare",
            desc: "Cloudflare manages our global DNS routing, DDoS protection, edge caching, and SSL/TLS termination, ensuring sub-second response times worldwide.",
            productsUsed: ["Global CDN Edge", "DNS & DDoS Mitigation", "SSL/TLS Security"],
            icon: "🛡️",
            benefits: ["Global edge caching", "Enterprise DDoS protection", "Accelerated SSL/TLS handshake"]
        },
        {
            layer: "Backend Workflows & APIs",
            tech: "Node.js & Webhook Architecture",
            desc: "Node.js microservices and serverless endpoints orchestrate background webhook ingestion, form processing, and outbound messaging pipelines.",
            productsUsed: ["Application Ingestion API", "Social Workflow Handlers", "Notification Dispatchers"],
            icon: "⚙️",
            benefits: ["Non-blocking event loop", "Standardized JSON REST contracts", "Lightweight worker footprint"]
        }
    ];

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* Header */}
            <section style={{ padding: '5rem 1.5rem 3.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '850px' }}>
                    <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                        <Cpu size={14} /> Architecture &amp; Engineering
                    </span>
                    <h1 style={{ fontSize: '3.25rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                        Our <span className="text-gradient">Technology Stack</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                        A transparent overview of the battle-tested frameworks, cloud infrastructure, and toolchains powering our live software products.
                    </p>
                </div>
            </section>

            {/* Architecture Cards */}
            <section style={{ padding: '0 1.5rem 6rem' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {techStack.map((item, idx) => (
                            <div key={idx} className="card-light" style={{ padding: '3rem', borderRadius: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--light-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid var(--border-color)' }}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-blue)', letterSpacing: '0.05em' }}>
                                                {item.layer}
                                            </span>
                                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                                                {item.tech}
                                            </h2>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                        {item.productsUsed.map((p, pIdx) => (
                                            <span key={pIdx} style={{ fontSize: '0.75rem', fontWeight: 600, background: 'var(--primary-blue-light)', color: 'var(--primary-blue)', padding: '3px 10px', borderRadius: '999px' }}>
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                                    {item.desc}
                                </p>

                                <div style={{ background: 'var(--light-bg)', borderRadius: '12px', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
                                    <p style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                                        Why We Rely on This Stack:
                                    </p>
                                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                        {item.benefits.map((b, bIdx) => (
                                            <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                                                <CheckCircle2 size={15} color="var(--success)" />
                                                <span>{b}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                        <Link href="/products" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                            <span>See How These Technologies Power Our Products</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
