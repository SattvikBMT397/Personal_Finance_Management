import { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { UserData } from '../../utils/Interface/types';
import { Grid, Paper, Typography, Avatar, TextField, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import backgroundImage from '../../components/Logo/bg.jpg';
import CommonSidebar from '../../components/commonComponent/commonSidebar';



const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.auth.currentUser);
    
    
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
        dispatch(updateUser(formData));
        setEditing(false);
    };

    return (
        <>
          <CommonSidebar/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: 2,
                    zIndex: -1,

                }}
            >
                <Paper sx={{ padding: 8, width: '100%', maxWidth: 600, }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                            <Avatar alt="User Avatar" src={''} sx={{ width: 100, height: 100 }} />
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
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <Button onClick={handleUpdate} variant="contained" color="primary" sx={{ marginRight: 2 }}>
                                        Update
                                    </Button>
                                    <Button onClick={() => setEditing(false)}>Cancel</Button>
                                </div>
                            ) : (
                                <div>
                                    <Typography variant="h5" gutterBottom>Profile Details</Typography>
                                    <Typography variant="body1" gutterBottom><strong>Name:</strong> {user?.name}</Typography>
                                    <Typography variant="body1" gutterBottom><strong>Email:</strong> {user?.email}</Typography>
                                    <Typography variant="body1" gutterBottom><strong>Password:</strong> {user?.password}</Typography>
                                    <Button startIcon={<EditIcon />} onClick={() => setEditing(true)} sx={{ marginTop: 2 }} variant="outlined">
                                        Edit Profile
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
