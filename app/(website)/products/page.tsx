import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/links';

const ProductsPage = () => {
    return (
        <main className="min-h-screen bg-slate-50 pt-28">
            <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">

                <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
                        FN Traders
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-slate-900">
                        All Products
                    </h1>
                </div>

                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <Link href={`/products/${product.id}`}>
                                <div className="flex h-64 items-center justify-center bg-linear-to-b from-sky-50 to-white p-8">
                                    <Image
                                        src={product.image || '/images/acLogo.png'}
                                        alt={product.name}
                                        width={400}
                                        height={260}
                                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <div className="px-6 pt-6">
                                    <p className="text-sm font-semibold text-sky-700">
                                        {product.category}
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold text-slate-900 transition hover:text-sky-700">
                                        {product.name}
                                    </h2>
                                </div>
                            </Link>

                            <div className="p-6 pt-5">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-lg font-bold text-slate-900">
                                        {product.price}
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 rounded-full bg-sky-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                                    >
                                        Get Quote
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>

                                <Link
                                    href={`/products/${product.id}`}
                                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-800 transition hover:text-sky-600"
                                >
                                    View Details
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
        </main>
    );
};

export default ProductsPage;