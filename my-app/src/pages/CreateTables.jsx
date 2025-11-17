import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreateTables() {
  const navigate = useNavigate();
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    if (!tableName || !columns) {
      setMessage("❌ Table name and column definitions are required.");
      return;
    }

    const { data, error } = await supabase.rpc("create_table_dynamic", {
      table_name: tableName.toLowerCase(),
      columns: columns
    });

    if (error) {
        console.error(error);
        setMessage("❌ " + error.message);
        } else {
        setMessage(`✅ Table "${tableName}" created successfully!`);
        setTableName("");
        setColumns("");
        }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Table</h2>

      <button onClick={() => navigate("/menu")}>← Back to Menu</button>

      <div style={{ marginTop: "20px" }}>
        <label>Table Name:</label><br />
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="e.g. devices"
          style={{ width: "300px", padding: "8px" }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>Columns (SQL format):</label><br />
        <textarea
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
          placeholder="id bigint primary key, name text, created_at timestamptz"
          style={{ width: "400px", height: "150px", padding: "8px" }}
        />
      </div>

      <button
        onClick={handleCreate}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Create Table
      </button>

      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          {message}
        </p>
      )}
    </div>
  );
}
