'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Pencil,
    Plus,
    Trash2,
} from 'lucide-react';
import { CldImage } from 'next-cloudinary';

import { ProductType } from '@/util/productType';
import { fetchProducts } from '@/service/productService';

export default function AdminProductsPage() {
    const [products, setProducts] =
        useState<ProductType[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response =
                    await fetchProducts(1, 100);

                setProducts(response.products);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return (
            <p className="text-slate-500">
                Loading products...
            </p>
        );
    }

    return (
        <>
            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Products
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage all FN Traders products.
                    </p>
                </div>

                <Link
                    href="/admin/products/add"
                    className="inline-flex items-center gap-2 rounded-xl bg-sky-800 px-5 py-3 font-semibold text-white"
                >
                    <Plus size={18} />
                    Add Product
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-slate-50">
                        <tr className="text-left text-sm text-slate-500">

                            <th className="px-6 py-4">
                                Product
                            </th>

                            <th className="px-6 py-4">
                                Brand
                            </th>

                            <th className="px-6 py-4">
                                Price
                            </th>

                            <th className="px-6 py-4">
                                Stock
                            </th>

                            <th className="px-6 py-4">
                                Actions
                            </th>

                        </tr>
                        </thead>

                        <tbody>
                        {products.map((product) => (
                            <tr
                                key={product._id}
                                className="border-t border-slate-100"
                            >

                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">

                                        {product.images?.[0] && (
                                            <CldImage
                                                src={product.images[0]}
                                                alt={product.name}
                                                width={60}
                                                height={60}
                                                loading="eager"
                                                className="h-14 w-14 object-contain"
                                            />
                                        )}

                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                {product.name}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {product.model_no}
                                            </p>
                                        </div>

                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {product.brand}
                                </td>

                                <td className="px-6 py-4 font-semibold">
                                    {new Intl.NumberFormat(
                                        'en-LK',
                                        {
                                            style: 'currency',
                                            currency:
                                                product.currency ||
                                                'LKR',
                                            maximumFractionDigits: 0,
                                        }
                                    ).format(product.price)}
                                </td>

                                <td className="px-6 py-4">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.stock > 0
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-red-50 text-red-700'
                        }`}
                    >
                      {product.stock}
                    </span>
                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex gap-2">

                                        <Link
                                            href={`/admin/products/${product._id}/edit`}
                                            className="rounded-lg bg-sky-50 p-2 text-sky-700"
                                        >
                                            <Pencil size={17} />
                                        </Link>

                                        <button
                                            type="button"
                                            className="rounded-lg bg-red-50 p-2 text-red-600"
                                        >
                                            <Trash2 size={17} />
                                        </button>

                                    </div>

                                </td>

                            </tr>
                        ))}
                        </tbody>

                    </table>

                </div>
            </div>
        </>
    );
}