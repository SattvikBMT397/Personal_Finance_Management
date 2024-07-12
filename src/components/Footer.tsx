import '../App.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
  <h4>Company</h4>
 <p><Link to="/about-us" className='Link'>About Us</Link></p>
 <p><Link to="/careers" className='Link'>Careers</Link></p> 
 <p><Link to="/FAQ" className='Link'>FAQs</Link></p> 
 <p><Link to="/OurTeams" className='Link'>Teams</Link></p> 
 <p><Link to="/contactus" className='Link'>Contact Us</Link></p> 
</div>
<div className="footer-section">
  <h4>Other Links</h4>
  <p> <Link to="/privacy-policy" className='Link'>Privacy Policy</Link></p> 
  <p><Link to="/Terms" className='Link'>Terms & Conditions</Link></p> 
  <p><Link to="/FAQ" className='Link'>FAQs</Link></p> 
  <p><Link to="/TermUs"className='Link'>Terms Of Use</Link></p> 
  <p> <Link to="/PartnerUs"className='Link'>Partner with Us</Link></p> 
</div>
        <div className="footer-section">
          <h4>Subscribe</h4>
          <p>Subscribe to stay tuned for new Service or Product. Let's do it!</p>
          <form>
            <input  className='inputTxt' type="email" placeholder="Enter your email address" />
            <button className='submitbtn' type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-section2">
                    <h4>Follow Us:</h4>
                    <div className='icons'><div>
                        <i className="fa-brands fa-facebook"></i></div>
                    <div><i className="fa-brands fa-youtube"></i></div>
                    <div> <i className="fa-brands fa-twitter"></i></div>
                    <div><i className="fa-brands fa-instagram"></i></div>
                    </div>
        </div>
      </div>
    </footer>
    );
}

export default Footer;