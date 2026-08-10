import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/model/admin';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email and password are required',
                },
                { status: 400 }
            );
        }

        await connectDB();

        const admin = await Admin.findOne({ email });
        console.log('Admin found:', !!admin);

        if (!admin) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid email or password',
                },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
        );

        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid email or password',
                },
                { status: 401 }
            );
        }

        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
        });

        response.cookies.set({
            name: 'admin_auth',
            value: 'true',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/admin',
            maxAge: 60 * 60 * 24,
        });

        return response;
    } catch (error) {
        console.error('ADMIN LOGIN ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Login failed',
                error:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error',
            },
            { status: 500 }
        );
    }
}