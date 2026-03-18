package omnigo

import (
	"encoding/json"
	"net/http"
	"time"
)

// CommandProcessor is a function type that takes a command and returns a response string
type CommandProcessor func(string) string

// HandleTerminal provides an HTTP handler for OmniConsole requests
func HandleTerminal(processor CommandProcessor) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Only allow POST
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		var req OmniRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		// Execute developer's logic
		result := processor(req.Command)

		resp := OmniResponse{
			Output:     result,
			Status:     "success",
			Version:    "1.0.0",
			ServerTime: time.Now(),
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}