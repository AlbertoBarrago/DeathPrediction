import os

import requests
from pydantic import BaseModel
from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from dataclasses import dataclass
import markdown
from starlette.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get('/favicon.ico')
async def favicon():
    file_name = "favicon.ico"
    file_path = os.path.join(app.root_path, "static", file_name)
    return FileResponse(path=file_path, headers={"Content-Disposition": "attachment; filename=" + file_name})


@dataclass
class GenerateRequest(BaseModel):
    start_year: int = Form(...),
    end_year: int = Form(...),
    profession: str = Form(...),
    language: str = Form(...)
    name: str = Form(...)


@app.post("/generate")
async def predict(data: GenerateRequest = Form()):
    prompt = (
        f"Generate a funny prediction for {data.name} about their life from {data.start_year} to {data.end_year}. "
        f"Their job is {data.profession}. "
        f"Write the prompt in {data.language}. "
        f"Make it fun and lighthearted. "
        f"Format it in markdown without using '\\n'."
    )

    # Use correct port 11234
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "llama3.1", "prompt": prompt, "stream": False}
        )
        response.raise_for_status()
        return markdown.markdown(response.json()["response"].replace('\n', '<br/>').replace('"', ''))
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with Ollama: {str(e)}")
