import axios from 'axios';

type LoginResponse = {
    success: boolean;
    message: string;
};


export const adminLogin = async (
    email: string,
    password: string

): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
        '/api/admin/login',{email,password}
    );

    return response.data;
};

export const adminLogout = async (): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
        '/api/admin/logout'
    );

    return response.data;
};

