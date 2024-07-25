import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import localforage from 'localforage';
import {
    Avatar, Button, Card, CardContent, Container, Grid, Typography,
    Snackbar, Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { loginSchema } from '../../utils/schema/LoginSignupSchema';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../utils/Interface/types';
import './LoginForm.css';
import CommonController from '../../components/commonComponent/commonController';
import logo from "../../components/Logo/logo.png";

const LoginForm = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const dispatch = useDispatch();

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    const onSubmit = async (data: UserData) => {
        setSubmitting(true);
        setTimeout(async () => {
            try {
                const users: UserData[] = await localforage.getItem<UserData[]>('users') || [];
                const authenticated = users.find(u => u.email === data.email && u.password === data.password);

                if (authenticated) {
                    dispatch(login(authenticated));
                    sessionStorage.setItem('currentUser', JSON.stringify(authenticated));
                    setSnackbarMessage('Login successful!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 1500);
                } else {
                    setError('Invalid Credentials');
                    setSnackbarMessage('Invalid credentials. Please try again.');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again.');
                setSnackbarMessage('Error fetching user data. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } finally {
                setSubmitting(false);
            }
        }, 1000);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className='mains'>
            <div className="background">
              
                <Container component="main" maxWidth="xs" sx={{ marginTop:"30px" }}>
                    <Card
                        sx={{
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(255, 255, 255, 0.13)',
                            boxShadow: '0 0 40px rgba(8, 7, 16, 0.1)',
                            borderRadius: '10px',
                            padding: { xs: '0px 20px', sm: '0px 35px' },
                            border: '2px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <Link to={"/"}>
                            <img src={logo} alt="Logo" style={{ height: "auto", width: "50%", display: "block", margin: "0 auto" }} />
                        </Link> 
   
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: '#1C8E85' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ fontSize: { xs: '24px', sm: '32px' }, fontWeight: 500, lineHeight: '42px', textAlign: 'center', color: 'black', mt: 2 }}>
                                Login Here
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '30px', width: '100%' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <CommonController
                                            name="email"
                                            control={control}
                                            label="Email"
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            InputProps={{
                                                style: { color: 'black' },
                                                sx: { backgroundColor: '#D3D3D3', borderRadius: 3 }
                                            }}
                                            InputLabelProps={{
                                                style: { color: 'black' }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CommonController
                                            name="password"
                                            control={control}
                                            type="password"
                                            label="Password"
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                            InputProps={{
                                                style: { color: '#black' },
                                                sx: { backgroundColor: '#D3D3D3', borderRadius: 3 }
                                            }}
                                            InputLabelProps={{
                                                style: { color: 'black' }
                                            }}
                                        />
                                    </Grid>
                                    {error && (
                                        <Grid item xs={12}>
                                            <Typography color="error">{error}</Typography>
                                        </Grid>
                                    )}
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={submitting}
                                    sx={{
                                        marginTop: '30px',
                                        backgroundColor: "#1C8E85",
                                        '&:hover': {
                                            backgroundColor: '#2ac4b8',
                                        },

                                        color: '#080710',
                                        padding: '6px 0',
                                        fontSize: '18px',
                                        fontWeight: 600,
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        '@media (max-width:600px)': {
                                            fontSize: '16px',
                                            padding: '12px 0'
                                        }
                                    }}
                                >
                                    {submitting ? 'Logging in...' : 'Log In'}
                                </Button>
                                <Typography sx={{ mt: 2, color: 'black' }}>
                                    Don't have an account?{' '}
                                    <Typography
                                        component="span"
                                        sx={{ color: "#1C8E85", cursor: 'pointer' }}
                                        onClick={handleSignUpClick}
                                    >
                                        Sign Up
                                    </Typography>
                                </Typography>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default LoginForm;
