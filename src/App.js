import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthContextProvider } from './context/Auth_context';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>

          <Routes>
            <Route path="/" element={< Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
