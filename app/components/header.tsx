'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { links } from '@/data/links';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header
            className={`fixed left-0 top-0 z-50 w-full  transition-all duration-300 ${
                isScrolled || isOpen
                    ? 'bg-sky-200/20 shadow-md'
                    : 'bg-transparent'
            }`}
        >
            <div
                className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
                    isScrolled ? 'py-2' : 'py-4'
                }`}
            >
                {/* Logo */}
                <Link href="/" onClick={closeMenu} className="flex items-center">
                    <Image
                        src="/images/acLogo.png"
                        width={180}
                        height={80}
                        alt="FN Traders Logo"
                        priority
                        className="h-auto w-32.5 sm:w-37.5 md:w-42.5"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.path}
                            className="text-lg text-slate-700 transition hover:text-sky-700 hover:font-bold"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <Link
                    href="/contact"
                    className="hidden rounded-full bg-sky-800 px-5 py-2.5 font-semibold text-white transition hover:bg-sky-700 md:block"
                >
                    Get a Quote
                </Link>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-800 transition hover:bg-slate-100 md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`overflow-hidden bg-white transition-all duration-300 md:hidden ${
                    isOpen
                        ? 'max-h-125 border-t border-slate-100 opacity-100'
                        : 'max-h-0 opacity-0'
                }`}
            >
                <nav className="flex flex-col px-5 py-5">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.path}
                            onClick={closeMenu}
                            className="border-b border-slate-100 py-3 font-bold text-lg text-slate-700 transition hover:pl-2 hover:text-sky-800"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        href="/contact"
                        onClick={closeMenu}
                        className="mt-5 rounded-full bg-sky-800 px-5 py-3 text-center font-semibold text-white transition hover:text-sky-700"
                    >
                        Get a Quote
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;