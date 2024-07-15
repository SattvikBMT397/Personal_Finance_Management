// useBudgetOperations.ts

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBudget, editBudget, deleteBudget } from '../../redux/authSlice';

const useBudgetOperations = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [operationStatus, setOperationStatus] = useState<'add' | 'delete' | null>(null); // State to track operation status

    const handleAddBudget = (category: string, amount: string) => {
        setLoading(true);
        setTimeout(() => {
            dispatch(addBudget({ category, amount }));
            setOperationStatus('add'); // Set operation status to 'add' after successful addition
            setLoading(false);
        }, 1000);
    };

    const handleEditBudget = (index: number, category: string, amount: string) => {
        setLoading(true);
        setTimeout(() => {
            dispatch(editBudget({ index, category, amount }));
            setLoading(false);
        }, 1000);
    };

    const handleDeleteBudget = (index: number) => {
        setLoading(true);
        setTimeout(() => {
            dispatch(deleteBudget(index));
            setOperationStatus('delete'); // Set operation status to 'delete' after successful deletion
            setLoading(false);
        }, 1000);
    };

    const resetOperationStatus = () => {
        setOperationStatus(null);
    };

    return {
        loading,
        operationStatus,
        handleAddBudget,
        handleEditBudget,
        handleDeleteBudget,
        resetOperationStatus,
    };
};

export default useBudgetOperations;
