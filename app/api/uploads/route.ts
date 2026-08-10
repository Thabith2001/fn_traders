import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudnary';

export const runtime = 'nodejs';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const file = formData.get('file');

        if (!(file instanceof File)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'No image provided',
                },
                {
                    status: 400,
                }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        console.log('Image size:', file.size);
        console.log('Image type:', file.type);

        const result = await new Promise<{
            secure_url: string;
            public_id: string;
        }>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: 'fn_traders/products',
                        resource_type: 'image',
                        timeout: 120000,
                    },
                    (error, result) => {
                        if (error) {
                            console.error(
                                'CLOUDINARY ERROR:',
                                error
                            );

                            reject(error);
                            return;
                        }

                        if (!result) {
                            reject(
                                new Error(
                                    'Cloudinary returned no result'
                                )
                            );

                            return;
                        }

                        resolve({
                            secure_url: result.secure_url,
                            public_id: result.public_id,
                        });
                    }
                )
                .end(buffer);

        });

        return NextResponse.json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        });

    } catch (error) {
        console.error('UPLOAD ERROR:', error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Image upload failed',
            },
            {
                status: 500,
            }
        );
    }
}