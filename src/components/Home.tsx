import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import GroupIcon from '@mui/icons-material/Group';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Images from './Logo/Budget Buddy.png'
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';

const Home = () => {
  const isMobile = useMediaQuery('(max-width:500px)');
  const isIpad = useMediaQuery('(max-width:769px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/signup');
  const handleLogout = () => dispatch(logout());
  const handleDashboard = () => navigate('/dashboard');

  return (
    <div className='main'>
      <div className="containers">
        <img src={Images} alt='Myimages' className="logo" style={{ display: isMobile ? 'none' : 'block' }} />
        <div className='main_middle'>
          <h2>
            <Link to="/" className="navLink">
              {isMobile || isIpad ? <HomeIcon /> : 'Home'}
            </Link>
          </h2>
          <h2>
            <Link to="/contactus" className="navLink">
              {isMobile || isIpad ? <ContactMailIcon /> : 'Contact Us'}
            </Link>
          </h2>
          <h2>
            <Link to="/OurTeams" className="navLink">
              {isMobile || isIpad ? <GroupIcon /> : 'Our Teams'}
            </Link>
          </h2>
        </div>

        {currentUser ? (
          <div className='header_end'>
            <button onClick={handleLogout} className='btn2'>{isMobile || isIpad ? <LogoutIcon /> : 'Logout'}</button>
            <button onClick={handleDashboard} className='btn2'>{isMobile || isIpad ? <DashboardIcon /> : 'Dashboard'}</button>
          </div>
        ) : (
          <div className='header_end'>
            <button onClick={handleLogin} className='btn2'>{isMobile || isIpad ? <LoginIcon /> : 'Login'}</button>
            <button onClick={handleRegister} className='btn2'>{isMobile || isIpad ? <AppRegistrationIcon /> : 'Register'}</button>
          </div>
        )}
      </div>
      <div className='secondMiddle'>
        <div className='contents'>
          <div className='inner'>
            <span className='innerText'>Expense</span><span> Tracker..</span>
            <p>Your Personal Assistant with<div className='innerText'> Tips, Reminders, and Advice</div></p>
          </div>
          <div className='contents2'>
            <p className='content2text'>Welcome Guys!</p>
            <p className='description'>Budget Buddy is here to support you on your journey to financial freedom, offering tips, reminders, and personalized advice along the way.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Home;
