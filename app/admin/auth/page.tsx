import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminLoginForm from '@/app/components/adminLoginForm';

export default async function AdminAuthPage() {
    const cookieStore = await cookies();

    const adminAuth = cookieStore.get('admin_auth');

    if (adminAuth?.value === 'true') {
        redirect('/admin');
    }

    return <AdminLoginForm />;
}