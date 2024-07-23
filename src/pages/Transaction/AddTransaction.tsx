import React from 'react';
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
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from '../../components/Logo/bb.jpg';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/authSlice';
import CommonSidebar from '../../components/commonComponent/commonSidebar';

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
  width: '50%',
  maxWidth: '600px',
  height: '40%',
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

const ResponsiveBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
}));

const incomeSubcategories = [
  { value: 'Monthly Salary', label: 'Monthly Salary', parentCategory: 'Other' },
  { value: 'Biweekly Salary', label: 'Biweekly Salary', parentCategory: 'Other' },
  { value: 'Online Freelance', label: 'Online Freelance', parentCategory: 'Other' },
  { value: 'Stock Investment', label: 'Stock Investment', parentCategory: 'Other' },
  { value: 'Rental Income', label: 'Rental Income', parentCategory: 'Other' },
  { value: 'Interest', label: 'Interest', parentCategory: 'Other' },
  { value: 'Dividends', label: 'Dividends', parentCategory: 'Other' },
  { value: 'Royalties', label: 'Royalties', parentCategory: 'Other' },
  { value: 'Bonus', label: 'Bonus', parentCategory: 'Other' },
  { value: 'Other Income', label: 'Other Income', parentCategory: 'Other' },
];

const expenseSubcategories = [
  { value: 'Men Clothing', label: 'Men Clothing', parentCategory: 'Clothing' },
  { value: 'Women Clothing', label: 'Women Clothing', parentCategory: 'Clothing' },
  { value: 'Groceries', label: 'Groceries', parentCategory: 'Food' },
  { value: 'Dining Out', label: 'Dining Out', parentCategory: 'Food' },
  { value: 'Movies', label: 'Movies', parentCategory: 'Entertainment' },
  { value: 'Concerts', label: 'Concerts', parentCategory: 'Entertainment' },
  { value: 'Games', label: 'Games', parentCategory: 'Entertainment' },
  { value: 'Utilities', label: 'Utilities', parentCategory: 'Other' },
  { value: 'Rent', label: 'Rent', parentCategory: 'Other' },
  { value: 'Mortgage', label: 'Mortgage', parentCategory: 'Other' },
  { value: 'Transportation', label: 'Transportation', parentCategory: 'Other' },
  { value: 'Insurance', label: 'Insurance', parentCategory: 'Other' },
  { value: 'Health & Medical', label: 'Health & Medical', parentCategory: 'Other' },
  { value: 'Education', label: 'Education', parentCategory: 'Other' },
  { value: 'Miscellaneous', label: 'Miscellaneous', parentCategory: 'Other' },
  { value: 'Gifts', label: 'Gifts', parentCategory: 'Other' },
  { value: 'Donations', label: 'Donations', parentCategory: 'Other' },
];

const AddTransaction: React.FC = () => {
  const [type, setType] = React.useState<string>('income');
  const [subcategory, setSubcategory] = React.useState<string>('');
  const [cost, setCost] = React.useState<number | ''>('');
  const [openSnackbar, setOpenSnackbar] = React.useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({ open: false, message: '', severity: 'error' });
  const dispatch = useDispatch();

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

    dispatch(
      addTransaction({
        type,
        category: selectedSubcategory.parentCategory,
        subcategory,
        cost: Number(cost),
        date: new Date(),
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
        <CommonSidebar />
      </SidebarContainer>
      <FormContainer onSubmit={handleSubmit}>
        <StyledTypography variant="h5" gutterBottom>
          Add Transaction
        </StyledTypography>
        <StyledPaper elevation={3}>
          <ResponsiveBox>
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={handleTypeChange}>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Subcategory</InputLabel>
              <Select value={subcategory} onChange={handleSubcategoryChange}>
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
            />
          </ResponsiveBox>
        </StyledPaper>
        <StyledButton type="submit" variant="contained" color="primary" sx={{ marginTop: '10px' }}>
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
