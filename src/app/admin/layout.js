"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Admin.css';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.replace('/auth?mode=login');
                setLoading(false);
                return;
            }

            try {
                const tokenResult = await user.getIdTokenResult(true);
                if (tokenResult?.claims?.admin === true) {
                    setIsAuthorized(true);
                } else {
                    router.replace('/');
                }
            } catch (error) {
                console.error('Failed to verify admin role:', error);
                router.replace('/');
            }

            setLoading(false);
        });

        return () => unsubscribe();
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
