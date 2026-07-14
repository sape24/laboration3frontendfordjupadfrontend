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

export interface Login {
    token: string;
    username: string;
}