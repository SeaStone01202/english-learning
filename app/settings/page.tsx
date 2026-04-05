"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("apiKey") || "";
    setApiKey(savedKey);
  }, []);

  const handleSaveApiKey = () => {
    localStorage.setItem("apiKey", apiKey);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleClearApiKey = () => {
    setApiKey("");
    localStorage.removeItem("apiKey");
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="page-container">
      <h1>Settings</h1>
      <p className="page-description">Manage your application preferences.</p>

      <div className="settings-section">
        <h2>API Configuration</h2>
        <div className="form-group">
          <label htmlFor="apiKey">API Key:</label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="form-input"
          />
          <p className="help-text">
            Your API key is stored locally in your browser.
          </p>
        </div>

        <div className="button-group">
          <button onClick={handleSaveApiKey} className="btn-primary">
            Save API Key
          </button>
          <button onClick={handleClearApiKey} className="btn-secondary">
            Clear API Key
          </button>
        </div>

        {saveSuccess && (
          <p className="success-message">Settings saved successfully!</p>
        )}
      </div>
    </div>
  );
}
