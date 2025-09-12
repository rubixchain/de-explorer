// Fetch RBT Tokens
export async function getTokens() {
  try {
    const response = await fetch("http://localhost:8081/api/get-free-rbt");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

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
    const response = await fetch("http://localhost:8081/api/get-ft");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const tokens = (data.result || []).map(token => ({
      tokenID: token.TokenID,
      ftName: token.FTName,
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

// Fetch FT Tokenchain
export async function getFTTokenchain(tokenID) {
  try {
    const response = await fetch(`http://localhost:8081/api/get-ft-token-chain?tokenID=${tokenID}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch FT tokenchain:", error);
    return null;
  }
}
