import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import localforage from 'localforage';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { loginSchema } from '../../utils/schema/LoginSignupSchema';
import CommonController from '../../components/commonComponent/commonController';
import CommonButton from '../../components/commonComponent/commonButton';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../utils/Interface/types';


const LoginForm = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: UserData) => {
        setLoading(true);
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
                setLoading(false);
            }
           
       },1000)
    };

    return (
        <Container component="main" maxWidth="xs" >
            <Card sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, border: '0.5px solid #1C8E85' }}>
                <Avatar sx={{ m: 1, bgcolor: '#1C8E85' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <CardHeader
                    title={
                        <Typography variant="h5" sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                            Sign in to your account
                        </Typography>
                    }
                />
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginTop: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CommonController
                                    name="email"
                                    control={control}
                                    label="Email"
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    autoFocus
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
                                />
                            </Grid>
                        </Grid>
                        <CardActions style={{ marginTop: '16px' }}>
                            <CommonButton
                                type="submit"
                                disabled={submitting}
                                loading={loading}
                            >
                                {submitting ? 'Logging in...' : 'Sign in'}
                            </CommonButton>
                        </CardActions>
                    </form>
                </CardContent>
                <CardContent>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link href="/signup" sx={{ color: "#1C8E85" }}>
                            Sign up
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default LoginForm;
