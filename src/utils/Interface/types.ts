export interface UserData {
    id?: string;
    name?: string;
    email: string;
    password: string;
    budget?: {
        category: string;
        amount: string;
    }[];
    transaction?: {
        type: string;
        category: string;
        cost: number;
        date: Date;
    }[];
    expenses?: {
        category: string;
        amount: string;
        date?: Date;
    }[];
}
