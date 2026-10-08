'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteConfig } from '../../lib/siteConfig';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function BlogPage() {
    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* Header */}
            <section style={{ padding: '5rem 1.5rem 3.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '850px' }}>
                    <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                        <BookOpen size={14} /> Engineering Insights
                    </span>
                    <h1 style={{ fontSize: '3.25rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                        The MJ Tech Global <span className="text-gradient">Blog</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                        Architectural notes, automation insights, and engineering reflections from our product team.
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <section style={{ padding: '0 1.5rem 6rem' }}>
                <div className="container" style={{ maxWidth: '1050px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                        {siteConfig.blogPosts.map((post) => (
                            <article
                                key={post.slug}
                                className="card-light"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    padding: '2.5rem',
                                    borderRadius: '20px'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span className="badge badge-primary">{post.category}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            <Clock size={13} /> {post.readTime}
                                        </div>
                                    </div>

                                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                                        <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                        {post.summary}
                                    </p>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingTop: '1.25rem',
                                    borderTop: '1px solid var(--border-color)',
                                    fontSize: '0.85rem'
                                }}>
                                    <span style={{ color: 'var(--text-muted)' }}>{post.date}</span>
                                    <Link href={`/blog/${post.slug}`} className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}>
                                        <span>Read Article</span>
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
