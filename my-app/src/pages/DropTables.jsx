import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const DropTablePage = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const { data, error } = await supabase.rpc('get_all_tables');
        
        if (error) {
          console.error('Error fetching tables:', error);
        } else {
          console.log('Tables:', data);
          setTables(data || []);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Drop Tables</h1>

      <button 
        onClick={() => navigate('/pages/menu')}
        style={{ marginBottom: '20px' }}
      >
        ← Back to Menu
      </button>
      
      {loading ? (
        <p>Loading tables...</p>
      ) : (
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
      )}
    </div>
  );
};

export default DropTablePage;