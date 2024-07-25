// AllRoute.tsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/Dashboard';
import Budget from '../pages/Budget/Budget';
import AddTransaction from '../pages/Transaction/AddTransaction';
import TransactionHistory from '../pages/Transaction/TransactionHistory';
import ProfileForm from '../pages/Profile/ProfileForm';
import SignupForm from '../pages/User/SignupForm';
import LoginForm from '../pages/User/LoginForm';

import Home from '../components/Home';
import PrivateRoute from './PrivateRoute';

const AllRoute = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PrivateRoute restricted={true} />}>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute restricted={false} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-budget" element={<Budget />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transaction" element={<TransactionHistory />} />
          <Route path="/profile" element={<ProfileForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AllRoute;
