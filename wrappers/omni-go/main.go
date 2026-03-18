package main

import (
	"fmt"
	"net/http"
	"strings"
	"omnigo" // Assuming local module or go mod link
)

func main() {
	// Terminal Logic Handler
	myLogic := func(cmd string) string {
		cmd = strings.ToLower(strings.TrimSpace(cmd))
		
		switch cmd {
		case "status":
			return "Go Backend: High Performance Mode Active. Latency: <1ms"
		case "whoami":
			return "Current User: Gopher (Qubi Software)"
		case "help":
			return "Available: status, whoami, help"
		default:
			return fmt.Sprintf("Go processed: %s", cmd)
		}
	}

	// Register Route at "/api/terminal"
	http.HandleFunc("/api/terminal", omnigo.HandleTerminal(myLogic))

	fmt.Println("OmniConsole Go Backend running on :8080")
	http.ListenAndServe(":8080", nil)
}