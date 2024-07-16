import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IncomeChart from './IncomeChart';
import ExpensesChart from './ExpensesChart';
import BudgetChart from './BudgetChart';
import { expenses } from '../Dashboard/dummyData';
import './Dashboard.css';
import RecentTransaction from './RecentTransaction';

const Dashboard: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showMenuIcon, setShowMenuIcon] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setShowMenuIcon(!isOpen);
    }, [isOpen]);
    const convertedExpenses = expenses.map(expense => ({
        ...expense,
        amount: expense.amount.toString()
    }));
    return (
        <Grid container className="dashboard-container">
            <Grid item xs={isOpen ? 3 : 'auto'}>
                <Sidebar isOpen={isOpen} onClose={toggleSidebar} />
            </Grid>
            <Grid item xs={isOpen ? 9 : 12} className="dashboard-main">
                <div className="header">
                    {showMenuIcon && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleSidebar}
                            edge="start"
                            sx={{ fontSize: '2rem', padding: '10px' }}
                        >
                            <MenuIcon sx={{ fontSize: 'inherit' }} />
                        </IconButton>
                    )}
                    <h1 className="dashboard-title">Dashboard</h1>
                </div>

                <Grid container spacing={3} className="dashboard-content">
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className="chart-paper">
                            <h2>Income</h2>
                            <IncomeChart />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className="chart-paper">
                            <h2>Expenses</h2>
                            <ExpensesChart />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className="chart-paper">
                            <h2>Budget</h2>
                            <BudgetChart expenses={convertedExpenses} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className="chart-paper">
                            <h2>Recent Transactions</h2>
                            <RecentTransaction/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
