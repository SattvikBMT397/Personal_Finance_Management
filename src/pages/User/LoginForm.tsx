import { useState } from 'react';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import localforage from 'localforage';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { loginSchema } from '../../utils/schema/LoginSignupSchema';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../utils/Interface/types';
import './LoginForm.css';
import CommonController from '../../components/commonComponent/commonController';

const LoginForm = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: UserData) => {
        setSubmitting(true);
        setTimeout(async () => {
            try {
                const users: UserData[] = await localforage.getItem<UserData[]>('users') || [];
                const authenticated = users.find(u => u.email === data.email && u.password === data.password);

                if (authenticated) {
                    dispatch(login(authenticated));
                    sessionStorage.setItem('currentUser', JSON.stringify(authenticated));
                    navigate("/dashboard");
                } else {
                    setError('Invalid Credentials');
                    console.log(error);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again.');
            } finally {
                setSubmitting(false);
            }
        }, 1000)
    };

    return (
        <div className='mains' >
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
                <Container component="main" maxWidth="xs" sx={{marginTop:"30px"}}>
                    <Card
                        sx={{
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(255, 255, 255, 0.13)',
                            borderRadius: '10px',
                            boxShadow: '0 0 40px rgba(8, 7, 16, 0.6)',
                            padding: { xs: '30px 20px', sm: '50px 35px' },
                            border: '2px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: '#1C8E85' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ fontSize: { xs: '24px', sm: '32px' }, fontWeight: 500, lineHeight: '42px', textAlign: 'center', color: '#ffffff', mt: 2 }}>
                                Login Here
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '30px', width: '100%' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <CommonController
                                            name="email"
                                            control={control}
                                              label="Email"
                                                    placeholder="Email"
                                                    error={!!errors.email}
                                                    helperText={errors.email?.message}
                                                    InputProps={{
                                                        style: { color: '#ffffff' },
                                                        sx: { backgroundColor: 'grey', borderRadius: 3 }
                                                    }}
                                                    InputLabelProps={{
                                                        style: { color: '#ffffff' }
                                                    }}
                                                />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CommonController
                                            name="password"
                                            control={control}
                                            type="password"
                                           label="Password"
                                         placeholder="Password"
                                         error={!!errors.password}
                                             helperText={errors.password?.message}
                                                    InputProps={{
                                                        style: { color: '#ffffff' },
                                                        sx: { backgroundColor: 'grey', borderRadius: 3 }
                                                    }}
                                                    InputLabelProps={{
                                                        style: { color: '#ffffff' }
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
                                        backgroundColor: '#ffffff',
                                        color: '#080710',
                                        padding: '15px 0',
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
                                <Typography sx={{ mt: 2, color: '#ffffff', textAlign: 'center' }}>
                                    Don't have an account?{' '}
                                    <Link href="/signup" sx={{ color: "#1C8E85" }}>
                                        Sign up
                                    </Link>
                                </Typography>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default LoginForm;
