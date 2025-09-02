import React from "react";

function TokenList({ tokens }) {
  if (tokens.length === 0) {
    return <p>No tokens found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Token ID</th>
          <th>Parent Token</th>
          <th>Value</th>
          <th>DID</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token, index) => (
          <tr key={index}>
            <td>{token.TokenID}</td>
            <td>{token.ParentTokenID}</td>
            <td>{token.TokenValue}</td>
            <td>{token.DID}</td>
            <td>{token.TokenStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TokenList;
