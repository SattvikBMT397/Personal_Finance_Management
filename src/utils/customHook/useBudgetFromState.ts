// useBudgetFormState.ts

import { useState } from 'react';

const useBudgetFormState = () => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleAmountChange = (value: string) => {
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setAmount(value);
        }
    };

    const clearForm = () => {
        setCategory('');
        setAmount('');
        setEditIndex(null);
    };

    return {
        category,
        setCategory,
        amount,
        setAmount,
        editIndex,
        setEditIndex,
        handleAmountChange,
        clearForm,
    };
};

export default useBudgetFormState;
