import { Link, useNavigate } from 'react-router-dom';
import Images from './Logo/Budget Buddy.png';
import MobileImage from "./Logo/mobile.png";
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/signup')
  }
  return (
    <div className='main' style={{ background: 'linear-gradient(180deg, rgba(40, 161, 151, 0.03) 0%, rgba(15, 59, 55, 0.03) 100%)' }}>
      <div className="containers">
        <img src={Images} alt='Myimages' className="logo" />
        <div className='main_middle'>
          <h2><Link to="/" className="navLink">Home</Link></h2>
          <h2><Link to="/contactus" className="navLink">Contact Us</Link></h2>
          <h2><Link to="/OurTeams" className="navLink">Our Teams</Link></h2>
        </div>

        <div className='header_end'>
          <button onClick={handleLogin} className='btn2'>Login</button>
          <button onClick={handleRegister} className='btn2'>Register </button>
        </div>
      </div>
      <div className='secondMiddle'>
        <div className='contents'>
          <div className='inner'>
            <span className='innerText'>Expense  </span><span>Tracker..</span>
            <p> Your Personal Assistant with<div className='innerText'> Tips, Reminders, and Advice</div></p>
          </div>
          <div className='contents2'>
            <p className='content2text'> Welcome Guy!</p>
            <p className='description'>Budget Buddy is here to support you on your journey to financial freedom, offering tips, reminders, and personalized advice along the way.</p>
          </div>
        </div>
        <div className='photos1'>
          <img className='MobileImage' src={MobileImage} width={400} height={460} alt='Mobile'></img>
        </div>
      </div>
    </div>
  );
}

export default Home;