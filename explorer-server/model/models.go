package model

type Token struct {
	TokenID        string  `json:"TokenID"`
	ParentTokenID  string  `json:"ParentTokenID"`
	TokenValue     float64 `json:"TokenValue"`
	DID            string  `json:"DID"`
	TokenStatus    int     `json:"TokenStatus"`
	TokenStateHash string  `json:"TokenStateHash"`
	TransactionID  string  `json:"TransactionID"`
	Added          bool    `json:"Added"`
	SyncStatus     int     `json:"SyncStatus"`
}

type GetFreeRBTResponse struct {
	Status  bool    `json:"status"`
	Message string  `json:"message"`
	Result  []Token `json:"result"`
}
