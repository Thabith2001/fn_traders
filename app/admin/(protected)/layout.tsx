import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/app/components/admin/adminSidebar';
import AdminHeader from '@/app/components/admin/adminHeader';

export default async function AdminLayout({
                                              children,
                                          }: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();

    const adminAuth =
        cookieStore.get('admin_auth')?.value;

    if (adminAuth !== 'true') {
        redirect('/admin/auth');
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <AdminSidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <AdminHeader />

                <main className="flex-1 p-5 sm:p-8">
                    {children}
                </main>
            </div>

        </div>
    );
}