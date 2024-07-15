import React,{useEffect,useRef} from 'react'
import  Chart  from 'chart.js/auto'

const IncomeChart: React.FC = () => {
    const canvasRef=useRef<HTMLCanvasElement|null>(null);
    const incomeData=[6000,2000,1000];
    const totalIncome=incomeData.reduce((acc,income)=>acc+income,0);
    useEffect(()=>{
        if(canvasRef.current){
            new Chart(canvasRef.current,{
                type:'doughnut',
                data:{
                    labels:['Salary','Investments','Other'],
                    datasets:[{
                        label:'Income',
                        data:incomeData,
                        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
                        }],
                },
            });
        }
    },[]);
  return (<div>  
    <canvas ref={canvasRef}/>
   <div style={{textAlign:'center',marginTop:'10px'}}>
   <h3>Total Income : ${totalIncome} </h3>
   </div>
   </div>
  );
}

export default IncomeChart;



