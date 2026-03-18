package omnigo

import "time"

// OmniRequest represents the incoming JSON payload
type OmniRequest struct {
	Command   string `json:"command"`
	Timestamp string `json:"timestamp,omitempty"`
}

// OmniResponse represents the standard outgoing JSON payload
type OmniResponse struct {
	Output     string    `json:"output"`
	Status     string    `json:"status"`
	Version    string    `json:"version"`
	ServerTime time.Time `json:"server_time"`
}