import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/model/products';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const modelNo =
            request.nextUrl.searchParams.get('model_no');

        if (!modelNo) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Model number is required',
                },
                {
                    status: 400,
                }
            );
        }

        const product = await Product.findOne({
            model_no: modelNo,
        });

        return NextResponse.json({
            success: true,
            exists: !!product,
            product,
        });

    } catch (error) {
        console.error('CHECK PRODUCT ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to check product',
            },
            {
                status: 500,
            }
        );
    }
}