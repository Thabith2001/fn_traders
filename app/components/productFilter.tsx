'use client';

import { Search } from 'lucide-react';

type Props = {
    search: string;
    setSearch: (value: string) => void;

    category: string;
    setCategory: (value: string) => void;

    brand: string;
    setBrand: (value: string) => void;

    categories: string[];
    brands: string[];

    resultCount: number;

    clearFilters: () => void;
};

const ProductFilters = ({
                            search,
                            setSearch,
                            category,
                            setCategory,
                            brand,
                            setBrand,
                            categories,
                            brands,
                            resultCount,
                            clearFilters,
                        }: Props) => {
    const hasFilters =
        search ||
        category !== 'All' ||
        brand !== 'All';

    return (
        <>
            {/* Search + Filters */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">

                    {/* Search */}
                    <div className="relative">
                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search products or brands..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-700 outline-none transition"
                        />
                    </div>

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none"
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item === 'All'
                                    ? 'All Categories'
                                    : item}
                            </option>
                        ))}
                    </select>

                    {/* Brand */}
                    <select
                        value={brand}
                        onChange={(e) =>
                            setBrand(e.target.value)
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none"
                    >
                        {brands.map((item) => (
                            <option key={item} value={item}>
                                {item === 'All'
                                    ? 'All Brands'
                                    : item}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

            {/* Result Count */}
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                    {resultCount}{' '}
                    {resultCount === 1
                        ? 'product'
                        : 'products'}{' '}
                    found
                </p>

                {hasFilters && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="text-sm font-semibold text-sky-700 transition hover:text-sky-900"
                    >
                        Clear Filters
                    </button>
                )}
            </div>
        </>
    );
};

export default ProductFilters;