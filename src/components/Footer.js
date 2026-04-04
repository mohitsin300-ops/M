import Link from 'next/link';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">

                    <div className="footer-brand">
                        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', whiteSpace: 'nowrap' }}>
                            <img src="/logo.png" alt="Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
                            <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)' }}>MJ Tech Global</span>
                        </Link>
                        <p className="footer-desc">
                            Innovating the future with premium web, application, and AI development solutions tailored for global enterprises.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                            <div className="msme-badge">
                                <span className="msme-icon">🇮🇳</span>
                                <div className="msme-info">
                                    <p className="msme-title">Government Registered</p>
                                    <p className="msme-text">MSME Certified Company</p>
                                    <p className="msme-urn">udyam-up-13-0023373</p>
                                </div>
                            </div>

                            <div className="founder-badge">
                                <div className="founder-avatar">MS</div>
                                <div className="founder-info">
                                    <p className="founder-name">Mohit Singh</p>
                                    <p className="founder-title">Founder & CEO</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h3>Company</h3>
                        <Link href="/about">About Us</Link>
                        <Link href="/services">Services</Link>
                        <Link href="/portfolio">Portfolio & Projects</Link>
                        <Link href="/careers">Careers</Link>
                    </div>

                    <div className="footer-links">
                        <h3>Support & Legal</h3>
                        <Link href="/blog">Our Blog</Link>
                        <Link href="/contact">Contact Us</Link>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                        <Link href="/terms">Terms & Conditions</Link>
                    </div>

                    <div className="footer-contact">
                        <h3>Reach Us</h3>
                        <p><strong>Email:</strong> mjtechglobal@zohomail.in</p>
                        <p><strong>Alt Email:</strong> mjtechbharat@gmail.com</p>
                        <div className="footer-socials">
                            {/* Social icons placeholders */}
                            <div className="social-icon">Li</div>
                            <div className="social-icon">Tw</div>
                            <div className="social-icon">Fb</div>
                            <div className="social-icon">In</div>
                        </div>
                        <Link href="/internship" className="btn-secondary mt-1">Apply for Internship</Link>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} MJ Tech Global. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
