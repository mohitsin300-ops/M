'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

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
                    <Link
                        href="/internship"
                        className="btn-primary mobile-btn"
                        onClick={() => setIsOpen(false)}
                    >
                        Internship Apply
                    </Link>
                </div>
            )}
        </nav>
    );
}

