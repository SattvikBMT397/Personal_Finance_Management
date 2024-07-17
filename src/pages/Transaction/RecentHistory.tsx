import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { SelectChangeEvent } from '@mui/material/Select';
import { deleteTransaction } from '../../redux/authSlice';

const TransactionHistory: React.FC = () => {
    const transactions = useSelector((state: RootState) => state.auth.currentUser?.transaction || []);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const filteredTransactions = transactions.filter(transaction => {
        const matchesFilterType = filterType === 'all' || transaction.type === filterType;
        const matchesSearchTerm = transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilterType && matchesSearchTerm;
    });

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setFilterType(event.target.value as string);
    };

    const handleDelete = (index: number) => {
        dispatch(deleteTransaction(index));
    };

    return (
        <div style={{ padding: '16px' }}>
         
            <TextField
                label="Search by Category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
            />
            <Box sx={{ minWidth: 120, margin: '16px 0' }}>
                <FormControl fullWidth>
                    <InputLabel id="transaction-filter-label">Filter</InputLabel>
                    <Select
                        labelId="transaction-filter-label"
                        value={filterType}
                        onChange={handleFilterChange}
                        label="Filter"
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={3}>
                {filteredTransactions.map((transaction, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper 
                            elevation={3} 
                            sx={{
                                padding: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                backgroundColor: transaction.type === 'income' ? '#e0f7fa' : '#ffebee',
                                position: 'relative',
                                borderRadius: 2,
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },
                            }}
                        >
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ bgcolor: transaction.type === 'income' ? '#00bfa5' : '#c62828', mr: 2 }}>
                                    {transaction.type === 'income' ? '+' : '-'}
                                </Avatar>
                                <Typography variant="h6" component="div">
                                    {transaction.category}
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" color="textSecondary">
                                {format(new Date(transaction.date), 'MMMM d, yyyy')}
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
                                ₹{transaction.cost.toFixed(2)}
                            </Typography>
                            <IconButton 
                                aria-label="delete" 
                                onClick={() => handleDelete(index)} 
                                sx={{ position: 'absolute', top: 8, right: 8, color: '#dc143c' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TransactionHistory;
