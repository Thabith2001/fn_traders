import axios from 'axios';
import { ProductType } from '@/util/productType';

type ProductsResponse = {
    success: boolean;
    products: ProductType[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};


export const fetchLatestProducts = async (): Promise<ProductType[]> => {
    const response = await axios.get<ProductsResponse>(
        '/api/products?page=1&limit=3'
    );

    return response.data.products ?? [];
};

export const fetchProducts = async (
    page = 1,
    limit = 6,
    search = '',
    category = 'All',
    brand = 'All'
): Promise<ProductsResponse> => {
    const response = await axios.get<ProductsResponse>(
        '/api/products',
        {
            params: {
                page,
                limit,
                search,
                category,
                brand,
            },
        }
    );

    return response.data;
};

