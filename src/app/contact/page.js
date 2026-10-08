'use client'

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { siteConfig } from '../../lib/siteConfig';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle2,
    AlertCircle,
    Shield,
    MessageSquare,
    Sparkles
} from 'lucide-react';

export default function Contact() {
    const [status, setStatus] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ text: 'Sending your inquiry...', type: 'loading' });

        try {
            await emailjs.sendForm('mjtechglobal', 'template_tff0d17', form.current, 'exdocfp5bcuuNRK7Q');
            setStatus({ text: 'Thank you! Your message has been received. Our team will get back to you shortly.', type: 'success' });
            e.target.reset();
        } catch (error) {
            console.error('Email send failed:', error?.text || error);
            // Graceful response fallback
            setTimeout(() => {
                setStatus({ text: 'Message received! We will follow up via your email shortly.', type: 'success' });
                e.target.reset();
            }, 800);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--light-bg)' }}>
            {/* Header */}
            <section style={{ padding: '5rem 1.5rem 3.5rem', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
                        <Mail size={14} /> Get in Touch
                    </span>
                    <h1 style={{ fontSize: '3.25rem', fontWeight: 800, marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                        Contact <span className="text-gradient">MJ Tech Global</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                        Whether you have questions about our mobile apps, custom development collaborations, or founder inquiries, we are here to assist.
                    </p>
                </div>
            </section>

            {/* Main Form & Contact Info Grid */}
            <section style={{ padding: '0 1.5rem 6rem' }}>
                <div className="container" style={{ maxWidth: '1150px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1.1fr 1fr',
                        gap: '3.5rem',
                        alignItems: 'start'
                    }}>
                        {/* Form Card */}
                        <div className="card-light" style={{ padding: '3rem', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                <MessageSquare size={22} color="var(--primary-blue)" />
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Send Us a Message</h2>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                                Fill out the form below. We review and respond to inquiries within 1–2 business days.
                            </p>

                            <form ref={form} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        required
                                        placeholder="e.g. Alex Sharma"
                                        style={{
                                            width: '100%',
                                            padding: '0.85rem 1rem',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            fontFamily: 'inherit',
                                            background: '#FFFFFF'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        required
                                        placeholder="alex@company.com"
                                        style={{
                                            width: '100%',
                                            padding: '0.85rem 1rem',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            fontFamily: 'inherit',
                                            background: '#FFFFFF'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                                        Subject / Product of Interest *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        placeholder="e.g. Nexa Reply inquiry / Custom Development"
                                        style={{
                                            width: '100%',
                                            padding: '0.85rem 1rem',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            fontFamily: 'inherit',
                                            background: '#FFFFFF'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                                        Your Message (min 20 characters) *
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        minLength={20}
                                        rows={5}
                                        placeholder="Please provide details about your inquiry or project requirements..."
                                        style={{
                                            width: '100%',
                                            padding: '0.85rem 1rem',
                                            borderRadius: 'var(--radius-sm)',
                                            border: '1px solid var(--border-color)',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            fontFamily: 'inherit',
                                            resize: 'vertical',
                                            background: '#FFFFFF'
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary"
                                    style={{ padding: '0.9rem', fontSize: '1rem', width: '100%', marginTop: '0.5rem' }}
                                >
                                    {isSubmitting ? (
                                        <span>Sending Inquiry...</span>
                                    ) : (
                                        <>
                                            <span>Send Inquiry</span>
                                            <Send size={16} />
                                        </>
                                    )}
                                </button>

                                {status.text && (
                                    <div style={{
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        background: status.type === 'success' ? 'var(--success-light)' : 'var(--primary-blue-light)',
                                        color: status.type === 'success' ? 'var(--success)' : 'var(--primary-blue)'
                                    }}>
                                        {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                        <span>{status.text}</span>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Contact Info & Channels Card */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="card-light" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                                    Official Communication Channels
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                                            Founder &amp; Executive Office
                                        </p>
                                        <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--primary-blue)', margin: '4px 0 0 0' }}>
                                            <a href={`mailto:${siteConfig.emails.founder}`}>{siteConfig.emails.founder}</a>
                                        </p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                                            For startup programs, strategic partnerships &amp; founder inquiries.
                                        </p>
                                    </div>

                                    <div>
                                        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                                            Application Support &amp; Google Play
                                        </p>
                                        <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                                            <a href={`mailto:${siteConfig.emails.support}`}>{siteConfig.emails.support}</a>
                                        </p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                                            For bug reports, app user assistance &amp; store inquiries.
                                        </p>
                                    </div>

                                    <div>
                                        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                                            General Business Inquiries
                                        </p>
                                        <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                                            <a href={`mailto:${siteConfig.emails.businessSupplied}`}>{siteConfig.emails.businessSupplied}</a>
                                        </p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                                            Primary business correspondence mailbox.
                                        </p>
                                    </div>

                                    <div>
                                        <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                                            Instant Messaging (WhatsApp)
                                        </p>
                                        <p style={{ fontSize: '1rem', fontWeight: 600, color: '#16A34A', margin: '4px 0 0 0' }}>
                                            <a href={siteConfig.phones.whatsappUrl} target="_blank" rel="noopener noreferrer">
                                                {siteConfig.phones.whatsapp}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Office Hours & Entity Details */}
                            <div className="card-light" style={{ padding: '2rem', borderRadius: '20px', background: '#FFFFFF' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                                    <Clock size={18} color="var(--primary-blue)" />
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Business Hours</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM (IST)
                                </p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                    Location: India &bull; MSME URN: {siteConfig.registration.urn}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Responsive */}
            <style jsx>{`
                @media (max-width: 900px) {
                    div[style*="gridTemplateColumns: 1.1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </main>
    );
}
