package handlers

import (
	"encoding/json"
	"net/http"

	"explorer-server/services"
)

func GetFTHandler(service *services.FTService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		result, err := service.GetFTTokens()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(result)
	}
}
