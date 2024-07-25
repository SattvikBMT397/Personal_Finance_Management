import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import localforage from 'localforage';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { signupSchema } from '../../utils/schema/LoginSignupSchema';
import { UserData } from '../../utils/Interface/types';
import CommonController from '../../components/commonComponent/commonController';
import './LoginForm.css';
import logo from "../../components/Logo/logo.png";

const SignupForm = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema),
    });

    const handleSignUpClick = () => {
        navigate('/login');
    };

    const onSubmit = async (data: UserData) => {
        setSubmitting(true);
        setTimeout(async () => {
            try {
                const users: UserData[] = await localforage.getItem<UserData[]>('users') || [];
                const userExists = users.find(u => u.email === data.email);

                if (!userExists) {
                    const id = (users.length + 1).toString();
                    const userDataWithId: UserData = {
                        ...data,
                        id,
                        budget: [],
                        transaction: [],
                        expenses: []
                    };
                    users.push(userDataWithId);
                    await localforage.setItem('users', users);
                    setSnackbarMessage('Signup Successful!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 1500);
                } else {
                    setError('User already exists');
                    setSnackbarMessage('User already exists');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error('Error saving user data:', error);
                setError('Error saving user data. Please try again.');
                setSnackbarMessage('Error saving user data. Please try again.');
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

                <Container component="main" maxWidth="xs" sx={{ marginTop: "30px" }}>
                    <Card sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.13)', borderRadius: '10px', boxShadow: '0 0 40px rgba(8, 7, 16, 0.1)', padding: '10px 15px', border: '2px solid rgba(255, 255, 255, 0.1)' }}>
                        <Link to={"/"}>
                            <img src={logo} alt="Logo" style={{ height: "auto", width: "50%", display: "block", margin: "0 auto" }} /> 
                        </Link>  
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: '#1C8E85' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ fontSize: '32px', fontWeight: 500, lineHeight: '42px', textAlign: 'center', color: 'black', mt: 2 }}>
                                Sign Up Here
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '30px', width: '100%' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <CommonController
                                            name="name"
                                            control={control}
                                            label="Full Name"
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
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
                                            label="Password"
                                            type="password"
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                            InputProps={{
                                                style: { color: 'black' },
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
                                        marginTop: '30px', backgroundColor: "#1C8E85",
                                        '&:hover': {
                                            backgroundColor: '#2ac4b8',
                                        }, color: '#080710', padding: '6px 0', fontSize: '18px', fontWeight: 600, borderRadius: '5px', cursor: 'pointer' }}
                                >
                                    {submitting ? 'Submitting...' : 'Sign Up'}
                                </Button>
                                <Typography sx={{ mt: 2, color: 'black' }}>
                                    Already have an account?{' '}
                                    <Typography
                                        component="span"
                                        sx={{ color: "#1C8E85", cursor: 'pointer' }}
                                        onClick={handleSignUpClick}
                                    >
                                        Sign In
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

export default SignupForm;
