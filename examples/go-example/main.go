package main

import (
	"fmt"
	"net/http"
	"omnigo" // Standard wrapper
)

func main() {
	handler := omnigo.HandleTerminal(func(cmd string) string {
		return fmt.Sprintf("Gopher says: I got your '%s' command!", cmd)
	})

	http.HandleFunc("/api/terminal", handler)
	fmt.Println("Go Example running on :8080")
	http.ListenAndServe(":8080", nil)
}