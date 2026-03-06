'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import './Home.css';

export default function Home() {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <main className="main-content">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="glow-orb primary-orb"></div>
                    <div className="glow-orb secondary-orb"></div>
                </div>

                <div className="hero-container">
                    <motion.div
                        className="hero-text"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.h1 variants={fadeInUp}>
                            Transforming Ideas Into <span className="text-gradient">Digital Reality</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="hero-subtitle">
                            MJ Tech Global delivers cutting-edge Web Development, App Applications, and AI-driven solutions for visionary enterprises.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="hero-actions">
                            <Link href="/services" className="btn-primary-large">Discover Our Services</Link>
                            <Link href="/contact" className="btn-outline-large">Contact Us</Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className="glass-card-3d" style={{ padding: 0, overflow: 'hidden' }}>
                            <img
                                src="/hero-hq.png"
                                alt="MJ Tech Global IT Services"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Highlight */}
            <section className="services-section">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                    <h2>Our Core <span className="text-gradient">Expertise</span></h2>
                    <p>We build scalable software designed to drive your business forward.</p>
                </motion.div>

                <motion.div
                    className="services-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                >
                    {/* Service 1 */}
                    <motion.div className="service-card" variants={fadeInUp}>
                        <div className="service-icon">🌐</div>
                        <h3>Web Development</h3>
                        <p>From complex enterprise portals to stunning corporate websites, built with Next.js, React, and cutting-edge tech.</p>
                        <Link href="/services#web" className="learn-more">Learn more &rarr;</Link>
                    </motion.div>

                    {/* Service 2 */}
                    <motion.div className="service-card" variants={fadeInUp}>
                        <div className="service-icon">📱</div>
                        <h3>App Development</h3>
                        <p>Native and cross-platform mobile applications using Flutter & React Native for intuitive user experiences.</p>
                        <Link href="/services#app" className="learn-more">Learn more &rarr;</Link>
                    </motion.div>

                    {/* Service 3 */}
                    <motion.div className="service-card" variants={fadeInUp}>
                        <div className="service-icon">🤖</div>
                        <h3>AI & ML Solutions</h3>
                        <p>Integrate intelligent automation and predictive analytics to stay ahead of the curve.</p>
                        <Link href="/services#ai" className="learn-more">Learn more &rarr;</Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Why Choose Us */}
            <section className="why-us">
                <div className="why-us-container">
                    <motion.div
                        className="why-us-content"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={fadeInUp}>Why Global Leaders Choose <span className="text-accent">MJ Tech Global</span></motion.h2>
                        <motion.div className="features-list" variants={fadeInUp}>
                            <div className="feature-item">
                                <div className="feature-check">✓</div>
                                <div>
                                    <h4>Global Standards</h4>
                                    <p>We adhere to international best practices in code quality, security, and design.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-check">✓</div>
                                <div>
                                    <h4>Modern Tech Stack</h4>
                                    <p>We use the latest frameworks like Next.js, React, Node.js and Flutter for scalable solutions.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-check">✓</div>
                                <div>
                                    <h4>On-Time Delivery</h4>
                                    <p>We value your time and guarantee the best projects delivered strictly on schedule.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-check">✓</div>
                                <div>
                                    <h4>Competitive Low Pricing</h4>
                                    <p>Get premium-grade IT solutions at highly affordable rates compared to others.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <div className="feature-check">✓</div>
                                <div>
                                    <h4>Dedicated Support</h4>
                                    <p>24/7 maintenance and support to ensure your platforms run flawlessly.</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="why-us-stats"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="stat-card">
                            <h3>10+</h3>
                            <p>Projects Delivered</p>
                        </div>
                        <div className="stat-card">
                            <h3>100%</h3>
                            <p>Client Satisfaction</p>
                        </div>
                        <div className="stat-card">
                            <h3>24/7</h3>
                            <p>Support Available</p>
                        </div>
                        <div className="stat-card accent-bg">
                            <h3>Grow</h3>
                            <p>With Us Today</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <motion.div
                    className="cta-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Ready to start your next project?</h2>
                    <p>Let's discuss how MJ Tech Global can transform your business with innovative technology.</p>
                    <Link href="/contact" className="btn-primary-large">Get in Touch</Link>
                </motion.div>
            </section>
        </main>
    );
}
