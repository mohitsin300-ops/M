'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Careers() {
    const jobs = [
        { title: "Senior React Developer", type: "Full-Time", location: "Remote / India", exp: "5+ Years" },
        { title: "UI/UX Designer", type: "Full-Time", location: "Remote", exp: "3+ Years" },
        { title: "Next.js Full Stack Engineer", type: "Contract", location: "Global", exp: "4+ Years" },
        { title: "AI/ML Engineer", type: "Full-Time", location: "Remote / India", exp: "2+ Years" }
    ];

    return (
        <main className="main-content">
            <section style={{ padding: '6rem 2rem 2rem', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
                >
                    Join Our Team
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 1rem' }}
                >
                    Build the future of software with MJ Tech Global.
                </motion.p>
                <Link href="/internship" className="btn-primary-large" style={{ display: 'inline-block', marginTop: '1rem' }}>Looking for an Internship? Apply Here</Link>
            </section>

            <section style={{ padding: '4rem 2rem 8rem', maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Open Positions ({jobs.length})</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {jobs.map((job, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '2rem',
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}
                        >
                            <div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    <span>📍 {job.location}</span>
                                    <span>⏱️ {job.type}</span>
                                    <span>🎯 {job.exp}</span>
                                </div>
                            </div>
                            <button className="btn-primary" style={{ padding: '0.8rem 1.5rem' }}>Apply Now</button>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
