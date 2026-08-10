export async function uploadProductImage(
    file: File
): Promise<string> {
    const formData = new FormData();

    formData.append('file', file);

    const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('IMAGE UPLOAD ERROR:', data);

        throw new Error(
            data.message || 'Image upload failed'
        );
    }

    return data.url;
}