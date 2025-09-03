package router

import (
	"net/http"

	"explorer-server/client"
	"explorer-server/config"
	"explorer-server/handlers"
	"explorer-server/services"

	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	r := mux.NewRouter()

	// Initialize Rubix client
	rubixClient := client.NewRubixClient(config.RubixNodeURL)

	// Services
	rbtService := services.NewRBTService(rubixClient)
	ftService := services.NewFTService(rubixClient)

	// Routes
	r.HandleFunc("/api/get-free-rbt", handlers.GetRBTHandler(rbtService)).Methods(http.MethodGet)
	r.HandleFunc("/api/get-ft", handlers.GetFTHandler(ftService)).Methods(http.MethodGet)

	return r
}
