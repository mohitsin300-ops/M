'use client'

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function Internship() {
    const [status, setStatus] = useState('');
    const [duration, setDuration] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const fileInputRef = useRef(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        const formData = new FormData(e.target);
        const finalDomain = selectedDomain === 'custom' ? customDomain.trim() : formData.get('skills');

        if (!finalDomain) {
            setStatus('Please enter your custom course/domain.');
            return;
        }

        const data = {
            name: formData.get('name'),
            father_name: formData.get('father_name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            college: formData.get('college'),
            gender: formData.get('gender'),
            skills: finalDomain,
            duration: formData.get('duration'),
        };

        // Simulating API Call since we'll write the API route next
        try {
            const res = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setStatus('Application submitted successfully! We will contact you soon.');
                e.target.reset();
                setSelectedDomain('');
                setCustomDomain('');
                if (fileInputRef.current) fileInputRef.current.value = '';
            } else {
                let errorMessage = 'Failed to submit application. Please try again.';
                try {
                    const payload = await res.json();
                    if (payload?.message) {
                        errorMessage = payload.message;
                    }
                } catch {
                    // Keep fallback error message when response is not JSON.
                }

                setStatus(errorMessage);
            }
        } catch (error) {
            console.error(error);
            setStatus('An error occurred. Please try again later.');
        }
    };

    return (
        <main className="main-content">
            <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gradient"
                    style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
                >
                    Internship Application
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}
                >
                    Kickstart your career with MJ Tech Global. Learn from industry experts and work on live projects.
                </motion.p>
            </section>

            <section style={{ padding: '2rem 2rem 8rem', maxWidth: '800px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <form className="glass-card" onSubmit={handleSubmit} style={{ padding: '3rem', borderRadius: '20px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                        <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', textAlign: 'center' }}>Student Details</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Full Name *</label>
                                <input type="text" name="name" required style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Father's Name *</label>
                                <input type="text" name="father_name" required style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address *</label>
                                <input type="email" name="email" required style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Gender *</label>
                                <select name="gender" required defaultValue="" style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem', appearance: 'auto' }}>
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Phone Number (eg. WhatsApp) *</label>
                                <input type="tel" name="phone" required placeholder="eg. WhatsApp" style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>College / University *</label>
                                <input type="text" name="college" required style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Technology / Domain *</label>
                                <select
                                    name="skills"
                                    required
                                    value={selectedDomain}
                                    onChange={(e) => setSelectedDomain(e.target.value)}
                                    style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem', appearance: 'auto' }}
                                >
                                    <option value="" disabled>Select Domain</option>
                                    <option value="Frontend Developer">Frontend Developer</option>
                                    <option value="Backend Developer">Backend Developer</option>
                                    <option value="React.js Developer">React.js Developer</option>
                                    <option value="MERN Stack Developer">MERN Stack Developer</option>
                                    <option value="Android Developer">Android Developer</option>
                                    <option value="Flutter Developer">Flutter Developer</option>
                                    <option value="App Developer">App Developer</option>
                                    <option value="Python Developer">Python Developer</option>
                                    <option value="Java Developer">Java Developer</option>
                                    <option value="C++/C Programming">C++/C Programming</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Machine Learning">Machine Learning</option>
      
      
                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                    <option value="Business Analytics">Business Analytics</option>
                                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="Cloud Computing">Cloud Computing</option>
                                    <option value="Unity Game Developer">Unity Game Developer</option>
                                    <option value="custom">Custom Course (Type Manually)</option>
                                </select>
                                {selectedDomain === 'custom' && (
                                    <input
                                        type="text"
                                        name="custom_skills"
                                        required
                                        value={customDomain}
                                        onChange={(e) => setCustomDomain(e.target.value)}
                                        placeholder="Type your course/domain"
                                        style={{ width: '100%', marginTop: '0.75rem', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
                                    />
                                )}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Internship Duration *</label>
                            <select
                                name="duration"
                                required
                                defaultValue=""
                                onChange={(e) => setDuration(e.target.value)}
                                style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem', appearance: 'auto' }}
                            >
                                <option value="" disabled>Select Duration</option>
                                <option value="1 Month">1 Month</option>
                                <option value="45 Days">45 Days</option>
                                <option value="3 Months">3 Months</option>
                                <option value="4 Months">4 Months</option>
                                <option value="6 Months">6 Months</option>
                            </select>
                        </div>



                        <button type="submit" className="btn-primary-large" style={{ width: '100%', cursor: 'pointer', border: 'none' }}>
                            Submit Application
                        </button>
                        {status && (
                            <p style={{ marginTop: '1.5rem', textAlign: 'center', color: status.includes('success') ? '#27c93f' : (status.includes('error') || status.includes('Failed') ? '#ff5f56' : 'var(--accent)') }}>
                                {status}
                            </p>
                        )}
                        <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            For queries, contact <a href="mailto:mjtechglobal@zohomail.in" style={{ color: 'var(--accent)' }}>mjtechglobal@zohomail.in</a> or <a href="mailto:mjtechbharat@gmail.com" style={{ color: 'var(--accent)' }}>mjtechbharat@gmail.com</a>
                        </p>
                    </form>
                </motion.div>
            </section>

            {/* Internship Program Highlights */}
            <section className="internship-highlight-section" style={{ padding: '2rem 2rem 8rem', background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: '0.05', borderRadius: '50%' }}></div>

                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Launch Your Career with Our <span className="text-gradient">Internship Program</span></h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
                            Experience <strong>online free and paid internships</strong> designed to improve resumes, portfolios, and practical understanding for job readiness.
                            Engage in project-based learning with real tasks and real tools.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
                    >
                        <motion.div className="glass-card" variants={fadeInUp} style={{ padding: '2rem', borderRadius: '16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎓</div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>Completion Certificate & LOR</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Earn recognized verified certificates and a Letter of Recommendation upon successful completion to power up your resume.</p>
                        </motion.div>

                        <motion.div className="glass-card" variants={fadeInUp} style={{ padding: '2rem', borderRadius: '16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>Unique Verification IDs</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Every internship certificate includes a unique verification ID, allowing employers to instantly authenticate your achievements.</p>
                        </motion.div>

                        <motion.div className="glass-card" variants={fadeInUp} style={{ padding: '2rem', borderRadius: '16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛠️</div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>Real Tasks & Real Tools</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Work on real-world projects across multiple IT and tech careers utilizing industry-standard tools and practices.</p>
                        </motion.div>

                        <motion.div className="glass-card" variants={fadeInUp} style={{ padding: '2rem', borderRadius: '16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>Career-Focused Learning</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Practical understanding built for job readiness. Build a portfolio that stands out to recruiters globally.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Inject Media query for mobile */}
            <style jsx>{`
        @media (max-width: 768px) {
          form > div {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
        </main>
    );
}
