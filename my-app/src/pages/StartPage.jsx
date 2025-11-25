import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="start-page">
      <div className="start-card">
        <h1>Welcome to the Data Center Database</h1>

        <p className="start-subtitle">
          Manage tables, query data, and maintain your system — all in one clean interface.
        </p>

        <button className="btn" onClick={() => navigate("/menu")}>
          Enter Dashboard →
        </button>

        <p className="credits">
          Built by <strong>Zein Alasali</strong>, <strong>Abdullatif Akhras</strong>, and <strong>Mohammad Alkukhun</strong>
        </p>
      </div>
    </div>
  );
};

export default StartPage;
