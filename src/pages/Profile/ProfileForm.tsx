import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { UserData } from '../../utils/Interface/types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import backgroundImage from '../../components/Logo/bb.jpg';
import Loader from '../../components/commonComponent/commonLoader';
import { signupSchema } from '../../utils/schema/LoginSignupSchema';
import LandingPage from '../../components/LandingPage';

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.auth.currentUser);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            password: user?.password || '',
        },
    });

    const onSubmit = (formData: UserData) => {
        setLoading(true);

       
        setTimeout(() => {
            dispatch(updateUser(formData));
            setEditing(false);
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <LandingPage/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    padding: 2,
                    zIndex: -1,
                }}
            >
                <Paper sx={{ padding: 8, width: '100%', maxWidth: 600, border: '1px solid black' }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                            <Avatar alt="User Avatar" src={'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg'} sx={{ width: 100, height: 100 }} />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {editing ? (
                                    <div>
                                        <Typography variant="h5" gutterBottom>Edit Profile</Typography>
                                        <Controller
                                            name="name"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Name"
                                                    fullWidth
                                                    sx={{ marginBottom: 2 }}
                                                    error={!!errors.name}
                                                    helperText={errors.name?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Email"
                                                    fullWidth
                                                    sx={{ marginBottom: 2 }}
                                                    error={!!errors.email}
                                                    helperText={errors.email?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Password"
                                                    type="password"
                                                    fullWidth
                                                    sx={{ marginBottom: 2 }}
                                                    error={!!errors.password}
                                                    helperText={errors.password?.message}
                                                />
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                marginRight: 2,
                                                backgroundColor: '#1C8E85',
                                                '&:hover': {
                                                    backgroundColor: '#2ac4b8',
                                                },
                                            }}
                                            disabled={loading}
                                        >
                                            {loading ? <Loader /> : 'Update'}
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setEditing(false)}
                                            sx={{
                                                backgroundColor: "#d11a2a",
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#FF7F7F',
                                                },
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Typography variant="h5" gutterBottom>Profile Details</Typography>
                                        <Typography variant="body1" gutterBottom><strong>Name:</strong> {user?.name}</Typography>
                                        <Typography variant="body1" gutterBottom><strong>Email:</strong> {user?.email}</Typography>
                                        <Button
                                            startIcon={<EditIcon />}
                                            onClick={() => setEditing(true)}
                                            sx={{
                                                marginTop: 2,
                                                backgroundColor: '#1C8E85',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#2ac4b8',
                                                },
                                            }}
                                            variant="contained"
                                            disabled={loading}
                                        >
                                            {loading ? <Loader /> : 'Edit Profile'}
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    );
};

export default ProfilePage;
