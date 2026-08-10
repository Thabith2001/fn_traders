'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { ProductType } from '@/util/productType';
import { useEffect, useState } from 'react';
import {fetchLatestProducts} from "@/service/productService";



const ProductsSection = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);

                const data = await fetchLatestProducts();

                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return (
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <p className="text-slate-500">
                        Loading products...
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                    <div>
                        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
                            Our Products
                        </p>

                        <h2 className="max-w-2xl bg-linear-to-r from-sky-900 via-sky-600 to-sky-800 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                            Cooling solutions for every space
                        </h2>

                        <p className="mt-4 max-w-xl text-slate-600">
                            Explore reliable and energy-efficient air conditioners for
                            homes, offices, shops and commercial spaces.
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-2 font-semibold text-sky-800"
                    >
                        View all products

                        <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                    {products.slice(0, 3).map((product) => {
                        const isAvailable = product.stock > 0;

                        const cardContent = (
                            <>
                                {/* Latest Ribbon */}
                                {product.isLatest && (
                                    <div className="absolute -left-11 top-6 z-20 w-40 -rotate-45 bg-red-700 py-2 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md">
                                        New
                                    </div>
                                )}

                                {/* Unavailable Badge */}
                                {!isAvailable && (
                                    <span className="absolute right-4 top-4 z-20 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                    Unavailable
                  </span>
                                )}

                                {/* Product Image */}
                                <div className="relative flex h-64 items-center justify-center bg-linear-to-b from-sky-50 to-white p-8">

                                    {product.images?.[0] && (
                                        <CldImage
                                            src={product.images[0]}
                                            alt={product.name}
                                            width={400}
                                            height={260}
                                            loading="eager"
                                            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                        />
                                    )}

                                </div>

                                {/* Product Details */}
                                <div className="p-6">

                                    <div className="flex flex-wrap items-center gap-3">

                                        <p className="text-sm font-semibold text-sky-700">
                                            {product.products_info?.[0]?.value}
                                        </p>

                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {product.brand}
                    </span>

                                    </div>

                                    <h3 className="mt-3 text-xl font-bold text-slate-900">
                                        {product.name}
                                    </h3>

                                    <div className="mt-5 flex items-center justify-between gap-4">

                                        <p className="text-lg font-bold text-slate-900">
                                            {new Intl.NumberFormat('en-LK', {
                                                style: 'currency',
                                                currency: product.currency || 'LKR',
                                                maximumFractionDigits: 0,
                                            }).format(product.price)}
                                        </p>

                                        {isAvailable ? (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-sky-800 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-sky-700">

                        View Details

                        <ArrowRight size={16} />

                      </span>
                                        ) : (
                                            <span className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500">
                        Out of Stock
                      </span>
                                        )}

                                    </div>
                                </div>
                            </>
                        );

                        return isAvailable ? (
                            <Link
                                key={product._id}
                                href={`/products/${product._id}`}
                                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {cardContent}
                            </Link>
                        ) : (
                            <div
                                key={product._id}
                                className="group relative overflow-hidden rounded-3xl border border-red-200 bg-white opacity-60"
                            >
                                {cardContent}
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};

export default ProductsSection;