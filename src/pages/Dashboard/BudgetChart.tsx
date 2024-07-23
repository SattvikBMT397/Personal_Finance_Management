import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { BudgetChartProps } from '../../utils/Interface/types';
import { categories } from '../../utils/categories/categories';
import { Box, Typography } from '@mui/material';

const BudgetChart: React.FC<BudgetChartProps> = ({ expenses }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const budgetData = useSelector((state: RootState) => state.auth.currentUser?.budget);
  const [totalBudget, setTotalBudget] = useState<number>(0);

  useEffect(() => {
    if (canvasRef.current && budgetData) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const remainingBudget = categories.map(category => {
        const budgetItem = budgetData.find(budgetItem => budgetItem.category === category.value);
        const totalExpenses = expenses
          .filter(expense => expense.category === category.value)
          .reduce((acc, expense) => acc + parseFloat(expense.cost.toString()), 0);
        return {
          category: category.label,
          remaining: budgetItem ? parseFloat(budgetItem.amount) - totalExpenses : 0
        };
      });

      const total = budgetData.reduce((acc, budgetItem) => acc + parseFloat(budgetItem.amount), 0);
      setTotalBudget(total);

      const predefinedColors = [
        'hsl(0, 100%, 75%)',
        'hsl(120, 100%, 75%)',
        'hsl(240, 100%, 75%)',
        'hsl(230, 100%, 75%)'
      ];

      const colors = remainingBudget.map((_, index) => predefinedColors[index % predefinedColors.length]);

      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: remainingBudget.map(item => item.category),
          datasets: [{
            label: 'Remaining Budget',
            data: remainingBudget.map(item => item.remaining),
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true
            }
          }
        }
      });
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [expenses, budgetData]);

  return (
    <Box sx={{ height: '400px', width: '100%' }}>
      <canvas style={{ maxHeight: '85%', maxWidth: '100%' }} ref={canvasRef} />
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mt: '3rem' }}>
         💰Total Budget: ₹{totalBudget.toFixed(0)}
        </Typography>
      </Box>
    </Box>
  );
};

export default BudgetChart;
