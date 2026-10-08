'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import './Navbar.css';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        setUser(auth.currentUser || null);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setDropdownOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Services', path: '/services' },
        { name: 'Technology', path: '/technology' },
        { name: 'AI Innovation', path: '/ai-innovation' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const handleLogout = async () => {
        await signOut(auth);
        setDropdownOpen(false);
        setIsOpen(false);
        router.push('/');
    };

    return (
        <header className={`navbar-header ${scrolled ? 'is-scrolled' : ''}`}>
            <div className="nav-container">
                <Link href="/" className="nav-logo" aria-label="MJ Tech Global Home">
                    <img src="/logo.png" alt="MJ Tech Global" className="logo-img" />
                    <div className="logo-text-wrapper">
                        <span className="logo-title">MJ Tech Global</span>
                        <span className="logo-tag">Software &amp; AI</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-nav" aria-label="Main Navigation">
                    <div className="nav-links-wrapper">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`nav-link ${isActive ? 'is-active' : ''}`}
                                >
                                    {link.name}
                                    {isActive && <span className="active-dot" />}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="nav-actions">
                        {/* Secondary Utility Link */}
                        <Link href="/verify" className="utility-nav-link" title="Verify Certificate">
                            <ShieldCheck size={16} />
                            <span>Verify</span>
                        </Link>

                        {/* User Profile or Login */}
                        {user ? (
                            <div className="profile-menu-container">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="profile-btn"
                                    aria-expanded={dropdownOpen}
                                    aria-haspopup="true"
                                >
                                    <div className="profile-avatar">
                                        {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="profile-name">
                                        {user.displayName?.split(' ')[0] || 'User'}
                                    </span>
                                    <ChevronDown size={14} className={`chevron-icon ${dropdownOpen ? 'is-open' : ''}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="profile-dropdown-menu">
                                        <div className="dropdown-header">
                                            <p className="dropdown-signed">Signed in as</p>
                                            <p className="dropdown-email" title={user.email || ''}>
                                                {user.email}
                                            </p>
                                        </div>
                                        <Link href="/dashboard" className="dropdown-item">
                                            <LayoutDashboard size={15} /> Dashboard
                                        </Link>
                                        <button onClick={handleLogout} className="dropdown-item logout-item">
                                            <LogOut size={15} /> Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/auth" className="login-icon-btn" title="Sign In">
                                <User size={18} />
                            </Link>
                        )}

                        {/* Primary Explore Products CTA */}
                        <Link href="/products" className="btn-explore-cta">
                            <Sparkles size={15} />
                            <span>Explore Products</span>
                        </Link>
                    </div>
                </nav>

                {/* Mobile Toggle Button */}
                <button
                    className="mobile-toggle-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Drawer Menu */}
            {isOpen && (
                <div className="mobile-drawer-overlay" onClick={() => setIsOpen(false)}>
                    <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
                        <div className="mobile-drawer-links">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.path}
                                        className={`mobile-link ${isActive ? 'is-active' : ''}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span>{link.name}</span>
                                        {isActive && <span className="mobile-active-pill">Active</span>}
                                    </Link>
                                );
                            })}

                            <div className="mobile-divider" />

                            <Link
                                href="/verify"
                                className="mobile-link"
                                onClick={() => setIsOpen(false)}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ShieldCheck size={18} color="var(--primary-blue)" /> Verify Certificate
                                </span>
                            </Link>

                            <Link
                                href="/internship"
                                className="mobile-link"
                                onClick={() => setIsOpen(false)}
                            >
                                <span>Internship Application</span>
                            </Link>
                        </div>

                        <div className="mobile-drawer-footer">
                            {user ? (
                                <div className="mobile-user-card">
                                    <div className="mobile-user-row">
                                        <div className="profile-avatar">
                                            {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                        </div>
                                        <div style={{ overflow: 'hidden' }}>
                                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.displayName || 'User'}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.email}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
                                        <Link href="/dashboard" className="btn btn-secondary" style={{ padding: '0.5rem', fontSize: '0.85rem' }} onClick={() => setIsOpen(false)}>
                                            Dashboard
                                        </Link>
                                        <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href="/auth"
                                    className="btn btn-secondary mobile-auth-btn"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <User size={18} /> Sign In / Account
                                </Link>
                            )}

                            <Link
                                href="/products"
                                className="btn btn-primary mobile-cta-btn"
                                onClick={() => setIsOpen(false)}
                            >
                                <Sparkles size={16} /> Explore Our Products <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
