import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from '../../components/Logo/bg.jpg';
import { useDispatch } from 'react-redux';
import { addTranscation } from '../../redux/authSlice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
      dark: '#9a0036',
    },
  },
  typography: {
    fontFamily: 'italic',
    h4: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    h6: {
      fontSize: '1.25rem',
    },
  },
});

const FullWidthBackground = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: -1,
});

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  width: '50%',
  maxWidth: '600px',
  height: '40%',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
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

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1C8E85",
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const categories = {
  expense: ['Rent', 'Groceries', 'Utilities', 'Transportation', 'Entertainment'] as const,
  income: ['Salary', 'Freelance', 'Investments', 'Gifts', 'Other'] as const,
};

type CategoryType = keyof typeof categories;

const AddTransaction = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState('');
  const [type, setType] = React.useState<CategoryType>('expense');
  const [cost, setCost] = React.useState('');
  const [date, setDate] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value as string);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value as CategoryType);
    setCategory(''); 
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCost(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSubmit= () => {
    const transaction = {
      type,
      category,
      cost: parseFloat(cost),
      date: new Date(date), 
    };
    dispatch(addTranscation(transaction));
    setSnackbarMessage('Transaction added successfully!');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <FullWidthBackground />
      <StyledContainer>
        <StyledTypography variant="h4" gutterBottom>
          Add Transaction
        </StyledTypography>
        <StyledTypography variant="h6" gutterBottom>
          How Much?
        </StyledTypography>
        <StyledTypography variant="h5" gutterBottom>
          $0.00 {/* Replace this with your logic to show total amount */}
        </StyledTypography>
        <StyledPaper elevation={3}>
          <InputLabel>Type</InputLabel>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select value={type} onChange={handleTypeChange}>
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </Select>
          </FormControl>
          <InputLabel>Category</InputLabel>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select value={category} onChange={handleCategoryChange}>
              {categories[type].map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Cost"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            type="number"
            value={cost}
            onChange={handleCostChange}
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
          <StyledButton
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2, color: 'white', width: "100%" }}
          >
            Submit
          </StyledButton>
        </StyledPaper>
      </StyledContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default AddTransaction;
