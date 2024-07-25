import { Button, Container, Grid, Typography, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import { AccountCircle, ExitToApp, Dashboard } from '@mui/icons-material';
import bg from "./Logo/lg.jpg";
import ds from "./Logo/ds.png";
import logo from "./Logo/logo.png";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  
  const handleLogout = () => dispatch(logout());
  const handleDashboard = () => navigate('/dashboard');

  return (
    <section className='home'>
      <AppBar position="fixed" sx={{ backgroundColor: "white", boxShadow:"none" }}>
        <Toolbar>
          <img src={logo} alt="Logo" className="logo-img" style={{ height: "auto", width: "13%",  }} />
          <div style={{ flexGrow: 1 }} />
          {currentUser ? (
            <>
              <IconButton color="inherit" onClick={handleLogout} sx={{ color:"#1C8E85"}}>
                <ExitToApp />
              </IconButton>
              <IconButton color="inherit" onClick={handleDashboard} sx={{ color: "#1C8E85" }}>
                <Dashboard />
              </IconButton>
            </>
          ) : (
            <>
                <Button component={Link} to="/login" color="inherit" startIcon={<AccountCircle />} sx={{ color: "#1C8E85", marginRight:"10px" }}>
                Login
              </Button>
                <Button component={Link} to="/signup" color="inherit" startIcon={<AccountCircle />} sx={{ color: "#1C8E85" }}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        <Grid
          container
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={4}
          sx={{ marginTop: '20px' }}
        >
          <Grid item xs={12} md={6}>
            <Box textAlign={['center', 'left']}>
              <Typography variant="h3" gutterBottom style={{ color: '#1C8E85' }}>
                LEARN FROM THE <span style={{ color: '#1C8E85' }}>Expense Tracker</span>
              </Typography>
              <Typography variant="h4" gutterBottom style={{ color: '#757575', marginBottom: '20px' }}>
                Your Personal Assistant with Tips, Reminders, and Advice
              </Typography>
              <Typography variant="body1" style={{ color: '#757575', marginBottom: '20px' }}>
                <span style={{ color: '#1C8E85', fontWeight: 'bold' }}>Welcome, everyone!</span><br />
                Budget Buddy is here to support you on your journey to financial freedom.
              </Typography>
              {!currentUser && (
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" size="large" color="secondary" sx={{
                    backgroundColor: "#1C8E85",
                    '&:hover': {
                      backgroundColor: '#2ac4b8',
                    },
        }}>
                    Get Started
                  </Button>
                </Link>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={bg}
              alt="background"
              style={{
                maxWidth: '100%',
                height: 'auto',
                animation: 'slide-in 2s infinite'
              }}
              className="animated-image"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center" mt={4}>
            <Typography variant="h4" style={{ color: '#1C8E85' }}>
              Our Services
            </Typography>
            <Box mt={2}>
              <hr style={{ width: '100%', borderTop: '2px solid #1C8E85' }} />
            </Box>
            <img
              src={ds} // Replace with your dashboard image source
              alt="Dashboard"
              style={{ maxWidth: '100%', height: 'auto', marginTop: '20px', marginBottom:"10px" }}
            />
          </Box>
        </Grid>
      </Container>
    </section>
  );
}

export default Home;
