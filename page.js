'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <main className="main-content">
            <section className="page-header">
                <div className="container" style={{ textAlign: 'center', padding: '6rem 2rem 4rem' }}>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-gradient"
                        style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
                    >
                        About MJ Tech Global
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
                    >
                        We are a team of passionate technologists dedicated to building software that empowers businesses worldwide.
                    </motion.p>
                </div>
            </section>

            <section style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
                <motion.div
                    className="glass-card"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    style={{ padding: '3rem', borderRadius: '20px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', marginBottom: '3rem' }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Our Mission</h2>
                    <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
                        At MJ Tech Global, our mission is to deliver high-quality, scalable, and innovative digital solutions.
                        We bridge the gap between complex technology and business needs, ensuring our clients stay ahead in the
                        rapidly evolving digital landscape. From robust web applications to intelligent AI systems, we build software that matters.
                    </p>
                </motion.div>

                <motion.div
                    className="glass-card"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    style={{ padding: '3rem', borderRadius: '20px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--accent)' }}>Our Vision</h2>
                    <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
                        To be the globally recognized leader in IT services, known for our uncompromising standards,
                        cutting-edge solutions, and transformative impact on businesses of all sizes - from agile startups to established enterprises.
                    </p>
                </motion.div>
            </section>

            <section style={{ padding: '4rem 2rem', background: 'var(--secondary)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Join Our Journey</h2>
                    <Link href="/careers" className="btn-primary-large" style={{ display: 'inline-block' }}>Explore Careers</Link>
                </div>
            </section>
        </main>
    );
}
