'use client';

import { CldImage } from 'next-cloudinary';
import { useEffect, useState } from 'react';

type ProductGalleryProps = {
    images: string[];
    productName: string;
    isLatest?: boolean;
};

const ProductGallery = ({
                            images,
                            productName,
                            isLatest = false,
                        }: ProductGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(
        images[0] || ''
    );

    useEffect(() => {
        if (images.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedImage(images[0]);
        }
    }, [images]);

    return (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

            {/* Latest Ribbon */}
            {isLatest && (
                <div className="absolute -left-11 top-6 z-20 w-40 -rotate-45 bg-red-700 py-2 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    New
                </div>
            )}

            {/* Main Image */}
            <div className="flex min-h-100 items-center justify-center rounded-2xl bg-linear-to-b from-sky-50 to-white p-6">
                {selectedImage ? (
                    <CldImage
                        src={selectedImage}
                        alt={productName}
                        width={700}
                        height={500}
                        loading="eager"
                        className="max-h-105 w-full object-contain transition-all duration-300"
                    />
                ) : (
                    <p className="text-sm text-slate-400">
                        No image available
                    </p>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {images.slice(0, 3).map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            onClick={() => setSelectedImage(image)}
                            className={`cursor-pointer rounded-xl border p-3 transition ${
                                selectedImage === image
                                    ? 'border-sky-700 bg-sky-50 ring-2 ring-sky-100'
                                    : 'border-slate-200 bg-white hover:border-sky-400'
                            }`}
                        >
                            <CldImage
                                src={image}
                                alt={`${productName} ${index + 1}`}
                                width={200}
                                height={150}
                                loading="lazy"
                                className="h-24 w-full object-contain"
                            />
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
};

export default ProductGallery;