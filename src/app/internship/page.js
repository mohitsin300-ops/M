'use client'

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { siteConfig } from '../../lib/siteConfig';
import {
    GraduationCap,
    Award,
    ShieldCheck,
    CheckCircle2,
    Clock,
    Briefcase,
    Send,
    User,
    Mail,
    Phone,
    BookOpen
} from 'lucide-react';

export default function Internship() {
    const [status, setStatus] = useState('');
    const [duration, setDuration] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('Submitting your application...');

        const formData = new FormData(e.target);
        const finalDomain = selectedDomain === 'custom' ? customDomain.trim() : formData.get('skills');

        if (!finalDomain) {
            setStatus('Please enter your custom course/domain.');
            setIsSubmitting(false);
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

        try {
            const res = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setStatus('Application submitted successfully! Our team will contact you soon.');
                e.target.reset();
                setSelectedDomain('');
                setCustomDomain('');
            } else {
                let errorMessage = 'Failed to submit application. Please try again.';
                try {
                    const payload = await res.json();
                    if (payload?.message) errorMessage = payload.message;
                } catch {
                    // fallback
                }
                setStatus(errorMessage);
            }
        } catch (error) {
            console.error(error);
            setStatus('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* Header */}
            <section style={{ padding: '5rem 1.5rem 3.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '850px' }}>
                    <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                        <GraduationCap size={14} /> Career Development
                    </span>
                    <h1 style={{ fontSize: '3.25rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                        Internship <span className="text-gradient">Application</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                        Join the MJ Tech Global internship program. Learn practical development workflows, work on real projects, and earn verified credentials.
                    </p>
                </div>
            </section>

            {/* Application Form */}
            <section style={{ padding: '0 1.5rem 5rem' }}>
                <div className="container" style={{ maxWidth: '850px' }}>
                    <div className="card-light" style={{ padding: '3.5rem', borderRadius: '24px' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>
                            Student &amp; Applicant Details
                        </h2>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="e.g. Rahul Sharma"
                                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: '#FFFFFF', fontSize: '0.95rem' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        Father's Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="father_name"
                                        required
                                        placeholder="e.g. Ramesh Sharma"
                                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: '#FFFFFF', fontSize: '0.95rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="name@example.com"
                                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: '#FFFFFF', fontSize: '0.95rem' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        WhatsApp / Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="+91 9876543210"
                                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: '#FFFFFF', fontSize: '0.95rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        Gender *
                                    </label>
                                    <select
                                        name="gender"
                                        required
                                        defaultValue=""
                                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: '#FFFFFF', fontSize: '0.95rem' }}
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        College / University *
                                    </label>
                                    <input
                                        type="text"
                                        name="college"
                                        required
                                        placeholder="e.g. University Institute of Technology"
                                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: '#FFFFFF', fontSize: '0.95rem' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        Technology / Domain *
                                    </label>
                                    <select
                                        name="skills"
                                        required
                                        value={selectedDomain}
                                        onChange={(e) => setSelectedDomain(e.target.value)}
                                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: '#FFFFFF', fontSize: '0.95rem' }}
                                    >
                                        <option value="" disabled>Select Domain</option>
                                        <option value="Frontend Developer">Frontend Developer</option>
                                        <option value="Backend Developer">Backend Developer</option>
                                        <option value="React.js Developer">React.js Developer</option>
                                        <option value="MERN Stack Developer">MERN Stack Developer</option>
                                        <option value="Android Developer">Android Developer</option>
                                        <option value="Flutter Developer">Flutter Developer</option>
                                        <option value="Full Stack Web Development">Full Stack Web Development</option>
                                        <option value="Python Developer">Python Developer</option>
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="custom">Custom Course (Type Manually)</option>
                                    </select>
                                    {selectedDomain === 'custom' && (
                                        <input
                                            type="text"
                                            name="custom_skills"
                                            required
                                            value={customDomain}
                                            onChange={(e) => setCustomDomain(e.target.value)}
                                            placeholder="Type your course / domain"
                                            style={{ width: '100%', marginTop: '0.75rem', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: '#FFFFFF', fontSize: '0.95rem' }}
                                        />
                                    )}
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                        Internship Duration *
                                    </label>
                                    <select
                                        name="duration"
                                        required
                                        defaultValue=""
                                        onChange={(e) => setDuration(e.target.value)}
                                        style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', outline: 'none', background: '#FFFFFF', fontSize: '0.95rem' }}
                                    >
                                        <option value="" disabled>Select Duration</option>
                                        <option value="1 Month">1 Month</option>
                                        <option value="45 Days">45 Days</option>
                                        <option value="3 Months">3 Months</option>
                                        <option value="6 Months">6 Months</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', marginTop: '1rem' }}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Internship Application'}
                            </button>

                            {status && (
                                <p style={{
                                    marginTop: '1rem',
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    color: status.includes('success') ? 'var(--success)' : (status.includes('Failed') || status.includes('error') ? '#EF4444' : 'var(--primary-blue)')
                                }}>
                                    {status}
                                </p>
                            )}

                            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                Queries? Contact <a href={`mailto:${siteConfig.emails.support}`} style={{ color: 'var(--primary-blue)' }}>{siteConfig.emails.support}</a>
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section style={{ padding: '5rem 1.5rem', background: '#FFFFFF', borderTop: '1px solid var(--border-color)' }}>
                <div className="container" style={{ maxWidth: '1100px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
                        <span className="badge badge-primary">Program Benefits</span>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0.75rem 0' }}>Why Intern With MJ Tech Global</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                            Hands-on experience, real codebases, and digital verifiable credentials.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        <div className="card-light" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎓</div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Verified Certificate</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                                Every certificate carries a unique database verification ID searchable globally.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💻</div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Live Project Work</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                                Gain practical exposure to modern frameworks, git collaboration, and clean architecture.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄</div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Portfolio Enhancement</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                                Build tangible case studies you can showcase on your resume and GitHub.
                            </p>
                        </div>

                        <div className="card-light" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Flexible Durations</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                                Options from 1 month to 6 months designed to fit academic schedules.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Responsive */}
            <style jsx>{`
                @media (max-width: 800px) {
                    form > div {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
                        grid-template-columns: 1fr 1fr !important;
                    }
                }
                @media (max-width: 500px) {
                    div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    );
}
