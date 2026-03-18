# OmniConsole Communication Protocol (v1.0)

This document defines the standard communication interface between the OmniConsole Frontend (Web Component) and any backend wrapper. To ensure compatibility, all custom wrappers must adhere to this specification.

---

## 1. Transport Layer

- **Protocol:** HTTP/1.1 veya HTTP/2
- **Method:** `POST`
- **Content-Type:** `application/json`

The backend wrapper must expose a terminal endpoint (e.g. `/api/terminal`) that accepts `POST` requests.

---

## 2. Request Schema (Frontend -> Backend)

When the user presses `Enter` (and the command is not handled locally), the frontend sends a JSON payload to the backend.

### JSON Yapısı

| Field | Type | Description |
| :--- | :--- | :--- |
| `command` | string | The raw command text entered by the user |
| `timestamp` | string (optional) | Optional ISO 8601 formatted local time string |

### Örnek Request

```json
{
  "command": "get_status --verbose",
  "timestamp": "2026-03-19T01:15:00Z"
}
```

---

## 3. Response Schema (Backend -> Frontend)

The backend must respond with a JSON object.

### JSON Yapısı

| Field | Type | Description |
| :--- | :--- | :--- |
| `output` | string | The message to display. Supports plain text and HTML. |
| `status` | string | Execution status: `success`, `error`, `warning` |
| `version` | string | The version of the wrapper (Current: `1.0.0`) |
| `server_time` | string (optional) | Optional server-side timestamp |

### Example Response

```json
{
  "output": "System <b>Active</b>. Load: 12%",
  "status": "success",
  "version": "1.0.0",
  "server_time": "2026-03-19 01:15:05"
}
```

---

## 4. HTML Rendering Rules

OmniConsole supports a subset of HTML for rich terminal outputs.

- **Allowed tags:** `<b>`, `<i>`, `<u>`, `<a>`, `<span>`, `<ul>`, `<li>`, `<table>`, `<img>`
- **Security:** All `<a>` tags should ideally open in a new tab using `target="_blank"`.
- **Styling:** Inline CSS via `style="..."` is permitted for color and spacing.

Note: Backends should avoid returning disallowed tags/attributes.

---

## 5. Standard Status Codes

Wrappers should return appropriate HTTP status codes:

- **`200 OK`**: Command processed successfully.
- **`400 Bad Request`**: Malformed JSON or empty command.
- **`405 Method Not Allowed`**: If a GET request is sent to the terminal endpoint.
- **`500 Internal Server Error`**: Unexpected backend logic failure.

---

## 6. Implementation Checklist for New Wrappers

To create a new OmniConsole wrapper:

1. Setup a `POST` route at `/api/terminal` (or a custom path).
2. Enable CORS for all origins (`*`) or specific frontend domains.
3. Parse the `command` from the request body.
4. Execute the logic and return the standardized JSON response.

---

## Credits

Created by Qubi Software - Standardizing the Terminal Experience.