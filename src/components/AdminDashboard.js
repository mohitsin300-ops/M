"use client";

import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { CheckCircle, FileText, Users, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('internships');
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [completionApp, setCompletionApp] = useState(null);
    const [certData, setCertData] = useState({ issueDate: new Date().toISOString().split('T')[0] });

    const fetchData = async () => {
        setLoading(true);
        if (activeTab === 'internships') {
            try {
                const appQuery = query(collection(db, 'applications'), orderBy('created_at', 'desc'));
                const snapshot = await getDocs(appQuery);
                const data = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
                setApplications(data);
            } catch (error) {
                console.error('Firestore error fetching applications:', error);
            }
        } else if (activeTab === 'users') {
            try {
                const usersQuery = query(collection(db, 'applications'), orderBy('created_at', 'desc'));
                const snapshot = await getDocs(usersQuery);
                const data = snapshot.docs.map((item) => item.data());
                const uniqueUsers = Array.from(new Map(data.map((item) => [item.email, item])).values());
                setUsers(uniqueUsers);
            } catch (error) {
                console.error('Firestore error fetching users:', error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleStatusChange = async (app, newStatus) => {
        if (newStatus === 'Completed') {
            setCompletionApp(app);
            return;
        }

        setLoading(true);
        try {
            await updateDoc(doc(db, 'applications', app.id), { status: newStatus });
            fetchData();
        } catch (error) {
            console.error('Error handleStatusChange:', error);
            alert('Failed to update status.');
        } finally {
            setLoading(false);
        }
    };

    const generateCertificateSilently = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const certNo = `MJ-${Math.random().toString(36).substr(2, 6).toUpperCase()}-${new Date().getFullYear()}`;

            await addDoc(collection(db, 'certificates'), {
                user_email: completionApp.email,
                certificate_no: certNo,
                name: completionApp.name,
                father_name: completionApp.father_name || '',
                technology: completionApp.skills || 'Web Development',
                issue_date: certData.issueDate || new Date().toISOString().split('T')[0],
                duration: completionApp.duration || '3 Months',
                created_at: new Date().toISOString()
            });

            await updateDoc(doc(db, 'applications', completionApp.id), { status: 'Completed' });

            alert(`Application Completed and Certificate ${certNo} generated successfully for ${completionApp.name}!`);
            setCompletionApp(null);
            fetchData();
        } catch (error) {
            console.error(error);
            alert('Unexpected error generating certificate.');
            setCompletionApp(null);
            fetchData();
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Admin<span className="text-gradient">Panel</span></h2>
                </div>

                <nav className="admin-nav">
                    <button
                        className={`admin-nav-item ${activeTab === 'internships' ? 'active' : ''}`}
                        onClick={() => setActiveTab('internships')}
                    >
                        <FileText size={20} />
                        Internship Requests
                    </button>
                    <button
                        className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <Users size={20} />
                        All Users
                    </button>
                </nav>

                <div className="admin-sidebar-footer">
                    <button onClick={handleLogout} className="btn-admin-logout">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h1>{activeTab === 'internships' ? 'Internship Applications' : 'Registered Users Overview'}</h1>
                    <div className="admin-user-badge">Admin Access</div>
                </header>

                <div className="admin-content">
                    {loading ? (
                        <div className="admin-loader">Loading data...</div>
                    ) : (
                        <div className="admin-table-container">
                            {activeTab === 'internships' && (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>College</th>
                                            <th>Skills</th>
                                            <th>Duration</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.length === 0 ? (
                                            <tr><td colSpan="8" className="text-center">No applications found.</td></tr>
                                        ) : (
                                            applications.map((app) => (
                                                <tr key={app.id}>
                                                    <td>{app.name}</td>
                                                    <td>{app.email}</td>
                                                    <td>{app.college}</td>
                                                    <td>{app.skills}</td>
                                                    <td>{app.duration}</td>
                                                    <td>{new Date(app.created_at).toLocaleDateString()}</td>
                                                    <td>
                                                        <span className={`status-badge ${app.status?.toLowerCase() || 'pending'}`}>
                                                            {app.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <select
                                                            className="status-dropdown"
                                                            value={app.status || 'Pending'}
                                                            onChange={(e) => handleStatusChange(app, e.target.value)}
                                                            disabled={app.status === 'Completed'}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Active">Active</option>
                                                            <option value="Failed">Failed</option>
                                                            <option value="Completed">Completed</option>
                                                        </select>
                                                        {app.status === 'Completed' && <span className="completed-icon"><CheckCircle size={14} /></span>}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            )}

                            {activeTab === 'users' && (
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length === 0 ? (
                                            <tr><td colSpan="3" className="text-center">No users found.</td></tr>
                                        ) : (
                                            users.map((u, i) => (
                                                <tr key={i}>
                                                    <td>{u.name}</td>
                                                    <td>{u.email}</td>
                                                    <td>{u.phone || 'N/A'}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {completionApp && (
                <div className="modal-overlay">
                    <div className="modal-content admin-modal">
                        <h3>Complete Internship</h3>
                        <p>Generate Certificate for: <strong>{completionApp.name}</strong> ({completionApp.email})</p>

                        <form onSubmit={generateCertificateSilently}>
                            <div className="form-group">
                                <label>Certificate Issue Date</label>
                                <input
                                    type="date"
                                    required
                                    className="form-input"
                                    value={certData.issueDate}
                                    onChange={(e) => setCertData({ ...certData, issueDate: e.target.value })}
                                />
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setCompletionApp(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                >
                                    Confirm and Generate
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
