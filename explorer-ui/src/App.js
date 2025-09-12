// File: App.js
import React, { useEffect, useState } from "react";
import { getTokens, getFTTokens, getFTTokenchain } from "./api";
import "./App.css";

function App() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("home");
  const [selectedToken, setSelectedToken] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const [tokenchain, setTokenchain] = useState(null);
  const [tokenchainLoading, setTokenchainLoading] = useState(false);

  useEffect(() => {
    if (["rbt-list", "ft-list", "details"].includes(view)) {
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
      fetchTokensData();
      intervalId = setInterval(fetchTokensData, 5000);
      return () => clearInterval(intervalId);
    }
  }, [view, tokenType]);

  const handleTokenClick = (token) => {
    setSelectedToken(token);
    setView("details");
    setTokenchain(null);
  };

  const handleBackToList = () => {
    setSelectedToken(null);
    setTokenchain(null);
    setView(tokenType === "rbt" ? "rbt-list" : "ft-list");
  };

  const handleBackToHome = () => {
    setSelectedToken(null);
    setTokenchain(null);
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

  const handleFetchFTTokenchain = async () => {
    if (!selectedToken) return;
    setTokenchainLoading(true);
    try {
      const data = await getFTTokenchain(selectedToken.tokenID);
      setTokenchain(data);
    } catch {
      setTokenchain(null);
    } finally {
      setTokenchainLoading(false);
    }
  };

  const formatHashValue = (hash, max = 32) => {
    if (!hash) return "N/A";
    if (hash.length <= max) return hash;
    return `${hash.slice(0, 16)}…${hash.slice(-16)}`;
  };

  const renderTokenchainData = (data) => {
    if (!data?.TokenChainData) return null;
    const c = data.TokenChainData;
    return (
      <div className="tokenchain-container">
        <h3 className="tokenchain-header">🔗 FT Tokenchain Details</h3>

        <div className="tokenchain-section">
          <h4>📦 Block Information</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Block Hash</span>
              <span className="value monospace">{formatHashValue(c.TCBlockHashKey)}</span>
            </div>
            {Array.isArray(c.TCChildTokenskey) && (
              <div className="info-item">
                <span className="label">Child Tokens</span>
                <span className="value">{c.TCChildTokenskey.length} item(s)</span>
              </div>
            )}
          </div>
        </div>

        {c.TCGenesisBlockKey && (
          <div className="tokenchain-section">
            <h4>🌟 Genesis Block</h4>
            <div className="info-grid">
              {Object.entries(c.TCGenesisBlockKey).map(([k, v]) => (
                <div
                  key={k}
                  className={`info-item${k === "GBInfokey" ? " full-width" : ""}`}
                >
                  <span className="label">{k.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className="value">
                    {typeof v === "string"
                      ? formatHashValue(v)
                      : JSON.stringify(v)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {c.TCSignatureKey && (
          <div className="tokenchain-section">
            <h4>✍️ Digital Signature</h4>
            <div className="info-grid">
              {Object.entries(c.TCSignatureKey).map(([k, v]) => (
                <div key={k} className="info-item full-width">
                  <span className="label monospace">{formatHashValue(k)}</span>
                  <span className="value signature-value monospace">
                    {formatHashValue(v, 64)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <details className="raw-data-section">
          <summary>🔍 View Raw JSON Data</summary>
          <pre className="raw-json">{JSON.stringify(data, null, 2)}</pre>
        </details>
      </div>
    );
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Rubix Explorer</h1>
      </header>
      <main>
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

        {(view === "rbt-list" || view === "ft-list") && (
          <>
            <button className="back-home-button" onClick={handleBackToHome}>
              ← Back to Home
            </button>
            {loading && <p>Loading tokens…</p>}
            {error && <p className="error">Error: {error}</p>}
            {!loading && !error && tokens.length === 0 && <p>No tokens found.</p>}
            {!loading && !error && tokens.length > 0 && (
              <>
                <h2>{tokenType === "rbt" ? "RBT Tokens" : "FT Tokens"}</h2>
                <ul className="token-id-list">
                  {tokens.map((t, i) => (
                    <li
                      key={i}
                      onClick={() => handleTokenClick(t)}
                      className={t.tokenID === selectedToken?.tokenID ? "selected" : ""}
                    >
                      {t.tokenID}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {view === "details" && selectedToken && (
          <div className="token-details">
            <button className="back-button" onClick={handleBackToList}>
              ← Back to Tokens
            </button>
            <h2>Token Details</h2>
            <div className="token-card">
              <h3>{selectedToken.tokenID}</h3>
              {tokenType === "rbt" ? (
                <>
                  <p><b>Parent TokenID:</b> {selectedToken.parentTokenID || "N/A"}</p>
                  <p><b>Value:</b> {selectedToken.value || "N/A"}</p>
                  <p><b>DID:</b> {selectedToken.DID || "N/A"}</p>
                  <p><b>Status:</b> {selectedToken.status}</p>
                  <p><b>State Hash:</b> {selectedToken.stateHash || "N/A"}</p>
                  <p><b>Transaction ID:</b> {selectedToken.transactionID || "N/A"}</p>
                </>
              ) : (
                <>
                  <p><b>FT Name:</b> {selectedToken.ftName || "N/A"}</p>
                  <p><b>Total Value:</b> {selectedToken.totalValue || "N/A"}</p>
                  <p><b>Owner DID:</b> {selectedToken.ownerDID || "N/A"}</p>
                  <p><b>Creator DID:</b> {selectedToken.creatorDID || "N/A"}</p>
                  <p><b>Status:</b> {selectedToken.status || "N/A"}</p>
                  <button
                    className="view-tokenchain-button"
                    onClick={handleFetchFTTokenchain}
                    disabled={tokenchainLoading}
                  >
                    {tokenchainLoading ? "⏳ Loading Tokenchain…" : "🔗 View Tokenchain"}
                  </button>
                </>
              )}
            </div>

            {tokenchain && (
              <div className="tokenchain-wrapper" style={{ marginTop: "20px" }}>
                {renderTokenchainData(tokenchain)}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
