from fastapi import FastAPI, APIRouter
from omni_fastapi import use_omni_console
import uvicorn

app = FastAPI(title="OmniConsole Python Backend")
router = APIRouter()

# Logic handler for terminal commands
def my_terminal_logic(cmd: str) -> str:
    cmd = cmd.lower().strip()
    if cmd == "status":
        return "Python Backend is Healthy. RAM Usage: 42MB"
    elif cmd == "whoami":
        return "Current User: PythonDeveloper"
    return f"Python processed: {cmd}"

# Register OmniConsole at "/api/terminal"
use_omni_console(router, "/api/terminal", my_terminal_logic)

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)