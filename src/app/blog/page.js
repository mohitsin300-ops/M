'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Blog() {
    const posts = [
        { title: "Why Next.js is the Future of Enterprise Web Apps", date: "Oct 24, 2024", tag: "Engineering" },
        { title: "Implementing Deep Learning in Healthcare", date: "Sep 15, 2024", tag: "AI/ML" },
        { title: "Building Scalable Cloud Infrastructure on AWS", date: "Aug 02, 2024", tag: "DevOps" },
        { title: "The Impact of Glassmorphism in Modern UI Design", date: "Jul 18, 2024", tag: "Design" }
    ];

    return (
        <main className="main-content">
            <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
                >
                    Tech Insights
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
                >
                    Latest news, architectural concepts, and engineering thoughts from our team.
                </motion.p>
            </section>

            <section style={{ padding: '2rem 2rem 8rem', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {posts.map((post, idx) => (
                        <motion.article
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            style={{
                                padding: '2rem',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: '250px'
                            }}
                        >
                            <div>
                                <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{post.tag}</span>
                                <h3 style={{ fontSize: '1.5rem', margin: '1rem 0', lineHeight: '1.4' }}>{post.title}</h3>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{post.date}</span>
                                <Link href="#" style={{ color: 'var(--accent)', fontWeight: '600' }}>Read &rarr;</Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>
        </main>
    );
}

