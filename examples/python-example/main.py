import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(current_dir, '..', '..'))
sys.path.insert(0, root_dir)

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from wrappers.omni_python.omni_fastapi import use_omni_console

app = FastAPI(title="OmniConsole Python Example")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def process_logic(cmd: str):
    return f"Python (FastAPI) received: {cmd.upper()}"

use_omni_console(app, "/api/terminal", process_logic)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)