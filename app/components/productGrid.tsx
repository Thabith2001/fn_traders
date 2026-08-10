'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { ProductType } from '@/util/productType';

type Props = {
    products: ProductType[];
    clearFilters: () => void;
};

const ProductGrid = ({
                         products,
                         clearFilters,
                     }: Props) => {
    if (products.length === 0) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
                <h2 className="mt-4 text-xl font-bold text-slate-900">
                    No products found
                </h2>

                <p className="mt-2 text-slate-500">
                    Try changing your search or filters.
                </p>

                <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-full bg-sky-800 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
                >
                    Clear Filters
                </button>
            </div>
        );
    }

    return (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
                const isAvailable = product.stock > 0;

                return (
                    <div
                        key={product._id}
                        className={`group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 ${
                            isAvailable
                                ? 'opacity-100 hover:-translate-y-1 hover:shadow-xl'
                                : 'opacity-50'
                        }`}
                    >
                        <Link
                            href={
                                isAvailable
                                    ? `/products/${product._id}`
                                    : '#'
                            }
                            className={
                                !isAvailable
                                    ? 'pointer-events-none'
                                    : ''
                            }
                        >
                            {/* Image */}
                            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-linear-to-b from-sky-50 to-white p-8">

                                {/* Latest Ribbon */}
                                {product.isLatest && (
                                    <div className="absolute -left-10 top-5 z-20 w-36 -rotate-45 bg-red-700 py-2 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md">
                                        New
                                    </div>
                                )}

                                {/* Out of Stock */}
                                {!isAvailable && (
                                    <span className="absolute right-4 top-4 z-20 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                    Out of Stock
                  </span>
                                )}

                                {product.images?.[0] ? (
                                    <CldImage
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={400}
                                        height={260}
                                        loading="eager"
                                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                        No image available
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="px-6 pt-6">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-semibold text-sky-700">
                                        {product.products_info?.[0]?.value}
                                    </p>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {product.brand}
                  </span>
                                </div>

                                <h2 className="mt-3 text-xl font-bold text-slate-900 transition group-hover:text-sky-700">
                                    {product.name}
                                </h2>
                            </div>
                        </Link>

                        <div className="p-6 pt-5">
                            <div className="flex items-center justify-between gap-4">

                                {/* Price */}
                                <p className="text-lg font-bold text-slate-900">
                                    {new Intl.NumberFormat('en-LK', {
                                        style: 'currency',
                                        currency: product.currency || 'LKR',
                                        maximumFractionDigits: 0,
                                    }).format(product.price ?? 0)}
                                </p>

                                {isAvailable && (
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 rounded-full bg-sky-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                                    >
                                        Get Quote
                                        <ArrowRight size={16} />
                                    </Link>
                                )}
                            </div>

                            {isAvailable && (
                                <Link
                                    href={`/products/${product._id}`}
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-800 transition hover:text-sky-600"
                                >
                                    View Details
                                    <ArrowRight size={16} />
                                </Link>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductGrid;