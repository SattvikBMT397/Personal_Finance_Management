import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { BudgetChartProps } from '../../utils/Interface/types';
import { categories } from '../../utils/categories/categories';

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

      // Calculate total budget
      const total = budgetData.reduce((acc, budgetItem) => acc + parseFloat(budgetItem.amount), 0);
      setTotalBudget(total);

      // Generate a color for each category
      const colors = remainingBudget.map(() => `hsl(${Math.random() * 360}, 100%, 75%)`);

      // Create a new Chart instance with updated data
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
    <div style={{ height: '315px', width: '100%', marginTop:'100px' }}>
      <canvas style={{ maxHeight: '100%', maxWidth: '100%' }} ref={canvasRef} />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ marginTop: '10px', marginLeft: '20px' }}>💰Total Budget: ₹{totalBudget.toFixed(0)}</h3>
        </div>
      </div>
    </div>
  );
};

export default BudgetChart;