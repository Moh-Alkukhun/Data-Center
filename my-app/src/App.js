import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Pages
import MenuUI from './pages/MenuUI';
import DropTablePage from './pages/DropTables';
import CreateTables from "./pages/CreateTables";
import PopulateTables from "./pages/PopulateTables";
import QueryTables from './pages/QueryTables';

// Start Page Component
const StartPage = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Data Center Database</h1>
      <button onClick={() => navigate('/menu')}>Go to Menu</button>
    </div>
  );
};

function App() {

  // OPTIONAL: test DB connection
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('Servers').select('*');
      console.log('DATA:', data);
      console.log('ERROR:', error);
    };
    testConnection();
  }, []);

  return (
    <Router>
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<StartPage />} />

        {/* Menu Page */}
        <Route path="/menu" element={<MenuUI />} />

        {/* Drop Tables */}
        <Route path="/drop-tables" element={<DropTablePage />} />

        {/* Create + Populate Pages */}
        <Route path="/create-tables" element={<CreateTables />} />
        <Route path="/populate-tables" element={<PopulateTables />} />
        <Route path="/query" element={<QueryTables />} />

      </Routes>
    </Router>
  );
}

export default App;
