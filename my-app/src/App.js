import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import MenuUI from './pages/MenuUI';
import DropTablePage from './pages/DropTables';

// Start Page Component
const StartPage = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Welcome to the Data Center Database</h1>
      <button onClick={() => navigate('/pages/menu')}>Go to Menu</button>
    </div>
  );
};

function App() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('servers').select('*');
      console.log('DATA:', data);
      console.log('ERROR:', error);
    };
    testConnection();
  }, []);

  return (
    <Router>
      <div>
        <h1>Data Center Dashboard</h1>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/pages/menu" element={<MenuUI />} />
          <Route path="/drop-tables" element={<DropTablePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;