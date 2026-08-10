import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/model/admin';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

export async function POST(request: Request) {
    try {
        await connectDB();

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

        const admin = await Admin.findOne({ email });

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
        return NextResponse.json(
            {
                success: false,
                message: 'Login failed',
            },
            { status: 500 }
        );
    }
}