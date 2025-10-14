import logo from './logo.svg';
import './App.css';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
