import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import SignUp from './components/SignUp';
import Admin from './components/Admin';
import UserLogin from './components/UserLogin';
import UserPage from './components/UserPage';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import About from './components/About';

function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/userLogin' element={<UserLogin />} />
          <Route path='/userPage' element={<UserPage />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    
  );
}

export default App;
