import { Plus, Trash2 } from 'lucide-react';

export interface Specification {
    label: string;
    value: string;
}

interface Props {
    specs: Specification[];

    setSpecs: React.Dispatch<
        React.SetStateAction<Specification[]>
    >;
}

export default function ProductSpecifications({
                                                  specs,
                                                  setSpecs,
                                              }: Props) {

    const addSpec = () => {
        setSpecs((previous) => [
            ...previous,
            {
                label: '',
                value: '',
            },
        ]);
    };

    const removeSpec = (index: number) => {
        setSpecs((previous) =>
            previous.filter((_, i) => i !== index)
        );
    };

    const updateSpec = (
        index: number,
        field: keyof Specification,
        value: string
    ) => {
        setSpecs((previous) =>
            previous.map((spec, i) =>
                i === index
                    ? {
                        ...spec,
                        [field]: value,
                    }
                    : spec
            )
        );
    };

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

                <div>
                    <h2 className="font-semibold text-slate-900">
                        Specifications
                    </h2>

                    <p className="text-sm text-slate-500">
                        Add technical product information.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={addSpec}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-50 px-3 py-2 text-sm font-medium text-sky-600 hover:bg-sky-100"
                >
                    <Plus size={16} />

                    Add
                </button>

            </div>

            <div className="space-y-3">

                {specs.map((spec, index) => (
                    <div
                        key={index}
                        className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
                    >

                        <input
                            type="text"
                            placeholder="Label e.g. Cooling Type"
                            value={spec.label}
                            onChange={(event) =>
                                updateSpec(
                                    index,
                                    'label',
                                    event.target.value
                                )
                            }
                            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                        />

                        <input
                            type="text"
                            placeholder="Value e.g. Inverter"
                            value={spec.value}
                            onChange={(event) =>
                                updateSpec(
                                    index,
                                    'value',
                                    event.target.value
                                )
                            }
                            className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-sky-100"
                        />

                        {specs.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeSpec(index)}
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