import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const IncomeChart: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart<"doughnut", number[], string> | null>(null);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser); 
    const incomeTransactions = currentUser?.transaction?.filter(transaction => transaction.type === 'income') || [];

   
    const incomeData = incomeTransactions.reduce((acc, transaction) => {
        const category = transaction.category || 'Other'; 
        if (acc[category]) {
            acc[category] += transaction.cost;
        } else {
            acc[category] = transaction.cost;
        }
        return acc;
    }, {} as { [key: string]: number });

    const labels = Object.keys(incomeData);
    const data = labels.map(label => incomeData[label]);
    const backgroundColors = ['#4caf50', '#2196f3', '#ff9800', "#1C8E85", "#2ac4b8"]; 

    const totalIncome = data.reduce((acc, income) => acc + income, 0);

    useEffect(() => {
        if (canvasRef.current) {
          
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new Chart(canvasRef.current, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Income',
                        data: data,
                        backgroundColor: backgroundColors.slice(0, labels.length), // Ensure colors match the number of categories
                    }],
                },
            });
        }
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [incomeTransactions]); 

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <canvas style={{ height: '80%', width: '80%', margin: 'auto' }} ref={canvasRef} />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h3 style={{marginTop: "30px"}}>💸 Total Income : ₹{totalIncome} </h3>
            </div>
        </div>
    );
};

export default IncomeChart;
