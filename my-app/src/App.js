import { useEffect } from 'react';
import { supabase } from './supabaseClient';
import MenuUI from './MenuUI';

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
    <div>
      <h1>Data Center Dashboard</h1>
      <MenuUI />
    </div>
  );
}

export default App;
