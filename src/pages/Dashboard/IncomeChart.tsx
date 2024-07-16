import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux'; // Import useSelector hook from react-redux
import { RootState } from '../../redux/store';


const IncomeChart: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart<"doughnut", number[], string> | null>(null);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser); // Access currentUser from Redux state
    const incomeTransactions = currentUser?.transaction?.filter(transaction => transaction.type === 'income') || [];
    const incomeData = incomeTransactions.map(transaction => transaction.cost);
    const totalIncome = incomeData.reduce((acc, income) => acc + income, 0);

    useEffect(() => {
        if (canvasRef.current) {
            // Destroy the previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new Chart(canvasRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['Salary', 'Investments', 'Other'],
                    datasets: [{
                        label: 'Income',
                        data: incomeData,
                        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
                    }],
                },
            });
        }
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [incomeData]);

    return (
        <div>
            <canvas  ref={canvasRef} />
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <h3>💸 Total Income : ₹{totalIncome} </h3>
            </div>
        </div>
    );
    
}

export default IncomeChart;
