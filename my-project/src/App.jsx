import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import Tools from './components/Tools';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
        <main className="flex-1 transition-all duration-300">
        <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/home" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/tools" element={<Tools />} /> 
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/login" element={<Login />} /> 
          </Routes>
          <Footer />
        </main>
    </Router>
  );
}

export default App;