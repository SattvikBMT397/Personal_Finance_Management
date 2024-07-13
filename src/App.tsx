import Home from './components/Home';
import ContactUsPage from './components/ContactUs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OurTeams from './components/OurTeams';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddTransaction from './components/AddTransaction';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/OurTeams" element={<OurTeams />} />
        <Route path= "/A" element={<AddTransaction/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
