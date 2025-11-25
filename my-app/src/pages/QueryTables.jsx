import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function QueryTables() {
  const navigate = useNavigate();

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [rows, setRows] = useState([]);

  // Load all table names
  useEffect(() => {
    const loadTables = async () => {
      const { data, error } = await supabase.rpc("get_all_tables");
      if (!error) setTables(data);
    };
    loadTables();
  }, []);

  // Load content of selected table
  const loadTableData = async () => {
    if (!selectedTable) return;

    const { data, error } = await supabase
      .from(selectedTable)
      .select("*");

    if (error) {
      console.error("Error loading table:", error);
      setRows([]);
    } else {
      setRows(data);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Query Tables</h2>

      <button onClick={() => navigate("/menu")}>← Back to Menu</button>

      <div style={{ marginTop: "20px" }}>
        <label>Select Table: </label>
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          style={{ width: "250px", padding: "8px" }}
        >
          <option value="">-- choose a table --</option>
          {tables?.map((t) => (
            <option key={t.table_name} value={t.table_name}>
              {t.table_name}
            </option>
          ))}
        </select>

        <button
          onClick={loadTableData}
          style={{ marginLeft: "15px", padding: "8px 20px" }}
        >
          Load Data
        </button>
      </div>

      {/* Results Table */}
      {rows.length > 0 && (
        <table 
          border="1" 
          cellPadding="10" 
          style={{ marginTop: "25px", width: "90%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              {Object.keys(rows[0]).map((col) => (
                <th key={col} style={{ backgroundColor: "#eee" }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j}>{String(val)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTable && rows.length === 0 && (
        <p style={{ marginTop: "20px" }}>No data found in this table.</p>
      )}
    </div>
  );
}
