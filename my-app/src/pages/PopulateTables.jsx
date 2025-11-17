import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function PopulateTables() {
  const navigate = useNavigate();

  const tables = [
    "servers",
    "alerts",
    "environmental_sensors",
    "performance_metrics",
    "maintenance",
    "roles",
    "users"
  ];

  const [selectedTable, setSelectedTable] = useState("");
  const [columns, setColumns] = useState([]);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadColumns = async () => {
      if (!selectedTable) return;

      const { data, error } = await supabase.rpc("get_table_columns", {
        tbl: selectedTable
      });

      if (error) {
        console.error("RPC Error:", error);
        return;
      }

      if (!data) {
        console.error("No columns returned");
        return;
      }

      setColumns(data);

      const initialForm = {};
      data.forEach((col) => (initialForm[col] = ""));
      setFormData(initialForm);
    };

    loadColumns();
  }, [selectedTable]);

  const handleInsert = async () => {
    const { error } = await supabase.from(selectedTable).insert([formData]);

    if (error) {
        console.error("INSERT ERROR:", error);
        // Show the actual message from Postgres
        setMessage(`❌ Insert failed: ${error.message}`);
        return;

    } else {
      setMessage("✅ Row inserted successfully!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Insert Data Into Tables</h2>
      <button onClick={() => navigate("/menu")}>← Back to Menu</button>

      <div style={{ marginTop: "20px" }}>
        <label><strong>Select Table:</strong></label>
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          style={{ marginLeft: "10px", padding: "8px" }}
        >
          <option value="">-- Select --</option>
          {tables.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {selectedTable && columns.length > 0 && (
        <div style={{ marginTop: "25px" }}>
          <h3>Insert Row Into "{selectedTable}"</h3>

          {columns.map((col) => (
            <div key={col} style={{ marginBottom: "15px" }}>
              <label style={{ width: "150px", display: "inline-block" }}>
                {col}:
              </label>
              <input
                type="text"
                value={formData[col]}
                onChange={(e) =>
                  setFormData({ ...formData, [col]: e.target.value })
                }
                style={{
                  padding: "8px",
                  width: "280px",
                  border: "1px solid #ccc",
                  borderRadius: "6px"
                }}
              />
            </div>
          ))}

          <button
            onClick={handleInsert}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Insert Row
          </button>
        </div>
      )}

      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
}
