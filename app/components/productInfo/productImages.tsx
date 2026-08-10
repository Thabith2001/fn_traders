import { ImagePlus } from 'lucide-react';

interface Props {
    selectedFiles: File[];

    setSelectedFiles: React.Dispatch<
        React.SetStateAction<File[]>
    >;
}

export default function ProductImages({
                                          selectedFiles,
                                          setSelectedFiles,
                                      }: Props) {

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;

        if (!files) return;

        const fileArray = Array.from(files);

        if (fileArray.length > 3) {
            alert('Maximum 3 images allowed');

            return;
        }

        setSelectedFiles(fileArray);
    };

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-1 font-semibold text-slate-900">
                Product Images
            </h2>

            <p className="mb-5 text-sm text-slate-500">
                Upload up to 3 product images.
            </p>

            <label className="flex min-h-55 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">

                <ImagePlus
                    className="mb-3 text-sky-600"
                    size={30}
                />

                <p className="text-sm font-semibold">
                    Select product images
                </p>

                <p className="mt-1 text-xs text-slate-400">
                    PNG, JPG or WEBP
                </p>

                <input
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                />

            </label>

            {selectedFiles.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm text-slate-500">
                        {selectedFiles.length} image(s) selected
                    </p>
                </div>
            )}

        </section>
    );
}