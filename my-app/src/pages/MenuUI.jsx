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

      <hr style={{ margin: "20px 0" }} />

      <h3>📡 Active Servers</h3>

      {loading ? (
        <p>Loading servers...</p>
      ) : servers.length === 0 ? (
        <p>No servers found in database.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {servers.map((server) => (
            <li
              key={server.server_id}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                marginBottom: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor:
                  server.status === "active" ? "#d4ffe0" :
                  server.status === "maintenance" ? "#fff4d4" : "#ffd4d4"
              }}
              onClick={() => navigate(`/server/${server.server_id}`)}
            >
              <strong>{server.server_name}</strong> <br />
              Model: {server.model} <br />
              Status: {server.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
