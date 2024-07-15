import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface BudgetChartProps {
  expenses: { category: string, amount: string }[];
}

const BudgetChart: React.FC<BudgetChartProps> = ({ expenses }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null); // Ref to store the chart instance
  const budgetData = useSelector((state: RootState) => state.auth.currentUser?.budget);

  useEffect(() => {
    if (canvasRef.current && budgetData) {
      // Destroy the previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const remainingBudget = budgetData.map(budgetItem => {
        const totalExpenses = expenses
          .filter(expense => expense.category === budgetItem.category)
          .reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
        return {
          category: budgetItem.category,
          remaining: parseFloat(budgetItem.amount) - totalExpenses
        };
      });

      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: remainingBudget.map(item => item.category),
          datasets: [{
            label: 'Remaining Budget',
            data: remainingBudget.map(item => item.remaining),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true
            }
          }
        }
      });
    }
    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [expenses, budgetData]);

  return <canvas style={{ marginTop: '27%', marginBottom: '38%' }} ref={canvasRef} />;
};

export default BudgetChart;
