package main

import (
	"log"
	"net/http"
	"time"

	"github.com/rs/cors"
)

func main() {
	loadUsers()

	mux := http.NewServeMux()
	mux.HandleFunc("/api/register", signupHandler)
	mux.HandleFunc("/api/login", loginHandler)
	mux.HandleFunc("/api/dashboard", dashboardHandler)
	mux.HandleFunc("/api/logout", logoutHandler)
	mux.HandleFunc("/api/support", supportHandler)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	handler := c.Handler(mux)

	log.Println("Server started at :8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}
func setSessionCookie(w http.ResponseWriter, username string) {
	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   username,
		Expires: time.Now().Add(1 * time.Hour),
		Path:    "/",
	})
	log.Printf("Session cookie set for user %s", username)
}
