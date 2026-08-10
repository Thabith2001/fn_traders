'use client';

import {useState} from 'react';
import Link from 'next/link';
import {ArrowLeft, Save} from 'lucide-react';

import ProductInformation from '@/app/components/productInfo/ProductInformation';
import ProductHighlights from '@/app/components/productInfo/productHighlights';
import ProductSpecifications from '@/app/components/productInfo/productSpecifications';
import ProductImages from '@/app/components/productInfo/productImages';
import ProductStatus from '@/app/components/productInfo/productStatus';

import {uploadProductImage} from '@/service/imageService';

export default function AddProductPage() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [saving, setSaving] = useState(false);

    const [highlights, setHighlights] = useState<string[]>(['']);

    const [specs, setSpecs] = useState([
        {
            label: '',
            value: '',
        },
    ]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const form = event.currentTarget;

        try {
            setSaving(true);

            const formData = new FormData(form);

            const name = String(formData.get('name'));
            const modelNo = String(formData.get('model_no'));
            const brand = String(formData.get('brand'));
            const category = String(formData.get('category'));
            const warranty = String(formData.get('warranty'));
            const capacity = String(formData.get('capacity'));

            const price = Number(
                formData.get('price')
            );

            const stock = Number(
                formData.get('stock')
            );

            const description = String(
                formData.get('description')
            );

            /*
             * 1. Check product
             */
            const checkResponse = await fetch(
                `/api/products/check?model_no=${encodeURIComponent(
                    modelNo
                )}`
            );

            if (!checkResponse.ok) {
                throw new Error(
                    'Failed to check product'
                );
            }

            const checkData =
                await checkResponse.json();

            /*
             * 2. Existing product
             */
            if (checkData.exists) {
                const stockResponse = await fetch('/api/products/stocks', {
                    method: 'PATCH',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        productId: checkData.product._id,
                        quantity: stock,
                    }),
                });

                if (!stockResponse.ok) {
                    throw new Error(
                        'Failed to update stock'
                    );
                }

                alert(
                    'Product already exists. Stock updated successfully.'
                );

                form.reset();

                setSelectedFiles([]);
                setHighlights(['']);

                setSpecs([
                    {
                        label: '',
                        value: '',
                    },
                ]);

                return;
            }

            /*
             * 3. New product
             */
            if (selectedFiles.length === 0) {
                alert(
                    'Please select at least one product image.'
                );

                return;
            }

            /*
             * 4. Upload images
             */
            const uploadedImages: string[] = [];

            for (const file of selectedFiles) {
                const url =
                    await uploadProductImage(file);

                uploadedImages.push(url);
            }

            /*
             * 5. Build product
             */
            const product = {
                name,
                model_no: modelNo,
                brand,
                category,
                price,
                stock,
                warranty,
                capacity,
                description,

                images: uploadedImages,

                product_highlight:
                    highlights.filter(
                        (highlight) =>
                            highlight.trim() !== ''
                    ),

                products_info:
                    specs.filter(
                        (spec) =>
                            spec.label.trim() !== '' &&
                            spec.value.trim() !== ''
                    ),

                status:
                    formData.get('status') ===
                    'true',

                featured:
                    formData.get('isLatest') ===
                    'true',
            };

            /*
             * 6. Create product
             */
            const createResponse = await fetch(
                '/api/products',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',
                    },

                    body: JSON.stringify(product),
                }
            );

            if (!createResponse.ok) {
                throw new Error(
                    'Failed to create product'
                );
            }

            alert(
                'New product added successfully.'
            );

            form.reset();

            setSelectedFiles([]);
            setHighlights(['']);

            setSpecs([
                {
                    label: '',
                    value: '',
                },
            ]);

        } catch (error) {
            console.error(
                'SAVE PRODUCT ERROR:',
                error
            );

            alert(
                'Failed to save product.'
            );

        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin/products"
                        className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-600"
                    >
                        <ArrowLeft size={17}/>

                        Back to Products
                    </Link>

                    <h1 className="text-3xl font-bold text-slate-900">
                        Add Product
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Add a new air conditioner or update existing stock.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-6 lg:grid-cols-[1fr_360px]"
                >

                    {/* Left */}
                    <div className="space-y-6">

                        <ProductInformation/>

                        <ProductHighlights
                            highlights={highlights}
                            setHighlights={setHighlights}
                        />

                        <ProductSpecifications
                            specs={specs}
                            setSpecs={setSpecs}
                        />

                    </div>

                    {/* Right */}
                    <div className="space-y-6">

                        <ProductImages
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                        />

                        <ProductStatus/>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            <Save size={18}/>

                            {saving ? 'Saving...' : 'Save Product'}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}