import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './App.css';


// Pages
import StartPage from './pages/StartPage';
import MenuUI from './pages/MenuUI';
import DropTablePage from './pages/DropTables';
import CreateTables from "./pages/CreateTables";
import PopulateTables from "./pages/PopulateTables";
import QueryTables from './pages/QueryTables';


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
