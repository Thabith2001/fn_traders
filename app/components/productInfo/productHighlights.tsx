import { Plus, Trash2 } from 'lucide-react';

interface ProductHighlightsProps {
    highlights: string[];
    setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProductHighlights({
                                              highlights,
                                              setHighlights,
                                          }: ProductHighlightsProps) {

    const addHighlight = () => {
        setHighlights((previous) => [...previous, '']);
    };

    const removeHighlight = (index: number) => {
        setHighlights((previous) =>
            previous.filter((_, i) => i !== index)
        );
    };

    const updateHighlight = (
        index: number,
        value: string
    ) => {
        setHighlights((previous) =>
            previous.map((highlight, i) =>
                i === index ? value : highlight
            )
        );
    };

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-slate-900">
                        Product Highlights
                    </h2>

                    <p className="text-sm text-slate-500">
                        Key selling points shown on the product page.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={addHighlight}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2 text-sm font-medium text-sky-600 hover:bg-sky-100"
                >
                    <Plus size={16} />
                    Add
                </button>
            </div>

            <div className="space-y-3">

                {highlights.map((highlight, index) => (
                    <div
                        key={index}
                        className="flex gap-3"
                    >

                        <input
                            type="text"
                            value={highlight}
                            onChange={(event) =>
                                updateHighlight(
                                    index,
                                    event.target.value
                                )
                            }
                            placeholder="e.g. Inverter Technology"
                            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                        />

                        {highlights.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeHighlight(index)}
                                className="rounded-xl border border-red-100 px-3 text-red-500 hover:bg-red-50"
                            >
                                <Trash2 size={17} />
                            </button>
                        )}

                    </div>
                ))}

            </div>
        </section>
    );
}