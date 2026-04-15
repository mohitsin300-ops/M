import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp = null;
let adminDb = null;
let adminInitError = null;

function getPrivateKey() {
    const rawKey = process.env.FIREBASE_PRIVATE_KEY;
    if (!rawKey) return null;

    // Support keys stored with wrapping quotes in .env files.
    const unquotedKey = rawKey.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
    const normalizedKey = unquotedKey.replace(/\\n/g, '\n').replace(/\r/g, '');

    // Prevent accidental placeholder values from reaching firebase-admin cert().
    if (normalizedKey.includes('...')) {
        throw new Error('FIREBASE_PRIVATE_KEY looks like a placeholder. Paste full private_key from service-account JSON.');
    }

    return normalizedKey;
}

try {
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = getPrivateKey();

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY in env');
    }

    adminApp = getApps().length
        ? getApps()[0]
        : initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey
            })
        });

    adminDb = getFirestore(adminApp);
} catch (error) {
    adminInitError = error;
}

const adminReady = Boolean(adminDb);

export { adminDb, adminReady, adminInitError };
