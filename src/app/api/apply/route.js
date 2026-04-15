import { NextResponse } from 'next/server';
import { adminDb, adminInitError, adminReady } from '../../../lib/firebaseAdmin';

export async function POST(request) {
    try {
        if (!adminReady) {
            const setupHint = 'Firebase Admin env missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env.local';
            const debugMessage = adminInitError?.message || setupHint;
            console.error('Firebase Admin init failed:', debugMessage);
            return NextResponse.json(
                {
                    message: process.env.NODE_ENV === 'production' ? setupHint : debugMessage,
                    success: false
                },
                { status: 500 }
            );
        }

        const data = await request.json();

        // In a real production scenario, you would use Nodemailer, SendGrid, or Resend
        // to send an email to mjtechglobal@zohomail.in and mjtechbharat@gmail.com
        console.log('--- NEW INTERNSHIP APPLICATION ---');
        console.log('Name:', data.name);
        console.log('Email:', data.email);

        await adminDb.collection('applications').add({
            name: data.name,
            father_name: data.father_name,
            email: data.email,
            phone: data.phone,
            college: data.college,
            gender: data.gender,
            skills: data.skills,
            duration: data.duration,
            status: 'Pending',
            created_at: new Date().toISOString()
        });

        return NextResponse.json(
            { message: 'Application submitted successfully', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Apply API Error:', error?.message || error);
        return NextResponse.json(
            { message: error?.message || 'Failed to submit application', success: false },
            { status: 500 }
        );
    }
}



