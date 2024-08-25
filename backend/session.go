package main

// import (
// 	"crypto/rand"
// 	"encoding/hex"
// 	"sync"
// )

// var (
// 	sessions  = map[string]string{}
// 	sessionMu sync.Mutex
// )

// func createSession(username string) string {
// 	sessionMu.Lock()
// 	defer sessionMu.Unlock()

// 	sessionID := generateSessionID()
// 	sessions[sessionID] = username
// 	return sessionID
// }

// func getSessionUser(sessionID string) (string, bool) {
// 	sessionMu.Lock()
// 	defer sessionMu.Unlock()

// 	username, exists := sessions[sessionID]
// 	return username, exists
// }

// func deleteSession(sessionID string) {
// 	sessionMu.Lock()
// 	defer sessionMu.Unlock()

// 	delete(sessions, sessionID)
// }

// func generateSessionID() string {
// 	b := make([]byte, 16)
// 	rand.Read(b)
// 	return hex.EncodeToString(b)
// }
