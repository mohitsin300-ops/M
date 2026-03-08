import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request) {
    try {
        const data = await request.json();

        // In a real production scenario, you would use Nodemailer, SendGrid, or Resend
        // to send an email to mjtechglobal@zohomail.in and mjtechbharat@gmail.com
        console.log('--- NEW INTERNSHIP APPLICATION ---');
        console.log('Name:', data.name);
        console.log('Email:', data.email);

        // Insert into Supabase
        const { error: dbError } = await supabase
            .from('applications')
            .insert([
                {
                    name: data.name,
                    father_name: data.father_name,
                    email: data.email,
                    phone: data.phone,
                    college: data.college,
                    gender: data.gender,
                    skills: data.skills,
                    duration: data.duration
                }
            ]);

        if (dbError) {
            console.error('Supabase Error:', dbError);
            throw new Error('Database insertion failed');
        }

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
