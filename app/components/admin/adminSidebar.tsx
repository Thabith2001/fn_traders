'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Settings,
} from 'lucide-react';
import LogoutButton from './logoutButton';

const links = [
    {
        name: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
    },
    {
        name: 'Products',
        href: '/admin/products',
        icon: Package,
    },
    {
        name: 'Quotes',
        href: '/admin/quotes',
        icon: ShoppingBag,
    },
    {
        name: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-64 shrink-0 flex-col bg-slate-950 text-white md:flex">

            <div className="border-b border-slate-800 px-6 py-6">
                <h1 className="text-xl font-bold">
                    FN Traders
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    Admin Panel
                </p>
            </div>

            <nav className="flex-1 space-y-2 p-4">
                {links.map((item) => {
                    const Icon = item.icon;

                    const active =
                        item.href === '/admin'
                            ? pathname === '/admin'
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                                active
                                    ? 'bg-sky-800 text-white'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                        >
                            <Icon size={19} />

                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t border-slate-800 p-4">
                <LogoutButton />
            </div>

        </aside>
    );
}