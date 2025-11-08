import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './Login';
import Dashboard from './components/Dashboard';
import { useState } from 'react';

function App() {
  const [logged, setLogged] = useState(false);

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        {!logged ? <Login onLogin={() => setLogged(true)} /> : <Dashboard />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
