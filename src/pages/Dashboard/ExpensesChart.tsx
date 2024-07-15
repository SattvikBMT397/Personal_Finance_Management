import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { expenses } from '../../dummyData';
interface Expense {
    category: string;
    amount: number;
}

const ExpensesChart: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    useEffect(() => {
        if (canvasRef.current) {
            const aggregatedExpenses: Expense[] = expenses.reduce((acc: Expense[], expense) => {
                const found = acc.find(item => item.category === expense.category);
                if (found) {
                    found.amount += expense.amount;
                } else {
                    acc.push({ category: expense.category, amount: expense.amount });
                }
                return acc;
            }, []);

            const categories = aggregatedExpenses.map(expense => expense.category);
            const amounts = aggregatedExpenses.map(expense => expense.amount);

            new Chart(canvasRef.current, {
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
    }, []);

    return (
        <div >
            <canvas style={{marginTop:'27%'}} ref={canvasRef} />
            <div style={{ textAlign: 'center', marginTop: '29%'  }}>
                <h3>Total Expenses: ${totalExpenses}</h3>
            </div>
        </div>
    );
};

export default ExpensesChart;
