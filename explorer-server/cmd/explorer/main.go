package main

import (
	"log"
	"net/http"

	"explorer-server/router"

	"github.com/rs/cors"
)

func main() {
	// Use the mux router from router.go
	r := router.NewRouter()

	// Wrap with CORS
	handler := cors.Default().Handler(r)

	log.Println("✅ Explorer server running on :8081 with CORS enabled")
	log.Fatal(http.ListenAndServe(":8081", handler))
}
