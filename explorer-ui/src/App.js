import React, { useEffect, useState } from "react";
import { getTokens, getFTTokens } from "./api";
import "./App.css";

function App() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("home"); // "home" | "rbt-list" | "ft-list" | "details"
  const [selectedToken, setSelectedToken] = useState(null);
  const [tokenType, setTokenType] = useState(null); // "rbt" | "ft"

  useEffect(() => {
    if (view === "rbt-list" || view === "ft-list" || view === "details") {
      let intervalId;

      async function fetchTokensData() {
        try {
          let data = [];
          if (tokenType === "rbt") {
            data = await getTokens();
          } else if (tokenType === "ft") {
            data = await getFTTokens();
          }
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
  }, [view, tokenType]);

  const handleTokenClick = (token) => {
    setSelectedToken(token);
    setView("details");
  };

  const handleBackToList = () => {
    setSelectedToken(null);
    if (tokenType === "rbt") {
      setView("rbt-list");
    } else {
      setView("ft-list");
    }
  };

  const handleBackToHome = () => {
    setSelectedToken(null);
    setView("home");
  };

  const handleOpenRBTTokens = () => {
    setTokenType("rbt");
    setView("rbt-list");
  };

  const handleOpenFTTokens = () => {
    setTokenType("ft");
    setView("ft-list");
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
            <button className="ft-button" onClick={handleOpenFTTokens}>
              FT Tokens
            </button>
          </div>
        )}

        {/* Token list */}
        {(view === "rbt-list" || view === "ft-list") && (
          <>
            <button className="back-home-button" onClick={handleBackToHome}>
              &larr; Back to Home
            </button>

            {loading && <p>Loading tokens...</p>}
            {error && <p className="error">Error: {error}</p>}
            {!loading && !error && tokens.length === 0 && <p>No tokens found.</p>}
            {!loading && !error && tokens.length > 0 && (
              <>
                <h2>{tokenType === "rbt" ? "RBT Tokens" : "FT Tokens"}</h2>
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
              {tokenType === "rbt" && (
                <>
                  <p><b>Parent TokenID:</b> {selectedToken.parentTokenID || "N/A"}</p>
                  <p><b>Value:</b> {selectedToken.value || "N/A"}</p>
                  <p><b>DID:</b> {selectedToken.DID || "N/A"}</p>
                  <p><b>Status:</b> {selectedToken.status}</p>
                  <p><b>State Hash:</b> {selectedToken.stateHash || "N/A"}</p>
                  <p><b>Transaction ID:</b> {selectedToken.transactionID || "N/A"}</p>
                </>
              )}
              {tokenType === "ft" && (
                <>
                  <p><b>FT Name:</b> {selectedToken.ftName || "N/A"}</p>
                  {/* <p><b>Symbol:</b> {selectedToken.symbol || "N/A"}</p> */}
                  <p><b>Total Value:</b> {selectedToken.totalValue || "N/A"}</p>
                  <p><b>Owner DID:</b> {selectedToken.ownerDID || "N/A"}</p>
                  <p><b>Creator DID:</b> {selectedToken.creatorDID || "N/A"}</p>
                  <p><b>Status:</b> {selectedToken.status || "N/A"}</p>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
