package main

import (
	"encoding/json"
	"log"
	"os"
)

type User struct {
	Username    string `json:"username"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Age         string `json:"age"`
	Phonenumber string `json:"phone_number"`
	Address     string `json:"address"`
}


func init() {
	loadUsers()
}
func loadUsers() {
	file, err := os.ReadFile("users.json")
	if err != nil {
		if os.IsNotExist(err) {
			users = []User{}
			return
		}
		log.Fatalf("Error reading users file: %v", err)
	}
	var loadedUsers []User
	err = json.Unmarshal(file, &loadedUsers)
	if err != nil {
		log.Fatalf("Error unmarshalling users file: %v", err)
	}
	users = loadedUsers
}

func saveUsers() {
	file, err := json.MarshalIndent(users, "", "  ")
	if err != nil {
		log.Fatalf("Error marshalling users: %v", err)
	}
	err = os.WriteFile("users.json", file, 0644)
	if err != nil {
		log.Fatalf("Error writing users file: %v", err)
	}
}
