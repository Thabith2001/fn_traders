import Link from 'next/link';
import {
    ArrowLeft,
    CheckCircle2,
    Phone,
    PackageCheck,
    PackageX,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';

import connectDB from '@/lib/mongodb';
import Product from '@/model/products';
import ProductGallery from '@/app/components/productGallery';

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProductDetailsPage({
                                                     params,
                                                 }: Props) {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        notFound();
    }

    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
        notFound();
    }

    const productImages =
        product.images?.length > 0
            ? product.images.slice(0, 3)
            : [];

    return (
        <main className="min-h-screen bg-slate-50 pt-28">
            <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

                {/* Back */}
                <Link
                    href="/products"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-sky-700"
                >
                    <ArrowLeft size={18} />
                    Back to Products
                </Link>

                {/* Main */}
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

                    {/* Gallery */}
                    <ProductGallery
                        images={productImages}
                        productName={product.name}
                        isLatest={product.isLatest}
                    />

                    {/* Product Details */}
                    <div className="lg:sticky lg:top-32">

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
                            {product.products_info?.[0]?.value}
                        </p>

                        <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                            {product.name}
                        </h1>

                        {/* Brand / Model / Stock */}
                        <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800">
                {product.brand}
              </span>

                            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                Model: {product.model_no}
              </span>

                            <span
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                                    product.stock > 0
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : 'bg-red-50 text-red-700'
                                }`}
                            >
                {product.stock > 0 ? (
                    <PackageCheck size={16} />
                ) : (
                    <PackageX size={16} />
                )}

                                {product.stock > 0
                                    ? `${product.stock} in stock`
                                    : 'Out of stock'}
              </span>
                        </div>

                        {/* Price */}
                        <div className="mt-7">
                            <p className="text-sm font-medium text-slate-500">
                                Price
                            </p>

                            <p className="text-lg font-bold text-slate-900">
                                {new Intl.NumberFormat('en-LK', {
                                    style: 'currency',
                                    currency: product.currency || 'LKR',
                                    maximumFractionDigits: 0,
                                }).format(product.price ?? 0)}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                            {product.description}
                        </p>

                        <div className="my-8 h-px bg-slate-200" />

                        {/* Highlights */}
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.15em] text-sky-700">
                                Features
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                Product Highlights
                            </h2>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                {product.product_highlight?.map(
                                    (feature: string) => (
                                        <div
                                            key={feature}
                                            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-200 hover:shadow-md"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50">
                                                <CheckCircle2
                                                    size={19}
                                                    className="text-sky-700"
                                                />
                                            </div>

                                            <span className="text-sm font-semibold text-slate-700">
                        {feature}
                      </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            {product.stock > 0 ? (
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-800 px-7 py-3.5 font-semibold text-white transition hover:bg-sky-700"
                                >
                                    <Phone size={18} />
                                    Get a Quote
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className="cursor-not-allowed rounded-full bg-slate-300 px-7 py-3.5 font-semibold text-slate-500"
                                >
                                    Currently Unavailable
                                </button>
                            )}

                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:border-sky-700 hover:text-sky-700"
                            >
                                Browse More Products
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Product Information */}
                <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                    <p className="text-sm font-bold uppercase tracking-[0.15em] text-sky-700">
                        Specifications
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                        Product Information
                    </h2>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {product.products_info?.map(
                            (
                                info: {
                                    label: string;
                                    value: string;
                                },
                                index: number
                            ) => (
                                <div
                                    key={`${info.label}-${index}`}
                                    className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                                >
                                    <p className="text-sm font-medium text-slate-500">
                                        {info.label}
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-900">
                                        {info.value}
                                    </p>
                                </div>
                            )
                        )}

                        <InfoCard
                            label="Brand"
                            value={product.brand}
                        />

                        <InfoCard
                            label="Model"
                            value={product.model_no}
                        />

                        <InfoCard
                            label="Warranty"
                            value={product.warranty}
                        />

                        <InfoCard
                            label="Capacity"
                            value={product.capacity}
                        />

                    </div>
                </div>

            </section>
        </main>
    );
}

const InfoCard = ({
                      label,
                      value,
                  }: {
    label: string;
    value: string;
}) => (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
        <p className="text-sm font-medium text-slate-500">
            {label}
        </p>

        <p className="mt-2 font-semibold text-slate-900">
            {value}
        </p>
    </div>
);