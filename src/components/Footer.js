import Link from 'next/link';
import { siteConfig } from '../lib/siteConfig';
import { Award, ShieldCheck, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-top-grid">

                    {/* Brand Column */}
                    <div className="footer-brand-col">
                        <Link href="/" className="footer-logo">
                            <img src="/logo.png" alt="MJ Tech Global Logo" className="footer-logo-img" />
                            <div className="footer-logo-text">
                                <span className="footer-logo-title">MJ Tech Global</span>
                                <span className="footer-logo-sub">Software &amp; AI Products</span>
                            </div>
                        </Link>

                        <p className="footer-tagline">
                            Building practical mobile applications, creator automation tools, and productivity solutions designed to solve everyday digital problems.
                        </p>

                        <div className="footer-leadership">
                            <p className="leadership-line">
                                <strong>Founder &amp; CEO:</strong> {siteConfig.founder.name}
                            </p>
                            <p className="leadership-line">
                                <strong>Technical Head:</strong> {siteConfig.technicalHead.name}
                            </p>
                        </div>

                        {/* Verified Government MSME Badge */}
                        <div className="msme-verification-card">
                            <div className="msme-icon-wrapper">
                                <span className="msme-flag">🇮🇳</span>
                            </div>
                            <div className="msme-details">
                                <p className="msme-badge-label">Government Registered</p>
                                <p className="msme-badge-name">MSME Certified Enterprise</p>
                                <p className="msme-badge-urn">URN: {siteConfig.registration.urn}</p>
                            </div>
                        </div>
                    </div>

                    {/* Products Column */}
                    <div className="footer-links-col">
                        <h3 className="footer-col-title">
                            <Sparkles size={15} color="var(--primary-blue)" /> Featured Products
                        </h3>
                        <ul className="footer-links-list">
                            <li>
                                <Link href="/products/nexa-reply" className="footer-nav-link">
                                    Nexa Reply <span className="footer-pill">Flagship</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/resume-pro" className="footer-nav-link">
                                    Resume Pro – CV Builder
                                </Link>
                            </li>
                            <li>
                                <Link href="/products/prompt-copy" className="footer-nav-link">
                                    Prompt Copy: AI Prompts
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="footer-nav-link footer-view-all">
                                    View All Products &rarr;
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company & Technology */}
                    <div className="footer-links-col">
                        <h3 className="footer-col-title">Company &amp; Tech</h3>
                        <ul className="footer-links-list">
                            <li><Link href="/about" className="footer-nav-link">About MJ Tech Global</Link></li>
                            <li><Link href="/services" className="footer-nav-link">Development Services</Link></li>
                            <li><Link href="/technology" className="footer-nav-link">Technology Stack</Link></li>
                            <li><Link href="/ai-innovation" className="footer-nav-link">AI Innovation Roadmap</Link></li>
                            <li><Link href="/startup-overview" className="footer-nav-link">Startup Profile</Link></li>
                            <li><Link href="/careers" className="footer-nav-link">Careers &amp; Openings</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Support */}
                    <div className="footer-links-col">
                        <h3 className="footer-col-title">Support &amp; Verification</h3>
                        <ul className="footer-links-list">
                            <li><Link href="/verify" className="footer-nav-link">Verify Certificate</Link></li>
                            <li><Link href="/internship" className="footer-nav-link">Internship Program</Link></li>
                            <li><Link href="/blog" className="footer-nav-link">Engineering Blog</Link></li>
                            <li><Link href="/contact" className="footer-nav-link">Contact &amp; Inquiries</Link></li>
                            <li><Link href="/privacy-policy" className="footer-nav-link">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="footer-nav-link">Terms &amp; Conditions</Link></li>
                            <li><Link href="/refund-policy" className="footer-nav-link">Refund Policy</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Contact Bar */}
                <div className="footer-contact-bar">
                    <div className="contact-item">
                        <Mail size={16} className="contact-icon" />
                        <div>
                            <span className="contact-label">Founder Office:</span>{' '}
                            <a href={`mailto:${siteConfig.emails.founder}`} className="contact-value">
                                {siteConfig.emails.founder}
                            </a>
                        </div>
                    </div>
                    <div className="contact-item">
                        <Mail size={16} className="contact-icon" />
                        <div>
                            <span className="contact-label">App &amp; Play Support:</span>{' '}
                            <a href={`mailto:${siteConfig.emails.support}`} className="contact-value">
                                {siteConfig.emails.support}
                            </a>
                        </div>
                    </div>
                    <div className="contact-item">
                        <Mail size={16} className="contact-icon" />
                        <div>
                            <span className="contact-label">Business Inquiries:</span>{' '}
                            <a href={`mailto:${siteConfig.emails.businessSupplied}`} className="contact-value">
                                {siteConfig.emails.businessSupplied}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom-bar">
                    <p className="copyright-text">
                        &copy; {new Date().getFullYear()} MJ Tech Global. All rights reserved. Registered MSME Enterprise, India.
                    </p>
                    <p className="compliance-disclaimer">
                        Product trademarks and registered names are the property of their respective holders. All software applications operate strictly in accordance with platform policies.
                    </p>
                </div>
            </div>
        </footer>
    );
}
