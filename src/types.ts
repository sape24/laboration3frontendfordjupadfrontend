export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginType {
    token: string;
    username: string;
}

export interface AuthContextType {
    token: string | null;
    username: string | null;
    login: (token: string, username: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
}