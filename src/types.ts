// Produkt som den ser ut från API
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

//Svaret på login anrop
export interface LoginType {
    token: string;
    username: string;
}

//Formen på autentiseringstillståndet som delas via context
export interface AuthContextType {
    token: string | null;
    username: string | null;
    login: (token: string, username: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

//Data som skickas när en produklt skapas eller uppdateras
export interface ProductInput {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
}