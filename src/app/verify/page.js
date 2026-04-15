'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { Search, Award, CheckCircle, XCircle, Calendar, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Verify.css';

function VerifyCertificate() {
    const searchParams = useSearchParams();
    const urlId = searchParams.get('id');

    const [certNo, setCertNo] = useState(urlId || '');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // null, 'found' (object), or 'not_found'

    useEffect(() => {
        if (urlId) {
            handleVerify(null, urlId);
        }
    }, [urlId]);

    const handleVerify = async (e, forcedId = null) => {
        if (e) e.preventDefault();

        const idToVerify = forcedId || certNo;
        if (!idToVerify || !idToVerify.trim()) return;

        setLoading(true);
        setResult(null);

        try {
            const certQuery = query(
                collection(db, 'certificates'),
                where('certificate_no', '==', idToVerify.trim()),
                limit(1)
            );
            const snapshot = await getDocs(certQuery);

            if (snapshot.empty) {
                setResult('not_found');
            } else {
                const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
                setResult({ status: 'found', data });
            }
        } catch (error) {
            setResult('not_found');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-container">

            {/* Header Area */}
            <div className="verify-header-section">
                <div className="verify-icon-box">
                    <Award size={32} />
                </div>
                <h1 className="verify-main-title">
                    Verify <span className="title-gradient">Certificate</span>
                </h1>
                <p className="verify-subtitle">
                    Enter the unique certificate number to verify its authenticity and view internship details.
                </p>
            </div>

            {/* Search Box */}
            <div className="verify-search-wrapper">
                <form onSubmit={handleVerify} className="verify-form">
                    <Search className="search-icon" size={24} />
                    <input
                        type="text"
                        value={certNo}
                        onChange={(e) => setCertNo(e.target.value.toUpperCase())}
                        placeholder="Enter Certificate No. (e.g., MJ-2026-XYZ)"
                        className="verify-input"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading || !certNo.trim()}
                        className="btn-verify"
                    >
                        {loading ? 'Verifying...' : 'Verify Now'}
                    </button>
                </form>
            </div>

            {/* Results Area */}
            <div className="verify-results-wrapper">
                <AnimatePresence mode="wait">

                    {/* state: Not Found */}
                    {result === 'not_found' && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="verify-error-card"
                        >
                            <XCircle className="text-red-500 mx-auto mb-4" size={48} />
                            <h3 className="error-title">Invalid Certificate</h3>
                            <p className="error-text">
                                We could not find any records for Certificate Number <span style={{ fontFamily: 'monospace', color: 'white' }}>"{certNo}"</span>.
                                Please check the number and try again.
                            </p>
                        </motion.div>
                    )}

                    {/* state: Found */}
                    {result?.status === 'found' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="verify-success-card"
                        >
                            {/* Success Banner */}
                            <div className="success-banner">
                                <div className="success-icon-badge">
                                    <CheckCircle size={24} strokeWidth={3} />
                                </div>
                                <div>
                                    <h2 className="success-banner-title">Verified & Authentic</h2>
                                    <p className="success-banner-subtitle">Official Record found in MJ Tech Global Database</p>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="success-details-body">
                                <div className="details-grid-top">

                                    <div>
                                        <p className="detail-block-title">
                                            <Award size={14} /> Certificate Number
                                        </p>
                                        <p className="detail-block-value-mono">
                                            {result.data.certificate_no}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="detail-block-title">
                                            <User size={14} /> Intern Name
                                        </p>
                                        <p className="detail-block-value">
                                            {result.data.name || result.data.user_email || 'Verified Candidate'}
                                        </p>
                                    </div>
                                </div>

                                <div className="details-internship-section">
                                    <h3 className="internship-section-title">Internship Details</h3>
                                    <div className="internship-grid">
                                        <div className="internship-stat-box">
                                            <p className="stat-label">Technology</p>
                                            <p className="stat-value">{result.data.technology || 'Web Development'}</p>
                                        </div>
                                        <div className="internship-stat-box with-icon">
                                            <Clock color="#3b82f6" size={24} />
                                            <div>
                                                <p className="stat-label">Duration</p>
                                                <p className="stat-value" style={{ fontSize: '0.85rem' }}>{result.data.duration || '3 Months'}</p>
                                            </div>
                                        </div>
                                        <div className="internship-stat-box with-icon">
                                            <Calendar color="#a855f7" size={24} />
                                            <div>
                                                <p className="stat-label">Issue Date</p>
                                                <p className="stat-value" style={{ fontSize: '0.85rem' }}>
                                                    {new Date(result.data.issue_date || result.data.created_at || new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="success-footer">
                                This digital certificate record is dynamically generated from our secure database.
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>
            <VerifyCertificate />
        </Suspense>
    );
}


