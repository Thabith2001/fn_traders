import type { Metadata } from 'next';
import React, {ReactNode} from 'react';
import './globals.css';


export const metadata: Metadata = {
    title: 'FN Traders | Air Conditioner Sales',
    description: 'Quality air conditioners and cooling solutions from FN Traders.',
    icons: {
        icon: '/images/acLogo.png',
    },
};


const RootLayout = ({children}: { children: ReactNode }) => {
    return  <html lang="en">
    <body className="w-screen h-screen overflow-y-scroll overflow-x-hidden">
    {children}
    </body>
    </html>
};

export default RootLayout;

