import axios from 'axios';

export type StockItem = {
    _id: string;
    name: string;
    brand: string;
    model_no: string;
    outOfStockCount: number;
    stock: number;
};

export type StockResponse = {
    success: boolean;
    productCount: number;
    totalStock: number;
    outOfStockCount: number;
    stocks: StockItem[];
};

export const fetchStocks = async (): Promise<StockResponse> => {
    const response = await axios.get<StockResponse>(
        '/api/products/stocks'
    );

    return response.data;
};