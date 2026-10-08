'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function Careers() {
    const jobs = [
        { title: "React & Next.js Full-Stack Engineer", type: "Full-Time / Contract", location: "Remote (India)", exp: "1–3 Years" },
        { title: "Flutter Mobile Developer", type: "Full-Time / Contract", location: "Remote (India)", exp: "1–3 Years" },
        { title: "UI/UX & Product Designer", type: "Full-Time / Contract", location: "Remote", exp: "1–3 Years" },
        { title: "Python & Machine Learning Specialist", type: "Contract", location: "Remote", exp: "2+ Years" }
    ];

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* Header */}
            <section style={{ padding: '5rem 1.5rem 3.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '850px' }}>
                    <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                        <Briefcase size={14} /> Join The Team
                    </span>
                    <h1 style={{ fontSize: '3.25rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                        Careers at <span className="text-gradient">MJ Tech Global</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                        Build practical mobile applications, creator automation tools, and productivity software that reach thousands of daily users.
                    </p>
                    <Link href="/internship" className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
                        Looking for an Internship? Click Here &rarr;
                    </Link>
                </div>
            </section>

            {/* Jobs List */}
            <section style={{ padding: '0 1.5rem 6rem' }}>
                <div className="container" style={{ maxWidth: '950px' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.75rem' }}>
                        Open Positions ({jobs.length})
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {jobs.map((job, idx) => (
                            <div
                                key={idx}
                                className="card-light"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '2rem',
                                    borderRadius: '16px',
                                    flexWrap: 'wrap',
                                    gap: '1.25rem'
                                }}
                            >
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                                        {job.title}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <MapPin size={14} /> {job.location}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={14} /> {job.type}
                                        </span>
                                        <span>Target Exp: {job.exp}</span>
                                    </div>
                                </div>

                                <a
                                    href={`mailto:${siteConfig.emails.founder}?subject=Application for ${encodeURIComponent(job.title)}`}
                                    className="btn btn-primary"
                                    style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
                                >
                                    <span>Apply Via Email</span>
                                    <ArrowRight size={15} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
