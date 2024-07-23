import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, Typography } from '@mui/material';
import Chart from 'chart.js/auto';

const ExpensesChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<'bar', number[], string> | null>(null);
  const transactions = useSelector((state: RootState) => state.auth.currentUser?.transaction || []);

  const expenseData = transactions.filter(transaction => transaction.type === 'expense');

  const groupedData: { [key: string]: number } = {};

  expenseData.forEach((expense) => {
    const key = expense.category;
    if (!groupedData[key]) {
      groupedData[key] = 0;
    }
    groupedData[key] += expense.cost;
  });

  const labels = Object.keys(groupedData);
  const data = labels.map(label => groupedData[label]);
  const backgroundColors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'];

  useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Expenses',
            data: data,
            backgroundColor: backgroundColors.slice(0, labels.length),
            borderColor: backgroundColors.slice(0, labels.length),
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Expenses by Category',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [expenseData]);

  return (
    <Box sx={{ height: '400px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <canvas style={{ height: '70%', width: '70%' }} ref={canvasRef} />
      <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
        <Typography variant="h6">
          💸 Total Expenses: ₹{data.reduce((acc, expense) => acc + expense, 0)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ExpensesChart;
