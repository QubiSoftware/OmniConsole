/**
 * OmniConsole v1.0.0
 * Lightweight Universal Terminal UI
 * Developed by Qubi Software
 */

class OmniConsole extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Internal command mapping (Local Mode)
        this.localCommands = {
            "help": "Available commands: info, projects, clear, contact, status",
            "info": "OmniConsole v1.0.0 - A high-performance terminal component.",
            "projects": "Current Projects: \n- Qubi Learn\n- OmniConsole",
            "contact": "E-mail: contact@qubisoftware.net | Github: @QubiSoftware",
            "status": "System is running at peak performance."
        };
        
        this.apiUrl = this.getAttribute('api-url');
        this.history = [];
        this.historyIndex = -1;
    }

    connectedCallback() {
        this.render();
        this.initEventListeners();
        
        // Havalı Karşılama Logosu (ASCII Art)
        const header = `
<span style="color: #50fa7b;">
 ██████╗ ██╗   ██╗██████╗ ██╗    ███████╗ ██████╗ ███████╗████████╗
██╔═══██╗██║   ██║██╔══██╗██║    ██╔════╝██╔═══██╗██╔════╝╚══██╔══╝
██║   ██║██║   ██║██████╔╝██║    ███████╗██║   ██║█████╗     ██║   
██║▄▄ ██║██║   ██║██╔══██╗██║    ╚════██║██║   ██║██╔══╝     ██║   
╚██████╔╝╚██████╔╝██████╔╝██║    ███████║╚██████╔╝██║        ██║   
 ╚════▀╝  ╚═════╝ ╚═════╝ ╚═╝    ╚══════╝ ╚═════╝ ╚═╝        ╚═╝   
</span>
<span style="color: #ff79c6;">[ v1.0.0 - Developed by Qubi Software ]</span>
<span style="color: #8be9fd;">Type 'help' to see available commands.</span>
------------------------------------------------------------------
`;
        this.printLine(header, 'system', true); // HTML desteğiyle basıyoruz
        this.typeWrite("OmniConsole v1.0.0 (Global Edition) initialized.");
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host { display: block; width: 100%; box-sizing: border-box; }
            .terminal { 
                background: #0d0d0d; color: #00ff41; padding: 25px; 
                border-radius: 10px; height: 450px; overflow-y: auto; 
                font-family: 'Fira Code', 'JetBrains Mono', monospace; 
                border: 1px solid #333; box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            }
            .output-line { margin-bottom: 8px; white-space: pre-wrap; font-size: 14px; }
            .input-wrap { display: flex; margin-top: 15px; }
            .prompt { color: #8be9fd; margin-right: 12px; font-weight: bold; }
            input { 
                background: transparent; border: none; color: #f8f8f2; 
                outline: none; flex: 1; font-family: inherit; font-size: 14px; 
            }
            .error { color: #ff5555; }
            .system { color: #bd93f9; }
            
            .terminal::-webkit-scrollbar { width: 6px; }
            .terminal::-webkit-scrollbar-track { background: #0d0d0d; }
            .terminal::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }
        </style>
        <div class="terminal" id="terminal-screen">
            <div id="output-area"></div>
            <div class="input-wrap">
                <span class="prompt">visitor@omni:~$</span>
                <input type="text" id="command-input" spellcheck="false" autocomplete="off" autofocus>
            </div>
        </div>
        `;
    }

    initEventListeners() {
        const input = this.shadowRoot.getElementById('command-input');
        const screen = this.shadowRoot.getElementById('terminal-screen');

        screen.onclick = () => input.focus();

        input.onkeydown = async (e) => {
            // TAB Tuşu Desteği (Autocomplete)
            if (e.key === 'Tab') {
                e.preventDefault();
                this.handleAutocomplete(input);
            }
            
            if (e.key === 'Enter') {
                const cmd = input.value.trim();
                if (!cmd) return;

                this.printLine(`visitor@omni:~$ ${cmd}`, 'user');
                input.value = '';

                if (cmd.toLowerCase() === 'clear') {
                    this.shadowRoot.getElementById('output-area').innerHTML = '';
                    return;
                }

                await this.processCommand(cmd);
                this.history.push(cmd);
                this.historyIndex = this.history.length;
            } else if (e.key === 'ArrowUp') {
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                this.navigateHistory(1);
            }
        };
    }

    handleAutocomplete(input) {
        const currentVal = input.value.toLowerCase().trim();
        if (!currentVal) return;

        // Tamamlanabilir komut listesi
        const commands = Object.keys(this.localCommands).concat(['clear', 'exit']);
        
        const match = commands.find(c => c.startsWith(currentVal));
        if (match) {
            input.value = match;
        }
    }

    async processCommand(cmd) {
        const lowerCmd = cmd.toLowerCase();

        if (this.localCommands[lowerCmd]) {
            this.typeWrite(this.localCommands[lowerCmd]);
        } 
        else if (this.apiUrl) {
            try {
                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ command: cmd })
                });
                const data = await response.json();
                this.typeWrite(data.output || "Server returned an empty response.");
            } catch (err) {
                this.printLine(`Network Error: Ensure your OmniConsole wrapper is running at ${this.apiUrl}`, 'error');
            }
        } 
        else {
            this.printLine(`Command not found: ${cmd}.`, 'error');
        }
    }

    // HTML desteği için isHtml parametresi eklendi
    printLine(text, type = '', isHtml = false) {
        const outputArea = this.shadowRoot.getElementById('output-area');
        const div = document.createElement('div');
        div.className = `output-line ${type}`;
        
        if (isHtml) {
            div.innerHTML = text;
        } else {
            div.textContent = text;
        }
        
        outputArea.appendChild(div);
        this.scrollToBottom();
    }

    typeWrite(text) {
        const outputArea = this.shadowRoot.getElementById('output-area');
        const div = document.createElement('div');
        div.className = 'output-line system';
        outputArea.appendChild(div);

        let i = 0;
        const speed = 10;
        const interval = setInterval(() => {
            if (i < text.length) {
                div.textContent += text.charAt(i);
                i++;
                this.scrollToBottom();
            } else {
                clearInterval(interval);
            }
        }, speed);
    }

    scrollToBottom() {
        const screen = this.shadowRoot.getElementById('terminal-screen');
        screen.scrollTop = screen.scrollHeight;
    }

    navigateHistory(direction) {
        const input = this.shadowRoot.getElementById('command-input');
        this.historyIndex += direction;
        if (this.historyIndex < 0) this.historyIndex = 0;
        if (this.historyIndex >= this.history.length) {
            this.historyIndex = this.history.length;
            input.value = '';
        } else {
            input.value = this.history[this.historyIndex];
        }
    }
}

customElements.define('omni-console', OmniConsole);