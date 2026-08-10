'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { adminLogout } from '@/service/authService';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await adminLogout();

            if (response.success) {
                router.push('/admin/auth');
                router.refresh();
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
            <LogOut size={19} />
            Logout
        </button>
    );
};

export default LogoutButton;