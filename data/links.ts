import {Box, CheckCircle2, FileText, Package} from 'lucide-react';

export const links = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Air Conditioners',
        path: '/products',
    },
    {
        name: 'Services',
        path: '/services',
    },
    {
        name: 'About',
        path: '/about',
    },
];

export const icons = [
    {
        icon: CheckCircle2,
        size: 20,
        color: 'text-sky-600',
        names: [
            'Quality Products',
            'Competitive Prices',
            'Trusted Services',
        ],
    },
];

export const stats = [
    {
        title: 'Total Products',
        value: 'totalProducts',
        icon: Package,
    },
    {
        title: 'Active Products',
        value: 'activeProducts',
        icon: Box,
    },
    {
        title: 'Out of Stock',
        value: 'outOfStockProducts',
        icon: FileText,
    },
];
