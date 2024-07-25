import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, Typography } from '@mui/material';

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

    // Define a smaller set of colors
    const backgroundColors = ['#1C8E85', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#FF5722'];

    const totalIncome = data.reduce((acc, income) => acc + income, 0);

    useEffect(() => {
        if (canvasRef.current) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(canvasRef.current, {
                type: 'doughnut',
                data: {
                    labels: labels.length > 0 ? labels : ['No Data'],
                    datasets: [{
                        label: 'Income',
                        data: labels.length > 0 ? data : [1], // Dummy data to show a pie chart when there's no real data
                        backgroundColor: backgroundColors.slice(0, labels.length > 0 ? labels.length : 1),
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: labels.length > 0,
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    if (labels.length === 0) {
                                        return 'No data available';
                                    }
                                    return `${context.label}: ₹${context.raw}`;
                                }
                            }
                        }
                    },
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
        <Box sx={{ height: '400px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <canvas style={{ height: '70%', width: '70%' }} ref={canvasRef} />
            <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
                <Typography variant="h6">
                    Total Income : ₹{totalIncome || 0}
                </Typography>
            </Box>
        </Box>
    );
};

export default IncomeChart;
