package client

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"explorer-server/model"
)

type RubixClient struct {
	BaseURL string
	Timeout time.Duration
}

func NewRubixClient(url string) *RubixClient {
	return &RubixClient{
		BaseURL: url,
		Timeout: 10 * time.Second, // Add timeout for safety
	}
}

func (c *RubixClient) GetFreeRBTs() (*model.GetFreeRBTResponse, error) {
	client := &http.Client{Timeout: c.Timeout}
	url := fmt.Sprintf("%s/api/de-exp/get-rbt", c.BaseURL)

	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to call Rubix Node: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status from Rubix Node: %d", resp.StatusCode)
	}

	var data model.GetFreeRBTResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}
	return &data, nil
}

func (c *RubixClient) GetFTs() (*model.GetFTResponse, error) {
	client := &http.Client{Timeout: c.Timeout}
	url := fmt.Sprintf("%s/api/de-exp/get-ft", c.BaseURL)

	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to call Rubix Node (FT): %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status from Rubix Node: %d", resp.StatusCode)
	}

	var data model.GetFTResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("failed to decode FT response: %w", err)
	}
	return &data, nil
}
