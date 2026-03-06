import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();

        // In a real production scenario, you would use Nodemailer, SendGrid, or Resend
        // to send an email to mjtechglobal@zohomail.in and mjtechglobal@gmail.com
        console.log('--- NEW INTERNSHIP APPLICATION ---');
        console.log('Name:', data.name);
        console.log('Email:', data.email);
        console.log('Phone:', data.phone);
        console.log('College:', data.college);
        console.log('Skills:', data.skills);
        console.log('Duration:', data.duration);
        console.log('---------------------------------');

        return NextResponse.json(
            { message: 'Application submitted successfully', success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to submit application', success: false },
            { status: 500 }
        );
    }
}
