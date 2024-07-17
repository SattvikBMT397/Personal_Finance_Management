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
import { useNavigate } from 'react-router-dom';
import { signupSchema } from '../../utils/schema/LoginSignupSchema';
import { UserData } from '../../utils/Interface/types';
import CommonController from '../../components/commonComponent/commonController';
import './LoginForm.css'; 

const SignupForm = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

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
                    alert('Signup Successful!');
                    navigate("/login");
                } else {
                    setError('User already exists');
                }
            } catch (error) {
                console.error('Error saving user data:', error);
                setError('Error saving user data. Please try again.');
            } finally {
                setSubmitting(false);
            }
        }, 1000);
    };
    return (
        <div className='mains'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
                <Container component="main" maxWidth="xs" sx={{marginTop:"30px"}} >
                    <Card sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.13)', borderRadius: '10px', boxShadow: '0 0 40px rgba(8, 7, 16, 0.6)', padding: '10px 15px', border: '2px solid rgba(255, 255, 255, 0.1)' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: '#1C8E85' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ fontSize: '32px', fontWeight: 500, lineHeight: '42px', textAlign: 'center', color: '#ffffff', mt: 2 }}>
                                Sign Up Here
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '30px', width: '100%' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <CommonController
                                            name="name"
                                            control={control}
                                            label="Full Name"
                                            placeholder="Full Name"
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
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
                                            label="Password"
                                            type="password"
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
                                    sx={{ marginTop: '30px', backgroundColor: '#ffffff', color: '#080710', padding: '15px 0', fontSize: '18px', fontWeight: 600, borderRadius: '5px', cursor: 'pointer' }}
                                >
                                    {submitting ? 'Submitting...' : 'Sign Up'}
                                </Button>
                                <Typography sx={{ mt: 2, color: '#ffffff' }}>
            Already have an account?{' '}
            <Typography
                component="span"
                sx={{ color: "#1C8E85", cursor: 'pointer' }}
                onClick={handleSignUpClick}
            >
                Sign up
            </Typography>
        </Typography>                
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default SignupForm;
