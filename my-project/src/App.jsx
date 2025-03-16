import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import Tools from './components/Tools';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 transition-all duration-300">
        <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />

            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/tools" element={<Tools />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;