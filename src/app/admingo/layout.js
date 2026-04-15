"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import '../admin/Admin.css';

export default function AdminGoLayout({ children }) {
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
                const hasClaimAdmin = tokenResult?.claims?.admin === true;

                let hasFirestoreAdminRole = false;
                if (!hasClaimAdmin) {
                    const adminDocRef = doc(db, 'admin', user.uid);
                    const adminSnapshot = await getDoc(adminDocRef);
                    const adminData = adminSnapshot.exists() ? adminSnapshot.data() : null;

                    hasFirestoreAdminRole = Boolean(
                        adminData &&
                        adminData.role === 'admin' &&
                        (!adminData.Email || String(adminData.Email).toLowerCase() === String(user.email || '').toLowerCase())
                    );
                }

                if (hasClaimAdmin || hasFirestoreAdminRole) {
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
        return null;
    }

    return <div className="admin-layout">{children}</div>;
}
