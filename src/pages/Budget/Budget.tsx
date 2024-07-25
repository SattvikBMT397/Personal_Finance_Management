import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Alert } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import backgroundImage from '../../components/Logo/bb.jpg';
import { RootState } from '../../redux/store';
import { categories } from '../../utils/categories/categories';
import useBudgetFormState from '../../utils/customHook/useBudgetFromState';
import useBudgetOperations from '../../utils/customHook/useBudgetOperations';
import CommonButton from '../../components/commonComponent/commonButton';
import LandingPage from '../../components/LandingPage';

const AddToBudgetPage: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const userBudget = currentUser?.budget || [];
    const {
        category,
        setCategory,
        amount,
        setAmount,
        editIndex,
        setEditIndex,
        handleAmountChange,
        clearForm,
    } = useBudgetFormState();
    const { loading, operationStatus, handleAddBudget, handleEditBudget, handleDeleteBudget, resetOperationStatus } = useBudgetOperations();
    const [openToast, setOpenToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState('');
    const [toastSeverity, setToastSeverity] = React.useState<'success' | 'error'>('success');

    React.useEffect(() => {
        if (!currentUser) {
            setToastMessage('Please login to access budget functionality.');
            setToastSeverity('error');
            setOpenToast(true);
        } else if (operationStatus === 'add') {
            setToastMessage('Budget added successfully!');
            setToastSeverity('success');
            setOpenToast(true);
            clearForm();
        } else if (operationStatus === 'delete') {
            setToastMessage('Budget deleted successfully!');
            setToastSeverity('success');
            setOpenToast(true);
        }
    }, [currentUser, operationStatus]);

    const handleToastClose = () => {
        setOpenToast(false);
        resetOperationStatus();
    };

    const handleAddButtonClick = () => {
        if (!category || !amount) {
            setToastMessage('Please fill in all fields.');
            setToastSeverity('error');
            setOpenToast(true);
            return;
        }

        handleAddBudget(category, amount);
    };

    const handleEditButtonClick = () => {
        if (!category || !amount) {
            setToastMessage('Please fill in all fields.');
            setToastSeverity('error');
            setOpenToast(true);
            return;
        }

        handleEditBudget(editIndex!, category, amount);
        setEditIndex(null); // Clear editIndex after editing
        clearForm(); // Clear form fields
    };

    return (
        <>
            <LandingPage />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'fit',
                    backgroundPosition: 'center',
                    padding: 2,
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Snackbar
                        open={openToast}
                        autoHideDuration={5000}
                        onClose={handleToastClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert onClose={handleToastClose} severity={toastSeverity} sx={{ width: '100%' }}>
                            {toastMessage}
                        </Alert>
                    </Snackbar>
                    <Box
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            marginTop: '10px',
                            backdropFilter: 'blur(30px)',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            maxWidth: '600px',
                            width: '90%',
                            padding: '20px',
                            maxHeight: '80vh',
                            overflowY: 'auto',
                            border: '1px solid black',
                        }}
                    >
                        <Typography variant="h4" align="center" gutterBottom sx={{ fontStyle: 'italic', color: '#000' }}>
                            💰 Add To Wallet
                        </Typography>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as string)}
                            fullWidth
                            variant="outlined"
                            displayEmpty
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="" disabled>
                                Select Category
                            </MenuItem>
                            {categories.map((cat) => (
                                <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                            ))}
                        </Select>
                        <TextField
                            label="Amount"
                            variant="outlined"
                            type="text"
                            value={amount}
                            onChange={(e) => handleAmountChange(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            inputProps={{ inputMode: 'numeric', pattern: '^\\d*\\.?\\d{0,2}$' }}
                        />
                        {editIndex !== null ? (
                            <CommonButton
                                onClick={handleEditButtonClick}
                                disabled={!currentUser || loading}
                                loading={loading}
                            >
                                Save
                            </CommonButton>
                        ) : (
                            <CommonButton
                                onClick={handleAddButtonClick}
                                startIcon={<AddCircleIcon />}
                                disabled={!currentUser || loading}
                                loading={loading}
                            >
                                Add Wallet
                            </CommonButton>
                        )}
                        <Box sx={{ maxHeight: 'calc(80vh - 300px)', overflowY: 'auto', marginTop: '10px' }}>
                            {userBudget.map((budgetItem, index) => (
                                <Card key={index} sx={{ mb: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '2px solid #1C8E85' }}>
                                    <CardContent>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="h6" gutterBottom>
                                                    {budgetItem.category}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    Amount: ₹{budgetItem.amount}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Tooltip title="Edit">
                                                    <IconButton onClick={() => {
                                                        setEditIndex(index); // Set editIndex on click
                                                        setCategory(budgetItem.category); // Populate category for editing
                                                        setAmount(budgetItem.amount); // Populate amount for editing
                                                    }} disabled={!currentUser}>
                                                        <EditIcon sx={{ color: 'black' }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleDeleteBudget(index)} disabled={!currentUser}>
                                                        <DeleteIcon sx={{ color: '#D11A2A' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AddToBudgetPage;
