import Link from 'next/link';
import {
    Box,
    FileText,
    Package,
} from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Product from '@/model/products';

export const runtime = 'nodejs';

export default async function AdminDashboard() {
    await connectDB();

    const [
        totalProducts,
        activeProducts,
        outOfStockProducts,
    ] = await Promise.all([
        Product.countDocuments(),
        Product.countDocuments({
            stock: { $gt: 0 },
        }),
        Product.countDocuments({
            stock: 0,
        }),
    ]);

    const stats = [
        {
            title: 'Total Products',
            value: totalProducts,
            icon: Package,
        },
        {
            title: 'Active Products',
            value: activeProducts,
            icon: Box,
        },
        {
            title: 'Out of Stock',
            value: outOfStockProducts,
            icon: FileText,
        },
    ];

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Manage products and customer enquiries.
                </p>
            </div>

            {/* Stats */}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        {stat.title}
                                    </p>

                                    <p className="mt-2 text-3xl font-bold text-slate-900">
                                        {stat.value}
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                                    <Icon size={23} />
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick actions */}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold text-slate-900">
                    Quick Actions
                </h2>

                <div className="mt-5 flex flex-wrap gap-3">

                    <Link
                        href="/admin/products"
                        className="rounded-xl bg-sky-800 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
                    >
                        Manage Products
                    </Link>

                    <Link
                        href="/admin/products/add"
                        className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-sky-700 hover:text-sky-700"
                    >
                        Add Product
                    </Link>

                    <Link
                        href="/admin/quotes"
                        className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-sky-700 hover:text-sky-700"
                    >
                        View Quotes
                    </Link>

                </div>
            </div>
        </>
    );
}