import Home from './components/Home';
import ContactUsPage from './components/ContactUs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OurTeams from './components/OurTeams';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/OurTeams" element={<OurTeams />} />
      
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
