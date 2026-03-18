from fastapi import APIRouter, HTTPException
from .models import OmniRequest, OmniResponse
from typing import Callable

def use_omni_console(router: APIRouter, path: str, command_processor: Callable[[str], str]):
    """
    Registers the OmniConsole terminal route to a FastAPI router.
    """
    @router.post(path, response_model=OmniResponse)
    async def process_terminal_command(request: OmniRequest):
        try:
            # Execute the developer's custom logic
            result = command_processor(request.command)
            
            return OmniResponse(output=result)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))