import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddTransaction from './components/AddTransaction';
import AllRoutes from './routes/AllRoutes';


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
   <AllRoutes/>
  );
}

export default App;
