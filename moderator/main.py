from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline

app = FastAPI()

class MessageRequest(BaseModel):
    text: str

class MessageResponse(BaseModel):
    text: str

# Загружаем модель и токенизатор один раз при старте
tokenizer = AutoTokenizer.from_pretrained("t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("t5-small")

# Создаём пайплайн для переформулирования (summarization или paraphrase)
t5_pipe = pipeline("text2text-generation", model=model, tokenizer=tokenizer)

def t5_filter(text: str) -> str:
    prompt = f"summarize: {text}"
    result = t5_pipe(prompt, max_new_tokens=64, num_return_sequences=1)
    print(result)
    return result[0]['generated_text']

@app.post("/filter", response_model=MessageResponse)
async def filter_message(req: MessageRequest):
    print(req.text)
    filtered = t5_filter(req.text)
    return MessageResponse(text=filtered)