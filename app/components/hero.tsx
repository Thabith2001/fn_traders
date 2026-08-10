import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight, Phone} from 'lucide-react';
import {icons} from '@/data/links';

const Hero = () => {
    return (
        <section className="relative min-h-screen overflow-hidden bg-slate-50">

            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/hero.png"
                    alt="Modern air conditioned living room"
                    fill
                    priority
                    className="object-cover object-center opacity-150"
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-linear-to-r from-white via-white/30 to-transparent"/>
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pt-24 sm:px-6 lg:px-8">

                <div className="max-w-2xl">

                    {/* Heading */}
                    <h1 className="text-4xl font-bold leading-tight tracking-tight bg-linear-to-r from-slate-600 via-gray-900 bg-clip-text text-transparent sm:text-5xl lg:text-7xl">
                        Stay Cool.
                        <br/>

                        <span className="bg-linear-to-r from-sky-900 via-sky-600 to-sky-800 bg-clip-text text-transparent">
              Live Comfortably.
            </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-xl text-base leading-7   text-slate-600 mb-3">
                        Find reliable and energy-efficient air conditioners for your home
                        or business. <span className="font-medium text-sky-600 uppercase">
                        FN Traders
                    </span> brings you quality cooling solutions at
                        competitive prices.
                    </p>

                    {/* Benefits */}
                    {icons.map((icon, index) => {
                        const Icon = icon.icon;

                        return (
                            <div key={index} className="flex flex-wrap gap-5">
                                {icon.names.map((name, nameIndex) => (
                                    <div
                                        key={nameIndex}
                                        className="flex items-center gap-2 text-sm font-medium text-slate-700"
                                    >
                                        <Icon
                                            size={icon.size}
                                            className={icon.color}
                                        />

                                        <span>{name}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    })}

                    {/* Buttons */}
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                        <Link
                            href="/products"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-sky-800 px-7 py-3.5 font-semibold text-white shadow-lg shadow-sky-900/20 transition hover:bg-sky-700"
                        >
                            Shop Air Conditioners

                            <ArrowRight
                                size={19}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-7 py-3.5 font-semibold text-slate-800 backdrop-blur transition hover:border-sky-600 hover:text-sky-700"
                        >
                            <Phone size={18}/>

                            Get a Quote
                        </Link>
                    </div>

                    {/* Small trust text */}
                    <p className="mt-6 text-sm text-slate-500">
                        Cooling solutions for homes, offices and commercial spaces.
                    </p>

                </div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent"/>

        </section>
    );
};

export default Hero;