from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OmniRequest(BaseModel):
    command: str
    timestamp: Optional[str] = None

class OmniResponse(BaseModel):
    output: str
    status: str = "success"
    version: str = "1.0.0"
    server_time: datetime = datetime.utcnow()