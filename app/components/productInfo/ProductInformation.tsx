import {PackagePlus} from 'lucide-react';

export default function ProductInformation() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-sky-50 p-2.5 text-sky-600">
                    <PackagePlus size={20}/>
                </div>

                <div>
                    <h2 className="font-semibold text-slate-900">
                        Product Information
                    </h2>

                    <p className="text-sm text-slate-500">
                        Enter the main details of the product.
                    </p>
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

                {/* Product name */}
                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Product Name
                    </label>

                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. 12000 BTU Inverter AC"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                    />
                </div>

                {/* Brand */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Brand
                    </label>

                    <input
                        name="brand"
                        type="text"
                        required
                        placeholder="e.g. Midea"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                    />
                </div>

                {/*Model*/}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Model Number
                    </label>

                    <input
                        name="model_no"
                        type="text"
                        required
                        placeholder="e.g. MSAG-12CRDN8"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                    />
                </div>
                {/*Capacity*/}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Capacity
                    </label>

                    <input
                        name="capacity"
                        type="text"
                        required
                        placeholder="e.g. 12000 BTU"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Category
                    </label>

                    <select
                        name="category"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                    >
                        <option value="">
                            Select category
                        </option>

                        <option value="Wall Mounted">
                            Wall Mounted
                        </option>

                        <option value="Ceiling Cassette">
                            Ceiling Cassette
                        </option>

                        <option value="Floor Standing">
                            Floor Standing
                        </option>

                        <option value="Portable AC">
                            Portable AC
                        </option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Price
                    </label>

                    <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
        LKR
        </span>

                        <input
                            name="price"
                            type="number"
                            min="0"
                            required
                            placeholder="185000"
                            className="w-full rounded-xl border border-slate-200 py-3 pl-14 pr-4 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                        />
                    </div>
                </div>

                {/* Stock */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Stock Quantity
                    </label>

                    <input
                        name="stock"
                        type="number"
                        min="0"
                        required
                        placeholder="10"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Warranty
                    </label>

                    <input
                        name="warranty"
                        type="text"
                        required
                        placeholder="e.g. 5 years"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Description
                    </label>

                    <textarea
                        name="description"
                        rows={5}
                        required
                        placeholder="Write a short description about the air conditioner..."
                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                    />
                </div>

            </div>
        </section>
    );
}