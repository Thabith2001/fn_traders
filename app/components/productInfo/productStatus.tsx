export default function ProductStatus() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 font-semibold text-slate-900">
                Product Status
            </h2>

            <div className="space-y-4">

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Availability
                    </label>

                    <select
                        name="status"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                    >
                        <option value="true">
                            Available
                        </option>

                        <option value="false">
                            Unavailable
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Featured Product
                    </label>

                    <select
                        name="featured"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                    >
                        <option value="false">
                            No
                        </option>

                        <option value="true">
                            Yes
                        </option>
                    </select>
                </div>

            </div>
        </section>
    );
}