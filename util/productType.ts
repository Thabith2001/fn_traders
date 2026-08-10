export type ProductType = {
    _id: string;

    name: string;

    product_highlight: string[];

    products_info: {
        label: string;
        value: string;
    }[];

    warranty: string;

    brand: string;

    model_no: string;

    images: string[];

    price: number;

    description: string;

    stock: number;

    isLatest: boolean;

    capacity: string;

    currency: string;

    createdAt?: string;

    updatedAt?: string;
};