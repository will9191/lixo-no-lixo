from fastapi import FastAPI
from models import UserMessage
from ai import chat_with_ai
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ai")
async def root():
    return {"message": "This is the LixoNoLixo AI backend service."}


@app.post("/ai/chat")
async def chat(user_message: UserMessage):
    message = user_message.message
    image = user_message.image
    response = chat_with_ai(message, image)
    return {"message": response}
