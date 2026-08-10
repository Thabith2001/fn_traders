'use client';

import { useEffect, useMemo, useState } from 'react';
import ProductFilters from '@/app/components/productFilter';
import ProductGrid from '@/app/components/productGrid';
import { ProductType } from '@/util/productType';
import {fetchProducts} from "@/service/productService";


const ProductsPage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [brand, setBrand] = useState('All');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);

                const data = await fetchProducts(page, 6);

                setProducts(data.products);
                setTotalPages(data.pagination?.totalPages ?? 1);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [page]);

    // Categories
    const categories = useMemo(() => {
        const productCategories = products
            .map((product) => product.products_info?.[0]?.value)
            .filter((value): value is string => Boolean(value));

        return ['All', ...new Set(productCategories)];
    }, [products]);

    // Brands
    const brands = useMemo(() => {
        const productBrands = products
            .map((product) => product.brand)
            .filter((value): value is string => Boolean(value));

        return ['All', ...new Set(productBrands)];
    }, [products]);

    // Filter Products
    const filteredProducts = useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        return products.filter((product) => {
            const productCategory =
                product.products_info?.[0]?.value || '';

            const matchesSearch =
                searchValue === '' ||
                product.name.toLowerCase().includes(searchValue) ||
                product.brand.toLowerCase().includes(searchValue) ||
                product.model_no?.toLowerCase().includes(searchValue);

            const matchesCategory =
                category === 'All' ||
                productCategory === category;

            const matchesBrand =
                brand === 'All' ||
                product.brand === brand;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesBrand
            );
        });
    }, [products, search, category, brand]);

    const clearFilters = () => {
        setSearch('');
        setCategory('All');
        setBrand('All');
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 pt-28">
                <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
                    <p className="text-slate-500">
                        Loading products...
                    </p>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 pt-28">
            <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-700">
                        FN Traders
                    </p>

                    <h1 className="mt-2 bg-linear-to-r from-sky-900 via-sky-600 to-sky-800 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                        All Products
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-600">
                        Find the right air conditioner for your home,
                        office or commercial space.
                    </p>
                </div>

                {/* Filters */}
                <ProductFilters
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    brand={brand}
                    setBrand={setBrand}
                    categories={categories}
                    brands={brands}
                    resultCount={filteredProducts.length}
                    clearFilters={clearFilters}
                />

                {/* Products */}
                <ProductGrid
                    products={filteredProducts}
                    clearFilters={clearFilters}
                />

                {/* Pagination */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    <button
                        onClick={() =>
                            setPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={page === 1}
                        className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <span className="text-sm font-semibold text-slate-700">
            Page {page} of {totalPages}
          </span>

                    <button
                        onClick={() =>
                            setPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={page >= totalPages}
                        className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>

            </section>
        </main>
    );
};

export default ProductsPage;