'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, UserPlus, LogIn, LayoutDashboard, User, LogOut, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
import './Navbar.css';

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Fetch current session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };
        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
        { name: 'Verify Certificate', path: '/verify' },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setDropdownOpen(false);
        setIsOpen(false);
        router.push('/');
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
                    <img src="/logo.png" alt="Logo" style={{ height: '35px', width: 'auto', objectFit: 'contain' }} />
                    <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>MJ Tech Global</span>
                </Link>

                <div className="desktop-menu">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.path} className="nav-link">
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <div className="profile-menu-container" style={{ position: 'relative', marginLeft: '1rem' }}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="profile-btn flex items-center gap-2"
                                style={{
                                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                                    padding: '0.4rem 0.8rem', borderRadius: '20px', cursor: 'pointer', color: 'white',
                                    display: 'flex', alignItems: 'center'
                                }}
                            >
                                <div style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    width: '28px', height: '28px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold', fontSize: '0.8rem'
                                }}>
                                    {user.user_metadata?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                                </div>
                                <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                                    {user.user_metadata?.full_name?.split(' ')[0] || 'User'}
                                </span>
                                <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'none' }} />
                            </button>

                            {dropdownOpen && (
                                <div className="profile-dropdown" style={{
                                    position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                                    background: '#0a0a0a', border: '1px solid #27272a', borderRadius: '12px',
                                    padding: '0.5rem', width: '200px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 50
                                }}>
                                    <div style={{ padding: '0.5rem', borderBottom: '1px solid #27272a', marginBottom: '0.5rem' }}>
                                        <p style={{ fontSize: '0.85rem', color: '#a1a1aa', margin: 0 }}>Signed in as</p>
                                        <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={user.email}>
                                            {user.email}
                                        </p>
                                    </div>
                                    <Link href="/dashboard" onClick={() => setDropdownOpen(false)} style={{
                                        display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem', color: '#e4e4e7', textDecoration: 'none', borderRadius: '8px', fontSize: '0.9rem', transition: 'background 0.2s'
                                    }} onMouseEnter={(e) => e.currentTarget.style.background = '#27272a'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <LayoutDashboard size={16} /> Dashboard
                                    </Link>
                                    <button onClick={handleLogout} style={{
                                        display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem', color: '#f87171', background: 'transparent', border: 'none', width: '100%', textAlign: 'left', borderRadius: '8px', fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s'
                                    }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/auth" style={{
                            marginLeft: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px',
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', color: 'white', transition: 'all 0.2s'
                        }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1.05)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'scale(1)' }} title="Login / Sign Up">
                            <User size={18} />
                        </Link>
                    )}
                    <Link href="/internship" className="btn-primary" style={{ marginLeft: '1rem' }}>
                        Internship Apply
                    </Link>
                </div>

                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isOpen && (
                <div className="mobile-menu">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className="mobile-nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <div style={{ marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                <div style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem', color: 'white'
                                }}>
                                    {user.user_metadata?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p style={{ fontWeight: 'bold', margin: 0, color: 'white' }}>{user.user_metadata?.full_name || 'User'}</p>
                                    <p style={{ fontSize: '0.8rem', color: '#a1a1aa', margin: 0 }}>{user.email}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Link
                                    href="/dashboard"
                                    className="btn-primary"
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', padding: '0.6rem', borderRadius: '8px' }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LayoutDashboard size={18} /> Go to Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)', width: '100%', cursor: 'pointer' }}
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link
                            href="/auth"
                            className="btn-primary mobile-btn"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                            onClick={() => setIsOpen(false)}
                        >
                            <User size={20} /> Login / Sign Up
                        </Link>
                    )}
                    <Link
                        href="/internship"
                        className="btn-primary mobile-btn"
                        style={{ marginTop: '0.5rem', background: 'linear-gradient(to right, #0070f3, #00a6ff)' }}
                        onClick={() => setIsOpen(false)}
                    >
                        Internship Apply
                    </Link>
                </div>
            )}
        </nav>
    );
}
