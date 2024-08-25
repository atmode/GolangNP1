package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"sync"
	"time"
)

type SupportRequest struct {
	Email   string `json:"email"`
	Problem string `json:"problem"`
}

var fileMutex sync.Mutex

func supportHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var supportRequest SupportRequest
	err := json.NewDecoder(r.Body).Decode(&supportRequest)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	log.Printf("Support request received from %s: %s", supportRequest.Email, supportRequest.Problem)

	// Here you could add code to send an email or save the support request to a database

	if err := saveSupportRequest(supportRequest); err != nil {
		http.Error(w, "Failed to save support request", http.StatusInternalServerError)
		return
	}

	response := map[string]string{"message": "Your support request has been submitted successfully!"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func saveSupportRequest(supportRequest SupportRequest) error {
	fileMutex.Lock()
	defer fileMutex.Unlock()

	file, err := os.OpenFile("support_requests.json", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	// Read existing support requests
	var requests []SupportRequest
	if err := json.NewDecoder(file).Decode(&requests); err != nil {
		return err
	}

	// Append the new support request
	requests = append(requests, supportRequest)

	// Write back all support requests
	file.Seek(0, 0)
	file.Truncate(0)
	if err := json.NewEncoder(file).Encode(requests); err != nil {
		return err
	}

	return nil
}

var users []User

func hashPassword(password string) string {
	hash := sha256.New()
	hash.Write([]byte(password))
	return hex.EncodeToString(hash.Sum(nil))
}

func signupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var newUser User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if newUser.Username == "" || newUser.Email == "" || newUser.Password == "" ||
		newUser.FirstName == "" || newUser.LastName == "" || newUser.Age == "" ||
		newUser.Phonenumber == "" || newUser.Address == "" {
		http.Error(w, "Missing fields in request body", http.StatusBadRequest)
		return
	}
	newUser.Password = hashPassword(newUser.Password)

	users = append(users, newUser)
	saveUsers()

	setSessionCookie(w, newUser.Username)
	log.Printf("User %s signed up and session cookie set", newUser.Username)

	response := map[string]string{"message": "کاربر با موفقیت ثبت نام شد!"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)

}
func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var loginUser User
	err := json.NewDecoder(r.Body).Decode(&loginUser)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	for _, user := range users {
		if user.Username == loginUser.Username && user.Password == hashPassword(loginUser.Password) {
			setSessionCookie(w, user.Username)
			response := map[string]string{"message": "Login successful!"}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	http.Error(w, "Invalid username or password", http.StatusUnauthorized)
}

func logoutHandler(w http.ResponseWriter, r *http.Request) {
	// Clear the session cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   "",
		Expires: time.Now().Add(-1 * time.Hour),
		Path:    "/",
	})

	response := map[string]string{"message": "Logged out successfully!"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func dashboardHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	username := cookie.Value
	var currentUser User
	for _, user := range users {
		if user.Username == username {
			currentUser = user
			break
		}
	}

	if currentUser.Username == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(currentUser)
}
