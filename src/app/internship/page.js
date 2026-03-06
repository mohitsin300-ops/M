'use client'

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function Internship() {
    const [status, setStatus] = useState('');
    const [duration, setDuration] = useState('');
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting...');

        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            college: formData.get('college'),
            skills: formData.get('skills'),
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
                if (fileInputRef.current) fileInputRef.current.value = '';
            } else {
                setStatus('Failed to submit application. Please try again.');
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
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email Address *</label>
                                <input type="email" name="email" required style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Phone Number *</label>
                                <input type="tel" name="phone" required style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>College / University *</label>
                                <input type="text" name="college" required style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Technical Skills * (e.g. Flutter, React, Node.js, Python, UI/UX)</label>
                            <input type="text" name="skills" required placeholder="Comma separated values" style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }} />
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

                        <div style={{ marginBottom: '2.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                                Upload Resume (PDF/DOCX) {duration === '1 Month' || duration === '45 Days' ? '(Optional)' : '*'}
                            </label>
                            <input
                                type="file"
                                name="resume"
                                accept=".pdf,.doc,.docx"
                                required={!(duration === '1 Month' || duration === '45 Days')}
                                ref={fileInputRef}
                                style={{ width: '100%', padding: '1rem', background: 'var(--primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', fontSize: '1rem' }}
                            />
                            <small style={{ color: 'var(--text-muted)', display: 'block', margin: '0.5rem 0' }}>Max file size: 5MB.</small>
                            {(duration === '1 Month' || duration === '45 Days') && (
                                <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 'bold' }}>Note: Resume is optional for less than 3 months duration.</p>
                            )}
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
                            For queries, contact <a href="mailto:mjtechglobal@zohomail.in" style={{ color: 'var(--accent)' }}>mjtechglobal@zohomail.in</a> or <a href="mailto:mjtechglobal@gmail.com" style={{ color: 'var(--accent)' }}>mjtechglobal@gmail.com</a>
                        </p>
                    </form>
                </motion.div>
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
