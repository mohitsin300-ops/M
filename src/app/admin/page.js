"use client";
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { CheckCircle, XCircle, Search, FileText, Users, LogOut, CheckSquare, Maximize } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('internships'); // 'internships' | 'users'

    // States
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]); // This will fetch profiles or we just rely on users generated
    const [loading, setLoading] = useState(true);

    const [completionApp, setCompletionApp] = useState(null);
    const [certData, setCertData] = useState({ issueDate: new Date().toISOString().split('T')[0] });
    const handleStatusChange = async (app, newStatus) => {
        if (newStatus === 'Completed') {
            setCompletionApp(app);
            return;
        }

        setLoading(true);
        try {
            // Update application status
            const { error: updateError } = await supabase
                .from('applications')
                .update({ status: newStatus })
                .eq('id', app.id);

            if (updateError) {
                console.error("Error updating status:", updateError);
                alert("Failed to update status.");
            }
            fetchData();
        } catch (error) {
            console.error("Error handleStatusChange:", error);
        } finally {
            setLoading(false);
        }
    };

    const generateCertificateSilently = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Generate unique Cert ID
            const certNo = `MJ-${Math.random().toString(36).substr(2, 6).toUpperCase()}-${new Date().getFullYear()}`;

            // 2. Insert into Certificates Table (no gender, status, or application_id as per strict schema)
            const { error } = await supabase
                .from('certificates')
                .insert([
                    {
                        user_email: completionApp.email,
                        certificate_no: certNo,
                        name: completionApp.name,
                        father_name: completionApp.father_name || '', // Will use the one collected from form
                        technology: completionApp.skills || 'Web Development',
                        issue_date: certData.issueDate || new Date().toISOString().split('T')[0],
                        duration: completionApp.duration || '3 Months'
                    }
                ]);

            if (error) {
                console.error("Error generating certificate", JSON.stringify(error, null, 2));
                alert(`Certificate failed to generate!\nReason: ${error.message || JSON.stringify(error)}`);
            } else {
                // Update applications to Completed
                await supabase
                    .from('applications')
                    .update({ status: 'Completed' })
                    .eq('id', completionApp.id);

                alert(`Application Completed & Certificate ${certNo} generated successfully for ${completionApp.name}!`);
            }

            setCompletionApp(null);
            fetchData(); // Refresh list

        } catch (error) {
            console.error(error);
            alert("Unexpected error generating certificate.");
            setCompletionApp(null);
            fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        if (activeTab === 'internships') {
            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Supabase error fetching applications:", error);
            } else if (data) {
                setApplications(data);
            }
        } else if (activeTab === 'users') {
            // Need a profiles table or to fetch from auth.users (requires service role).
            // For now, let's just fetch unique emails from applications as a fallback or a 'profiles' table.

            // To properly fetch all users without Service_Role key, we need a 'profiles' table 
            // triggered on user sign up. Let's assume we have something or we just show applications emails.
            const { data, error } = await supabase.from('applications').select('name, email, phone').order('created_at', { ascending: false });

            if (error) {
                console.error("Supabase error fetching users:", error);
            } else if (data) {
                // simple unique by email
                const uniqueUsers = Array.from(new Map(data.map(item => [item.email, item])).values());
                setUsers(uniqueUsers);
            }
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };



    return (
        <div className="admin-container">
            {/* Sidebar */}
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

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>{activeTab === 'internships' ? 'Internship Applications' : 'Registered Users Overview'}</h1>
                    <div className="admin-user-badge">
                        Admin Access
                    </div>
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


            {/* Completion Modal */}
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
                                    Confirm & Generate
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
