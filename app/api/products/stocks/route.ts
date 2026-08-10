import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/model/products';

export const runtime = 'nodejs';


export async function GET() {
    try {
        await connectDB();

        const products = await Product.find(
            {},
            {
                name: 1,
                model_no: 1,
                brand: 1,
                stock: 1,
            }
        ).lean();

        const totalStock = products.reduce(
            (total, product) => total + product.stock,
            0
        );

        const outOfStockCount = products.filter(
            (product) => product.stock === 0
        ).length;

        return NextResponse.json({
            success: true,
            productCount: products.length,
            totalStock,
            outOfStockCount,
            stocks: products,
        });

    } catch (error) {
        console.error('GET STOCK ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch stock',
            },
            {
                status: 500,
            }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        const {
            productId,
            quantity,
        } = body;

        if (!productId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product ID is required',
                },
                {
                    status: 400,
                }
            );
        }

        if (!quantity || quantity <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Valid quantity is required',
                },
                {
                    status: 400,
                }
            );
        }

        const product = await Product.findByIdAndUpdate(
            productId,
            {
                $inc: {
                    stock: quantity,
                },
            },
            {
                new: true,
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

        return NextResponse.json({
            success: true,
            message: 'Stock updated successfully',
            product,
        });

    } catch (error) {
        console.error('UPDATE STOCK ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update stock',
            },
            {
                status: 500,
            }
        );
    }
}