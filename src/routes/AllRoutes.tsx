import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupForm from '../pages/User/SignupForm'
import LoginForm from '../pages/User/LoginForm'
import ProfileForm from '../pages/Profile/ProfileForm'
import Home from '../components/Home'
import ContactUsPage from '../components/ContactUs'
import OurTeams from '../components/OurTeams'
import Dashboard from '../pages/Dashboard/Dashboard'

const AllRoutes = () => {
  return (
<>
<Router>
    <Routes>
          <Route path='/signup' element={<SignupForm />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/profile' element={<ProfileForm />}></Route>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/OurTeams" element={<OurTeams />} />
          <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
</Router>
</>
  )
}

export default AllRoutes