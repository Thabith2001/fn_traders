import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/model/products';

export const runtime = 'nodejs';

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);

        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 6;

        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || 'All';
        const brand = searchParams.get('brand') || 'All';

        const skip = (page - 1) * limit;

        const filter:any = {};

        // Search
        if (search.trim()) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: 'i',
                    },
                },
                {
                    brand: {
                        $regex: search,
                        $options: 'i',
                    },
                },
                {
                    model_no: {
                        $regex: search,
                        $options: 'i',
                    },
                },
            ];
        }

        // Brand
        if (brand !== 'All') {
            filter.brand = brand;
        }

        // Category
        if (category !== 'All') {
            filter.products_info = {
                $elemMatch: {
                    label: 'Category',
                    value: category,
                },
            };
        }

        const [products, total] = await Promise.all([
            Product.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),

            Product.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            success: true,
            products,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        });
    } catch (error) {
        console.error('GET PRODUCTS ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch products',
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const existingProduct = await Product.findOne({
            model_no: body.model_no,
        });

        if (existingProduct) {
            const updatedProduct = await Product.findOneAndUpdate(
                {
                    model_no: body.model_no,
                },
                {
                    $inc: {
                        stock: Number(body.stock || 0),
                    },
                },
                {
                    new: true,
                }
            );

            return NextResponse.json(
                {
                    success: true,
                    message: 'Stock updated successfully',
                    product: updatedProduct,
                },
                { status: 200 }
            );
        }

        const product = await Product.create(body);

        return NextResponse.json(
            {
                success: true,
                message: 'Product created successfully',
                product,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('PRODUCT ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to save product',
            },
            { status: 500 }
        );
    }
}