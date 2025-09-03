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
type FTToken struct {
	TokenID        string  `json:"TokenID"`
	FTName         string  `json:"FTName"`
	DID            string  `json:"DID"`
	CreatorDID     string  `json:"CreatorDID"`
	TokenStatus    int     `json:"TokenStatus"`
	TokenValue     float64 `json:"TokenValue"`
	TokenStateHash string  `json:"TokenStateHash"`
	TransactionID  string  `json:"TransactionID"`
}

type GetFTResponse struct {
	Status  bool      `json:"status"`
	Message string    `json:"message"`
	Result  []FTToken `json:"result"`
}
