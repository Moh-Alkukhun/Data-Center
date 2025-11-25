import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const DropTablePage = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load all tables
  const fetchTables = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc('get_all_tables');

    if (error) {
      console.error('Error fetching tables:', error);
    } else {
      setTables(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // Drop the selected table
  const handleDropTable = async () => {
    if (!selectedTable) {
      setMessage("Please select a table first.");
      return;
    }

    const confirmDrop = window.confirm(
      `Are you sure you want to DROP the table "${selectedTable}"?`
    );

    if (!confirmDrop) return;

    const { data, error } = await supabase.rpc('drop_table', {
      table_to_drop: selectedTable
    });

    if (error) {
      console.error("Error dropping table:", error);
      setMessage("❌ Failed to drop table.");
    } else {
      setMessage(`✅ Table "${selectedTable}" dropped successfully.`);
      fetchTables(); // refresh list
      setSelectedTable("");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Drop Tables</h1>

      <button 
        onClick={() => navigate('/menu')}
        style={{ marginBottom: '20px' }}
      >
        ← Back to Menu
      </button>

      {loading ? (
        <p>Loading tables...</p>
      ) : (
        <>
          <div>
            <label>Select a table:</label>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              style={{
                marginLeft: '10px',
                padding: '8px',
                fontSize: '16px',
                width: '300px'
              }}
            >
              <option value="">-- Select a table --</option>
              {tables.map((table, index) => (
                <option key={index} value={table.table_name}>
                  {table.table_name}
                </option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleDropTable}
            style={{ marginTop: '20px', padding: '10px 20px' }}
          >
            Drop Selected Table
          </button>

          {message && (
            <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>
          )}
        </>
      )}
    </div>
  );
};

export default DropTablePage;
