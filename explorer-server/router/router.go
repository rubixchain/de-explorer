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

	// Initialize dependencies
	rubixClient := client.NewRubixClient(config.RubixNodeURL)
	rbtService := services.NewRBTService(rubixClient)

	// Routes
	r.HandleFunc("/api/get-free-rbt", handlers.GetRBTHandler(rbtService)).Methods(http.MethodGet)

	return r
}
