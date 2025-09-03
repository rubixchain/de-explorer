// explorer-ui/src/api.js

// Fetch RBT Tokens
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
    console.error("Failed to fetch RBT tokens:", error);
    return [];
  }
}

// Fetch FT Tokens
export async function getFTTokens() {
  try {
    const response = await fetch("http://localhost:8081/api/get-ft"); // Use explorer-server proxy, not node port directly
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Map backend fields to frontend expected fields
        const tokens = (data.result || []).map(token => ({
      tokenID: token.TokenID,
      ftName: token.FTName,              
      // symbol: "N/A",                    
      totalValue: token.TokenValue,     
      ownerDID: token.DID,               
      creatorDID: token.CreatorDID,      
      status: token.TokenStatus,
      stateHash: token.TokenStateHash,
      transactionID: token.TransactionID
    }));

    return tokens;
  } catch (error) {
    console.error("Failed to fetch FT tokens:", error);
    return [];
  }
}
