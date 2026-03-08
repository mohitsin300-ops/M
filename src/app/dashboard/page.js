"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { LogOut, FileText, Download, User as UserIcon, Calendar, Clock, Award, Mail, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Certificate from '../../components/Certificate';
import './Dashboard.css';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchUserAndData = async () => {
            try {
                // 1. Get logged-in user
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();

                if (sessionError || !session) {
                    if (isMounted) router.push('/auth?mode=login');
                    return;
                }

                if (isMounted) setUser(session.user);

                // 2. Fetch Applications
                const { data: apps, error: appError } = await supabase
                    .from('applications')
                    .select('*')
                    .eq('email', session.user.email)
                    .order('created_at', { ascending: false });

                if (!appError && isMounted) {
                    setApplications(apps || []);
                }

                // 3. Fetch certificates assigned to this user's email
                const { data: certs, error: certError } = await supabase
                    .from('certificates')
                    .select('*')
                    .eq('user_email', session.user.email);

                if (!certError && isMounted) {
                    setCertificates(certs || []);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUserAndData();

        return () => {
            isMounted = false;
        };
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="loading-spinner" />
            </div>
        );
    }

    if (!user) return null; // Will redirect

    return (
        <div className="dashboard-container">
            <div className="dashboard-wrapper">

                {/* Header */}
                <header className="dashboard-header">
                    <div className="dashboard-user-info">
                        <div className="dashboard-avatar">
                            {user.user_metadata?.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="dashboard-greeting">
                                Welcome back, {user.user_metadata?.full_name || 'User'}
                            </h1>
                            <p className="dashboard-email">
                                <Mail size={14} /> {user.email}
                            </p>
                        </div>
                    </div>

                    <button onClick={handleLogout} className="btn-logout">
                        <LogOut size={18} /> Logout
                    </button>
                </header>

                {/* Dashboard Content */}
                <div className="dashboard-grid">

                    {/* Sidebar / Profile Info */}
                    <div className="dashboard-sidebar">
                        <div className="profile-card">
                            <h2 className="profile-card-title">
                                <UserIcon size={20} style={{ color: '#60a5fa' }} /> Profile Details
                            </h2>
                            <div>
                                <div className="profile-info-group">
                                    <p className="profile-label">Full Name</p>
                                    <p className="profile-value">{user.user_metadata?.full_name || 'Not provided'}</p>
                                </div>
                                <div className="profile-info-group">
                                    <p className="profile-label">WhatsApp</p>
                                    <p className="profile-value">{user.user_metadata?.whatsapp_number || 'Not provided'}</p>
                                </div>
                                <div className="profile-info-group">
                                    <p className="profile-label">Account ID</p>
                                    <p className="profile-value-mono">{user.id.substring(0, 13)}...</p>
                                </div>
                            </div>
                        </div>

                        <div className="promo-card">
                            <div className="promo-bg-icon">
                                <Award size={100} />
                            </div>
                            <div className="promo-content">
                                <h3 className="promo-title">Need a Verified Certificate?</h3>
                                <p className="promo-desc">Once you complete your internship, your certificate will automatically appear here based on your registered email.</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Area / Certificates */}
                    <div className="certificates-section">
                        <div className="certificates-header">
                            <h2 className="certificates-title">
                                <Award size={24} style={{ color: '#c084fc' }} /> My Certificates
                            </h2>
                            <span className="certificates-count">
                                {certificates.length} Total
                            </span>
                        </div>

                        {/* Application Statuses */}
                        {(applications.length > 0 || certificates.length > 0) && (
                            <div className="applications-grid" style={{ marginBottom: '2rem' }}>
                                {applications.map((app) => (
                                    <div key={app.id} className="app-status-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Internship Application</h3>
                                            <span style={{
                                                padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold',
                                                background: app.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : app.status === 'Active' ? 'rgba(96, 165, 250, 0.1)' : app.status === 'Failed' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                color: app.status === 'Completed' ? '#10b981' : app.status === 'Active' ? '#60a5fa' : app.status === 'Failed' ? '#ef4444' : '#f59e0b'
                                            }}>
                                                {app.status || 'Pending'}
                                            </span>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <div><strong>Domain:</strong> {app.skills}</div>
                                            <div><strong>Duration:</strong> {app.duration}</div>
                                            <div><strong>Applied on:</strong> {new Date(app.created_at).toLocaleDateString()}</div>
                                        </div>
                                        <p style={{ marginTop: '1rem', color: '#a1a1aa', fontSize: '0.85rem' }}>
                                            {app.status === 'Pending' && "Your application is currently being reviewed by our team."}
                                            {app.status === 'Active' && "Your internship is currently in progress. Keep up the good work!"}
                                            {app.status === 'Failed' && "Unfortunately, this application or internship was unsuccessful."}
                                            {app.status === 'Completed' && "Congratulations! You have completed your internship."}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {certificates.length === 0 && applications.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="empty-state"
                            >
                                <div className="empty-icon-wrapper">
                                    <FileText size={32} style={{ color: '#71717a' }} />
                                </div>
                                <h3 className="empty-title">No Applications Found</h3>
                                <p className="empty-desc">
                                    We couldn't find any applications or certificates linked to <span style={{ color: 'white', fontWeight: 'bold' }}>{user.email}</span>. Click below to apply for an internship!
                                </p>
                                <button className="btn-primary" onClick={() => router.push('/internship')} style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Apply Now</button>
                            </motion.div>
                        ) : certificates.length > 0 && (
                            <div className="certificates-grid">
                                {certificates.map((cert, index) => (
                                    <motion.div
                                        key={cert.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="cert-card"
                                    >
                                        <div className="cert-card-content">
                                            <div className="cert-top">
                                                <div className="cert-icon">
                                                    <Award size={24} />
                                                </div>
                                                <span className="cert-id">
                                                    ID: {cert.certificate_no}
                                                </span>
                                            </div>

                                            <h3 className="cert-tech">{cert.technology || 'Web Development'}</h3>
                                            <p className="cert-subtitle">Internship Completion Certificate</p>

                                            <div className="cert-meta">
                                                <div className="cert-meta-item">
                                                    <Calendar size={16} className="cert-meta-icon" />
                                                    <span>Issued on {new Date(cert.issue_date || cert.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            <button
                                                className="btn-download active"
                                                onClick={() => setSelectedCert(cert)}
                                            >
                                                <Eye size={18} />
                                                View Certificate
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Certificate Modal View */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="modal-content cert-modal-wrapper"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: '95vw',
                                width: 'auto',
                                background: 'transparent',
                                padding: 0,
                                border: 'none',
                                backdropFilter: 'none',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <div className="cert-modal-close" onClick={() => setSelectedCert(null)} style={{ position: 'absolute', top: '-40px', right: '0', cursor: 'pointer', color: 'white', background: 'rgba(0,0,0,0.5)', padding: '5px 15px', borderRadius: '20px' }}>
                                Close ✖
                            </div>
                            <Certificate data={selectedCert} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
