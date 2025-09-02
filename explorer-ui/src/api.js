// explorer-ui/src/api.js
export async function getTokens() {
  try {
    const response = await fetch("http://localhost:8081/api/get-free-rbt"); 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Map backend fields to frontend expected fields
    const tokens = (data.result || []).map(token => ({
      tokenID: token.TokenID,
      parentTokenID: token.ParentTokenID,
      value: token.TokenValue,
      DID: token.DID,
      status: token.TokenStatus,
      stateHash: token.TokenStateHash,
      transactionID: token.TransactionID,
      added: token.Added,
      syncStatus: token.SyncStatus
    }));

    return tokens;
  } catch (error) {
    console.error("Failed to fetch tokens:", error);
    return [];
  }
}
