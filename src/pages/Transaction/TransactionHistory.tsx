import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import { format } from 'date-fns';
import { SelectChangeEvent } from '@mui/material/Select';
import NoTransactions from '../../components/NoTransation';
import LandingPage from '../../components/LandingPage';

const TransactionHistory: React.FC = () => {
    const transactions = useSelector((state: RootState) => state.auth.currentUser?.transaction || []);
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

    return (

       
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <LandingPage/>

            <div style={{ padding: '16px', width: '100%' }}>
                <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
                    Transaction History
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        mt: 2,
                    }}
                >
                    <TextField
                        label="Search by Category"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ backgroundColor: '#fff', borderRadius: 1, width: '70%' }}
                    />
                    <Box sx={{ minWidth: 120, margin: '16px 0', width: '70%' }}>
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

                    <Card sx={{ width: '70%', textAlign: 'center' }}>
                        <Grid container spacing={3}>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction, index) => (
                                    <Grid item xs={12} sm={12} md={12} key={index}>
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                padding: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                height: '100%',
                                                backgroundColor: transaction.type === 'income' ? '#E0F7FA' : '#FFEBEE',
                                                position: 'relative',
                                                borderRadius: 2,
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'scale(1.02)',
                                                },
                                            }}
                                        >
                                            <Box display="flex" alignItems="center" mb={2}>
                                                <Avatar sx={{ mr: '2%' }}>
                                                    {transaction.type === 'income' ? '+' : '-'}
                                                </Avatar>
                                                <Typography variant="h5" component="div">
                                                    {transaction.category}
                                                </Typography>
                                            </Box>

                                            <>
                                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                                                    {format(new Date(transaction.date), 'MMMM d, yyyy')}
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    component="div"
                                                    sx={{
                                                        mt: 2,
                                                        fontWeight: 'bold',
                                                        fontSize: { xs: '1.5rem', sm: '2rem' },
                                                        mr: { xs: '60%', sm: '-70%' }
                                                    }}
                                                >
                                                    ₹ {transaction.cost.toFixed(2)}
                                                </Typography>
                                            </>
                                        </Paper>
                                    </Grid>
                                ))
                            ) : (
                                <NoTransactions />
                            )}
                        </Grid>
                    </Card>
                </Box>
            </div>
        </Box>
    );
};

export default TransactionHistory;
