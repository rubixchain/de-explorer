import React, { useEffect, useState } from "react";
import { getTokens } from "./api";
import "./App.css";

function App() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("home"); // "home" | "list" | "details"
  const [selectedToken, setSelectedToken] = useState(null);

  useEffect(() => {
    if (view === "list" || view === "details") {
      let intervalId;

      async function fetchTokensData() {
        try {
          const data = await getTokens();
          setTokens(data || []);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchTokensData(); // initial fetch
      intervalId = setInterval(fetchTokensData, 5000); // poll every 5s

      return () => clearInterval(intervalId);
    }
  }, [view]);

  const handleTokenClick = (token) => {
    setSelectedToken(token);
    setView("details");
  };

  const handleBackToList = () => {
    setSelectedToken(null);
    setView("list");
  };

  const handleBackToHome = () => {
    setSelectedToken(null);
    setView("home");
  };

  const handleOpenRBTTokens = () => {
    setView("list");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Rubix Explorer</h1>
      </header>

      <main>
        {/* Home page */}
        {view === "home" && (
          <div className="home">
            <button className="rbt-button" onClick={handleOpenRBTTokens}>
              RBT Tokens
            </button>
          </div>
        )}

        {/* Token list */}
        {view === "list" && (
          <>
            <button className="back-home-button" onClick={handleBackToHome}>
              &larr; Back to Home
            </button>

            {loading && <p>Loading tokens...</p>}
            {error && <p className="error">Error: {error}</p>}
            {!loading && !error && tokens.length === 0 && <p>No tokens found.</p>}
            {!loading && !error && tokens.length > 0 && (
              <>
                <h2>RBT Tokens</h2>
                <ul className="token-id-list">
                  {tokens.map((token, index) => (
                    <li
                      key={index}
                      onClick={() => handleTokenClick(token)}
                      className={`token-id-item ${
                        selectedToken?.tokenID === token.tokenID ? "selected" : ""
                      }`}
                    >
                      {token.tokenID}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {/* Token details */}
        {view === "details" && selectedToken && (
          <div className="token-details">
            <button className="back-button" onClick={handleBackToList}>
              &larr; Back to Tokens
            </button>

            <h2>Token Details</h2>
            <div className="token-card">
              <h3>{selectedToken.tokenID}</h3>
              <p><b>Parent TokenID:</b> {selectedToken.parentTokenID || "N/A"}</p>
              <p><b>Value:</b> {selectedToken.value || "N/A"}</p>
              <p><b>DID:</b> {selectedToken.DID || "N/A"}</p>
              <p><b>Status:</b> {selectedToken.status}</p>
              <p><b>State Hash:</b> {selectedToken.stateHash || "N/A"}</p>
              <p><b>Transaction ID:</b> {selectedToken.transactionID || "N/A"}</p>
              <p><b>Added:</b> {selectedToken.added ? "Yes" : "No"}</p>
              <p><b>Sync Status:</b> {selectedToken.syncStatus}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
