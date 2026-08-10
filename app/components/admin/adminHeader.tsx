export default function AdminHeader() {
    return (
        <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm font-semibold text-sky-700">
                        FN Traders
                    </p>

                    <p className="text-sm text-slate-500">
                        Administration
                    </p>
                </div>

                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                    Admin
                </div>

            </div>
        </header>
    );
}