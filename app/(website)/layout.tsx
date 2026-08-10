import Header from '@/app/components/header'
import Footer from '@/app/components/footers';
import React from "react";

export default function WebsiteLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}