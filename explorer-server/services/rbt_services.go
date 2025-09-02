package services

import (
	"explorer-server/client"
	"explorer-server/model"
)

type RBTService struct {
	client *client.RubixClient
}

func NewRBTService(c *client.RubixClient) *RBTService {
	return &RBTService{client: c}
}

func (s *RBTService) FetchFreeRBTs() (*model.GetFreeRBTResponse, error) {
	return s.client.GetFreeRBTs()
}
