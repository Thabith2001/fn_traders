import Link from 'next/link';
import Image from 'next/image';
import { IoLogoInstagram , IoLogoFacebook} from "react-icons/io";
import {
    Mail,
    MapPin,
    Phone,
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-300">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block">
                            <Image
                                src="/images/acLogo.png"
                                width={160}
                                height={70}
                                alt="FN Traders Logo"
                                className="h-auto w-35"
                            />
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                            Reliable air conditioning solutions for homes, offices and
                            commercial spaces. Quality products, competitive prices and
                            trusted service.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <Link
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-sky-600 hover:text-white"
                                aria-label="Facebook"
                            >
                                <IoLogoFacebook size={18} />
                            </Link>

                            <Link
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-sky-600 hover:text-white"
                                aria-label="Instagram"
                            >
                                <IoLogoInstagram size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Quick Links
                        </h3>

                        <div className="mt-5 flex flex-col gap-3">
                            <Link href="/" className="transition hover:text-sky-400">
                                Home
                            </Link>

                            <Link
                                href="/products"
                                className="transition hover:text-sky-400"
                            >
                                Air Conditioners
                            </Link>

                            <Link
                                href="/services"
                                className="transition hover:text-sky-400"
                            >
                                Services
                            </Link>

                            <Link
                                href="/about"
                                className="transition hover:text-sky-400"
                            >
                                About Us
                            </Link>

                            <Link
                                href="/contact"
                                className="transition hover:text-sky-400"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Products
                        </h3>

                        <div className="mt-5 flex flex-col gap-3">
                            <Link
                                href="/products"
                                className="transition hover:text-sky-400"
                            >
                                Split Air Conditioners
                            </Link>

                            <Link
                                href="/products"
                                className="transition hover:text-sky-400"
                            >
                                Inverter AC
                            </Link>

                            <Link
                                href="/products"
                                className="transition hover:text-sky-400"
                            >
                                Commercial AC
                            </Link>

                            <Link
                                href="/products"
                                className="transition hover:text-sky-400"
                            >
                                Accessories
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Contact Us
                        </h3>

                        <div className="mt-5 space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <Phone
                                    size={19}
                                    className="mt-0.5 shrink-0 text-sky-500"
                                />

                                <div>
                                    <p className="text-slate-400">Call us</p>
                                    <a
                                        href="tel:+94771234567"
                                        className="text-white transition hover:text-sky-400"
                                    >
                                        +94 77 123 4567
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail
                                    size={19}
                                    className="mt-0.5 shrink-0 text-sky-500"
                                />

                                <div>
                                    <p className="text-slate-400">Email</p>
                                    <a
                                        href="mailto:info@fntraders.lk"
                                        className="text-white transition hover:text-sky-400"
                                    >
                                        info@fntraders.lk
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={19}
                                    className="mt-0.5 shrink-0 text-sky-500"
                                />

                                <div>
                                    <p className="text-slate-400">Location</p>
                                    <p className="text-white">
                                        Sri Lanka
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} FN Traders. All rights reserved.
                    </p>

                    <div className="flex gap-5">
                        <Link
                            href="/privacy"
                            className="transition hover:text-sky-400"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-sky-400"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;