from pydantic import BaseModel


class UserMessage(BaseModel):
    message: str
    image: str | None = None
