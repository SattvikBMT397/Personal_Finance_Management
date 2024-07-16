import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material';
import './RecentTransaction.css';
interface Transaction {
    type: string;
    category: string;
    cost: number;
    date: Date;
  }
const RecentTransaction: React.FC = () => {
    const transactions: Transaction[] = useSelector((state: RootState) => state.auth.currentUser?.transaction || []);

    return (
        <Paper className="transaction-paper">
            <List>
                {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                        <ListItem key={index} className="transaction-item">
                            <ListItemText
                                primary={`${transaction.category}: $${transaction.cost}`}
                                secondary={new Date(transaction.date).toLocaleDateString()}
                            />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body1" className="no-transactions">
                        No transactions available.
                    </Typography>
                )}
            </List>
        </Paper>
    );
};

export default RecentTransaction;
