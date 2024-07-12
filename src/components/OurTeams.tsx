import '../App.css';
import Footer from './Footer';

function OurTeams() {
    return (
        <>
    <div className="pages">
      <div className='title'>Our Team</div>

      <div className='avatar-row'>
        <div className='avatar'>
          <div className='avatar-info'>
            <div className='name'>John Doe</div>
            <div className='designation'>Software Engineer</div>
          </div>
        </div>
        <div className='avatar'>
          <div className='avatar-info'>
            <div className='name'>Jane Smith</div>
            <div className='designation'>UI/UX Designer</div>
          </div>
        </div>
        <div className='avatar'>
          <div className='avatar-info'>
            <div className='name'>Michael Johnson</div>
            <div className='designation'>Project Manager</div>
          </div>
        </div>
      </div>

      <div className='avatar-row'>
        <div className='avatar'>
          <div className='avatar-info'>
            <div className='name'>Emily Brown</div>
            <div className='designation'>Marketing Specialist</div>
          </div>
        </div>
        <div className='avatar'>
          <div className='avatar-info'>
            <div className='name'>David Wilson</div>
            <div className='designation'>Data Analyst</div>
          </div>
        </div>
        <div className='avatar'>
          <div className='avatar-info'>
            <div className='name'>Rachel Taylor</div>
            <div className='designation'>Quality Assurance</div>
          </div>
        </div>
          </div>
      </div>
          <Footer/> 
      </>
      
  );
}

export default OurTeams;
