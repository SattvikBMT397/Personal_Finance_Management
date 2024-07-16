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
export interface BudgetChartProps {
    expenses: {
        category: string,
        cost: number,
        date?: Date,
        type?: string
    }[];
}

export interface Expense {
    type?: string;
    category: string;
    cost: number;
    date?: Date;
}