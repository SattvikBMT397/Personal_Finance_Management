import { useState, ChangeEvent } from 'react';
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
import CommonSidebar from '../../components/commonComponent/commonSidebar';
import Loader from '../../components/commonComponent/commonLoader';



const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.auth.currentUser);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState<UserData | { name: string; email: string; password: string }>({
        name: user?.name || '',
        email: user?.email || '',
        password: user?.password || '',
    });


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        setLoading(true); // Set updating state to true

        // Simulate an asynchronous operation with setTimeout
        setTimeout(() => {
            dispatch(updateUser(formData));
            setLoading(false); // Set updating state to false after operation completes
            setEditing(false);
        }, 1000); // Simulating 2 seconds delay
    };


    return (
        <>
            <CommonSidebar />
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
                <Paper sx={{ padding: 8, width: '100%', maxWidth: 600, border:'1px solid black' }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                            <Avatar alt="User Avatar" src={'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg'} sx={{ width: 100, height: 100 }} />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            {editing ? (
                                <div>
                                    <Typography variant="h5" gutterBottom>Edit Profile</Typography>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type='password'
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <Button
                                        onClick={handleUpdate}
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
                                        {loading ? <Loader/> : 'Update'}
                                    </Button>
                                    <Button onClick={() => setEditing(false)} sx={{
                                        backgroundColor: "#d11a2a", color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#FF7F7F',
                                        },

                                    }}>Cancel</Button>
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
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    );
};

export default ProfilePage;
