"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import './Admin.css';

// Replace with actual admin emails if needed
const ADMIN_EMAILS = ['mjtechglobal@zohomail.in', 'mjtechbharat@gmail.com']; // added the third in case

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error || !session) {
                    router.replace('/auth?mode=login');
                    return;
                }

                const userEmail = session.user.email;
                if (ADMIN_EMAILS.includes(userEmail)) {
                    setIsAuthorized(true);
                } else {
                    router.replace('/'); // Not authorized
                }
            } catch (err) {
                console.error("Auth error:", err);
                router.replace('/');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner"></div>
                <p>Verifying Access...</p>
            </div>
        );
    }

    if (!isAuthorized) {
        return null; // Will redirect
    }

    return (
        <div className="admin-layout">
            {children}
        </div>
    );
}
