'use client'

import { motion } from 'framer-motion';

export default function Services() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const servicesList = [
        {
            id: 'web',
            icon: '🌐',
            title: 'Web Development',
            desc: 'Custom web applications, enterprise portals, and CMS solutions using Next.js, React, and robust backend technologies. SEO-friendly and lightning fast.'
        },
        {
            id: 'app',
            icon: '📱',
            title: 'App Development',
            desc: 'Native and Cross-platform development for iOS and Android using Flutter & React Native, delivering intuitive and engaging mobile experiences.'
        },
        {
            id: 'ai',
            icon: '🤖',
            title: 'AI & ML Solutions',
            desc: 'Integrating artificial intelligence into existing workflows, building predictive models, and developing cognitive applications to automate tasks.'
        },
        {
            id: 'cloud',
            icon: '☁️',
            title: 'Cloud DevOps',
            desc: 'AWS, Azure, and Google Cloud infrastructure setup, CI/CD pipeline automation, and scalable containerized architecture using Docker and Kubernetes.'
        },
        {
            id: 'ui',
            icon: '🎨',
            title: 'UI/UX Design',
            desc: 'Creating modern, 3D visually stunning, and user-centric interfaces that not only look premium but provide a seamless user journey.'
        },
        {
            id: 'consulting',
            icon: '📊',
            title: 'IT Consulting',
            desc: 'Strategic technology consulting to help you make informed decisions, optimize operations, and adopt the right tech stack for your product.'
        }
    ];

    return (
        <main className="main-content">
            <section className="page-header" style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
                >
                    Our Services
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
                >
                    Comprehensive technology solutions designed to propel your business into the future.
                </motion.p>
            </section>

            <section style={{ padding: '2rem 2rem 8rem', maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    className="services-grid"
                    variants={container}
                    initial="hidden"
                    animate="show"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
                >
                    {servicesList.map((service) => (
                        <motion.div
                            key={service.id}
                            id={service.id}
                            variants={item}
                            style={{
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                padding: '2.5rem',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{service.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{service.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{service.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </main>
    );
}
