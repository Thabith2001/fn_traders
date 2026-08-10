import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

import connectDB from '@/lib/mongodb';
import Product from '@/model/products';

type Props = {
    params: Promise<{
        id: string;
    }>;
};


// GET SINGLE PRODUCT
export async function GET(
    request: Request,
    { params }: Props
) {
    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid product ID',
                },
                {
                    status: 400,
                }
            );
        }
        const product = await Product.findById(id).lean();

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product not found',
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                product,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error('GET PRODUCT ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch product',
            },
            {
                status: 500,
            }
        );
    }
}


// UPDATE PRODUCT
export async function PATCH(
    request: Request,
    { params }: Props
) {
    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid product ID',
                },
                {
                    status: 400,
                }
            );
        }

        const body = await request.json();

        const product = await Product.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product not found',
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Product updated successfully',
                product,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error('UPDATE PRODUCT ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update product',
            },
            {
                status: 500,
            }
        );
    }
}


// DELETE PRODUCT
export async function DELETE(
    request: Request,
    { params }: Props
) {
    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid product ID',
                },
                {
                    status: 400,
                }
            );
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product not found',
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Product deleted successfully',
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error('DELETE PRODUCT ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete product',
            },
            {
                status: 500,
            }
        );
    }
}