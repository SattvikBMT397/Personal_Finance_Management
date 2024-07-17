import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Expense } from '../../utils/Interface/types';

const ExpensesChart: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    // Select transactions from the Redux store
    const transactions = useSelector((state: RootState) => state.auth.currentUser?.transaction || []);

    // Filter out only the transactions of type 'expense'
    const expenseTransactions = transactions.filter((transaction: Expense) => transaction.type === 'expense');

    const totalExpenses = expenseTransactions.reduce((acc, expense) => acc + (expense.cost || 0), 0);

    useEffect(() => {
        if (canvasRef.current) {
            // Destroy the previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const aggregatedExpenses: Expense[] = expenseTransactions.reduce((acc: Expense[], expense) => {
                const found = acc.find(item => item.category === expense.category);
                if (found) {
                    found.cost = (found.cost || 0) + (expense.cost || 0);
                } else {
                    acc.push({ type: expense.type, category: expense.category, cost: expense.cost || 0 });
                }
                return acc;
            }, []);

            const categories = aggregatedExpenses.map(expense => expense.category);
            const amounts = aggregatedExpenses.map(expense => expense.cost);

            // Create a new chart instance and store it in the ref
            chartRef.current = new Chart(canvasRef.current, {
                type: 'line',
                data: {
                    labels: categories,
                    datasets: [{
                        label: 'Expenses',
                        data: amounts,
                        borderColor: '#f44336',
                        backgroundColor: 'rgba(244, 67, 54, 0.2)',
                        fill: true,
                    }],
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Category',
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Amount',
                            },
                        },
                    },
                },
            });
        }
    }, [expenseTransactions]);

    return (
        <div style={{ height: '315px', width: '100%' }}>
            <canvas style={{ maxHeight: '100%', maxWidth: '100%',  marginTop:'100px'}} ref={canvasRef} />
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <div style={{ display: 'flex', alignItems: 'center',}}>
                    <h3 style={{ marginTop: '9px', marginLeft: '40px' }}>🧾Total Expenses: ₹{totalExpenses.toFixed(0)}</h3>
                </div>
            </div>
        </div>
    );
};

export default ExpensesChart;
