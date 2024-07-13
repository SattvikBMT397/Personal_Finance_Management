
import { Link } from 'react-router-dom';
import Images from './Logo/Budget Buddy.png';
import MobileImage from "./Logo/mobile.png";
import '../components/Home.css';
import { useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import GroupIcon from '@mui/icons-material/Group';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const Home = () => {
  const isMobile = useMediaQuery('(max-width:500px)');
  const isIpad = useMediaQuery('(max-width:769px)');

  return (
    <div className='main' style={{ background: 'linear-gradient(180deg, rgba(40, 161, 151, 0.03) 0%, rgba(15, 59, 55, 0.03) 100%)' }}>
      <div className="containers">
        <img src={Images} alt='Myimages' className="logo" style={{ display: isMobile ? 'none' : 'block' }} />
        <div className='main_middle'>
          <h2>
            <Link to="/" className="navLink">
              {isMobile || isIpad? <HomeIcon /> : 'Home'}
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
          <h2>
            <Link to="/A" className="navLink">
              {isMobile || isIpad ? <AddCircleIcon /> : 'Add Transaction'}
            </Link>
          </h2>
        </div>
        <div className='header_end'>
          <button className='btn2'>
            {(isMobile || isIpad) ? <LoginIcon /> : 'Login'}
          </button>
          <button className='btn2'>
            {(isMobile || isIpad)? <AppRegistrationIcon /> : 'Register'}
          </button>
        </div>
      </div>
      <div className='secondMiddle'>
        <div className='contents'>
          <div className='inner'>
            <span className='innerText'>Expense </span><span>Tracker..</span>
            <p> Your Personal Assistant with<div className='innerText'> Tips, Reminders, and Advice</div></p>
          </div>
          <div className='contents2'>
            <p className='content2text'> Welcome Guy!</p>
            <p className='description'>Budget Buddy is here to support you on your journey to financial freedom, offering tips, reminders, and personalized advice along the way.</p>
          </div>
        </div>
        {!isMobile  && !isIpad && (
          <div className='photos1'>
            <img className='MobileImage' src={MobileImage} width={400} height={460} alt='Mobile'></img>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
