# 🚀 OmniConsole v1.0.0

**OmniConsole** is a lightweight, high-performance, and universal Terminal UI component. It allows developers to integrate a fully functional, hacker-style command-line interface into their web applications with seamless backend integration for **C# (.NET)**, **Python (FastAPI)**, **PHP**, and **Go**.

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Powered By](https://img.shields.io/badge/Powered%20By-Qubi%20Software-orange)

---

## ✨ Features

* **🌐 Multi-Language Support:** Official wrappers for .NET Core, FastAPI, PHP (Vanilla/Laravel), and Golang.
* **🧩 Plug-and-Play:** Custom Web Component (`<omni-console>`) that works in any HTML environment.
* **⌨️ Professional UX:** Support for **Tab Autocomplete** and **Command History** (Up/Down arrows).
* **🎨 HTML Rendering:** Send rich content like links, tables, and buttons directly from your backend.
* **⚡ High Performance:** Zero dependencies. Built with pure JavaScript, Shadow DOM, and CSS.
* **🛡️ Customization:** Pre-built themes (Matrix, Dracula) and a havalı ASCII art header.

---

## 🛠️ Quick Start (Frontend)

Simply include the core script and add the custom element to your page.

```html
<script src="core/omni-console.js"></script>

<omni-console
  theme="dracula"
  api-url="http://127.0.0.1:8000/api/terminal">
</omni-console>
```

---

## 🔌 Official Backend Wrappers

OmniConsole follows a standardized JSON protocol. Pick your stack and start processing commands:

### 🐍 Python (FastAPI)

```python
from wrappers.omni_python.omni_fastapi import use_omni_console

def process_logic(cmd: str):
    return f"Python (FastAPI) received: {cmd.upper()}"

use_omni_console(app, "/api/terminal", process_logic)
```

### ⚡ .NET Core (C#)

```csharp
app.UseOmniConsole("/api/terminal", (cmd) => {
    return $"DotNet Response: {cmd}";
});
```

### 🐘 PHP (Vanilla & Frameworks)

```php
use OmniConsole\PHP\OmniConsole;

OmniConsole::handle(function($cmd) {
    return "PHP Backend: " . htmlspecialchars($cmd);
});
```

### 🐹 Go (Golang)

```go
import "omnigo"

handler := omnigo.HandleTerminal(func(cmd string) string {
    return "Gopher processed: " + cmd
})
http.HandleFunc("/api/terminal", handler)
```

---

## 📂 Project Structure

* `core/`: The main JavaScript Web Component and CSS engine.
* `wrappers/`: Official backend connectors for various languages.
* `examples/`: Ready-to-run demo projects for quick testing.
* `specs/`: JSON schemas and API documentation.

---

## ⌨️ Built-in Keybindings

| Key | Action |
| --- | --- |
| Enter | Submits the current command to local/API logic |
| Tab | Autocompletes the current command based on available list |
| Up / Down | Navigates through your command history |
| Clear | Wipes the terminal output |

---

## 🤝 Contributing

Contributions are welcome! If you want to add a wrapper for a new language (Node.js, Rust, Ruby), please follow our standardized JSON spec in the `specs/` folder.

---

## 👤 Author

**Qubi Software**

Founder: Muhammet Ensar Beyazkılınç  
GitHub: `@QubiSoftware`  
Website: https://qubisoftware.net
