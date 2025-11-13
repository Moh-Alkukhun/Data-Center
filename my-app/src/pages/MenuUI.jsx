import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function MenuUI() {
    const navigate = useNavigate();

    const DropTablePage = () => {
        navigate('/drop-tables');
    };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Menu</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
        <button onClick={DropTablePage}>Drop Tables</button>
        <button>Create Tables</button>
        <button>Populate Tables</button>
        <button>Query Tables</button>
        <button>Exit</button>
      </div>
    </div>
  );
}
