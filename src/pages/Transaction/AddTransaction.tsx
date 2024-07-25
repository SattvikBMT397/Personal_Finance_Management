import React, { } from 'react';
import {
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Box,
  Snackbar,
  Alert,
  useMediaQuery,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from '../../components/Logo/bb.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../redux/authSlice';
import LandingPage from '../../components/LandingPage';
import { expenseSubcategories, incomeSubcategories } from '../../utils/categories/categories';
import { RootState } from '../../redux/store'; // Adjust the path as per your actual store location

const theme = createTheme({
  palette: {
    primary: { main: '#1976D2' },
    secondary: { main: '#DC004E', dark: '#9A0036' },
  },
  typography: {
    fontFamily: 'italic',
    h4: { fontSize: '2rem' },
    h5: { fontSize: '1.5rem' },
    h6: { fontSize: '1.25rem' },
  },
});

const FullWidthBackground = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${background})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  zIndex: -1,
});

const FormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  position: 'absolute',
  overflow: 'hidden',
  width: '80%',
  maxWidth: '600px',
  height: 'auto',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid black',
  zIndex: 1,
  margin: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  color: '#000',
}));

const StyledButton = styled(Button)(({ theme, disabled }) => ({
  backgroundColor: disabled ? theme.palette.grey[400] : '#1C8E85',
  '&:hover': { backgroundColor: disabled ? theme.palette.grey[400] : '#2AC4B8' },
}));

const SidebarContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: '-1px',
  left: '1rem',
  backgroundColor: '#fff',
  padding: '1rem',
  zIndex: 1000,
  borderRadius: theme.shape.borderRadius,
}));

const AddTransaction: React.FC = () => {
  const [type, setType] = React.useState<string>('income');
  const [subcategory, setSubcategory] = React.useState<string>('');
  const [cost, setCost] = React.useState<number | ''>('');
  const [date, setDate] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({ open: false, message: '', severity: 'error' });
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.auth.currentUser?.transaction || []);
  const expenses = transactions.filter(transaction => transaction.type === 'expense');
  const budgetData = useSelector((state: RootState) => state.auth.currentUser?.budget);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
    setSubcategory('');
  };

  const handleSubcategoryChange = (event: SelectChangeEvent<string>) => {
    setSubcategory(event.target.value);
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCost(parseFloat(event.target.value));
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const checkBudgetExceeded = (cost: number) => {
    if (budgetData) {
      const selectedSubcategory = expenseSubcategories.find((sub) => sub.value === subcategory);
      if (selectedSubcategory) {
        const categoryBudget = budgetData.find((budgetItem) => budgetItem.category === selectedSubcategory.parentCategory);
        const totalExpenses = expenses
          .filter((expense) => expense.category === selectedSubcategory.parentCategory)
          .reduce((acc, expense) => acc + parseFloat(expense.cost.toString()), 0);
        if (categoryBudget && (totalExpenses + cost) > parseFloat(categoryBudget.amount)) {
          return true;
        }
      }
    }
    return false;
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!subcategory || cost === '') {
      setOpenSnackbar({ open: true, message: 'Please fill in all fields.', severity: 'error' });
      return;
    }

    const selectedSubcategory = type === 'income'
      ? incomeSubcategories.find((sub) => sub.value === subcategory)
      : expenseSubcategories.find((sub) => sub.value === subcategory);

    if (!selectedSubcategory) {
      setOpenSnackbar({ open: true, message: 'Invalid subcategory.', severity: 'error' });
      return;
    }
    if (type === 'expense' && (!budgetData || budgetData.length === 0)) {
      setOpenSnackbar({ open: true, message: 'You have not set a budget yet.', severity: 'error' });
      return;
    }
    if (Number(cost) < 0) {
      setOpenSnackbar({ open: true, message: 'Cost cannot be negative.', severity: 'error' });
      return;
    }
    if (type === 'expense' && checkBudgetExceeded(Number(cost))) {
      setOpenSnackbar({ open: true, message: 'Expense exceeds budget for this category.', severity: 'error' });
      dispatch(
        addTransaction({
          type,
          category: selectedSubcategory.parentCategory,
          subcategory,
          cost,
          date: new Date(),
        })
      );
      return;
    }

    dispatch(
      addTransaction({
        type,
        category: selectedSubcategory.parentCategory,
        subcategory,
        cost: Number(cost),
        date: new Date(date),
      })
    );

    setType('income');
    setSubcategory('');
    setCost('');
    setOpenSnackbar({ open: true, message: 'Successfully submitted!', severity: 'success' });
  };

  const currentSubcategories = type === 'income' ? incomeSubcategories : expenseSubcategories;

  return (
    <ThemeProvider theme={theme}>
      <FullWidthBackground />
      <SidebarContainer>
        <LandingPage />
      </SidebarContainer>
      <FormContainer
        onSubmit={handleSubmit}
        style={{
          width: isSmallScreen ? '90%' : '50%',
          padding: isSmallScreen ? theme.spacing(2) : theme.spacing(3),
        }}
      >
        <StyledTypography variant="h5" gutterBottom>
          Add Transaction
        </StyledTypography>
        <StyledPaper elevation={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel> Select Type...</InputLabel>
              <Select value={type} onChange={handleTypeChange} label="Select Type...">
                <MenuItem value="">
                  <em>Select Category...</em>
                </MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Category...</InputLabel>
              <Select
                value={subcategory}
                onChange={handleSubcategoryChange}
                label="Select Category..."
              >
                <MenuItem value="">
                  <em>Select Category...</em>
                </MenuItem>
                {currentSubcategories.map((subcat) => (
                  <MenuItem key={subcat.value} value={subcat.value}>
                    {subcat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Cost"
              value={cost}
              onChange={handleCostChange}
              fullWidth
              margin="normal"
              type="number"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Date"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={date}
              onChange={handleDateChange}
            />
          </Box>
        </StyledPaper>
        <StyledButton type="submit" variant="contained" color="primary" sx={{ marginTop: '10px', width: "100%" }}>
          Add Transaction
        </StyledButton>
        <Snackbar
          open={openSnackbar.open}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpenSnackbar((prev) => ({ ...prev, open: false }))} severity={openSnackbar.severity}>
            {openSnackbar.message}
          </Alert>
        </Snackbar>
      </FormContainer>
    </ThemeProvider>
  );
};

export default AddTransaction;
