
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react';
import { products } from '@/data/links';
import { notFound } from 'next/navigation';
import ProductGallery from "@/app/components/productGallery";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProductDetailsPage({ params }: Props) {
    const { id } = await params;

    const product = products.find(
        (item) => String(item.id) === id
    );

    if (!product) {
        notFound();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    product.images?.length > 0
        ? product.images.slice(0, 3)
        : [product.image || '/images/acLogo.png'];

    return (

        <main className="min-h-screen bg-slate-50 pt-28">
            <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

                {/* Back */}
                <Link
                    href="/products"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-sky-700"
                >
                    <ArrowLeft size={18} />
                    Back to Products
                </Link>

                <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

                    {/* Product Gallery */}
                        <ProductGallery
                            images={
                                product.images?.length
                                    ? product.images
                                    : [product.image || '/images/acLogo.png']
                            }
                            productName={product.name}
                        />

                    {/* Product Info */}
                    <div className="lg:sticky lg:top-32">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
                            {product.category}
                        </p>

                        <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                            {product.name}
                        </h1>

                        <p className="mt-5 text-3xl font-bold text-sky-800">
                            {product.price}
                        </p>

                        <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                            Reliable and energy-efficient air conditioning designed for
                            comfortable cooling in homes, offices and commercial spaces.
                        </p>

                        {/* Divider */}
                        <div className="my-8 h-px bg-slate-200" />

                        {/* Features */}
                        <h2 className="text-lg font-bold text-slate-900">
                            Product Highlights
                        </h2>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {[
                                'Energy Efficient',
                                'Fast Cooling',
                                'Low Noise Operation',
                                'Reliable Performance',
                            ].map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4"
                                >
                                    <CheckCircle2
                                        size={20}
                                        className="shrink-0 text-sky-600"
                                    />

                                    <span className="font-medium text-slate-700">
                    {feature}
                  </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-800 px-7 py-3.5 font-semibold text-white transition hover:bg-sky-700"
                            >
                                <Phone size={18} />
                                Get a Quote
                            </Link>

                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:border-sky-700 hover:text-sky-700"
                            >
                                Browse More Products
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Product Information
                    </h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl bg-slate-50 p-5">
                            <p className="text-sm text-slate-500">Category</p>
                            <p className="mt-1 font-semibold text-slate-900">
                                {product.category}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-5">
                            <p className="text-sm text-slate-500">Cooling</p>
                            <p className="mt-1 font-semibold text-slate-900">
                                Fast & Efficient
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-5">
                            <p className="text-sm text-slate-500">Suitable For</p>
                            <p className="mt-1 font-semibold text-slate-900">
                                Home & Office
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-5">
                            <p className="text-sm text-slate-500">Availability</p>
                            <p className="mt-1 font-semibold text-emerald-600">
                                Available
                            </p>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    );
}