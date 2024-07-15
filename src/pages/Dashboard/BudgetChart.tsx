import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


interface BudgetChartProps{
  expenses: {category:string,amount:number}[];
}


const BudgetChart: React.FC<BudgetChartProps> = ({ expenses }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const budgetData = [
        { category: 'Rent', budget: 2000 },
        { category: 'Groceries', budget: 1000 },
        { category: 'Utilities', budget: 500 },
        { category: 'Entertainment', budget: 600 }
    ];

    useEffect(() => {
        if (canvasRef.current) {
            const remainingBudget=budgetData.map(budgetItem=>{
              const totalExpenses=expenses
              .filter(expense=>expense.category===budgetItem.category)
              .reduce((acc,expense)=>acc+expense.amount,0);
              return{
                category:budgetItem.category,
                remaining:budgetItem.budget-totalExpenses
              };
            });

            new Chart(canvasRef.current, {
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
    }, [expenses]);

    return <canvas style={{marginTop:'27%',marginBottom:'38%'}}  ref={canvasRef} />;
};

export default BudgetChart;
