import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function MenuUI() {
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Navigate to DropTables page
  const dropTablePage = () => navigate('/drop-tables');

  // Load all servers from DB
  const fetchServers = async () => {
    const { data, error } = await supabase.from("Servers").select("*");

    if (error) {
      console.error("Error fetching servers:", error);
    } else {
      setServers(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Data Center Dashboard</h2>

      {/* Menu Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
        <button onClick={dropTablePage}>Drop Tables</button>
        <button onClick={() => navigate('/create-tables')}>Create New Table</button>
        <button onClick={() => navigate('/populate-tables')}>Populate Tables</button>
        <button onClick={() => navigate('/query')}>Query Tables</button>
        <button onClick={() => navigate('/')}>Exit</button>
      </div>


    </div>
  );
}
