import React from 'react';

export default function MenuUI() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Menu</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
        <button>Drop Tables</button>
        <button>Create Tables</button>
        <button>Populate Tables</button>
        <button>Query Tables</button>
        <button>Exit</button>
      </div>
    </div>
  );
}
