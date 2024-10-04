FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

RUN pip install ollama

COPY . /app

EXPOSE 8000 11234

CMD ["sh", "-c", "ollama start --port 11234 & uvicorn main:app --host 0.0.0.0 --port 8000"]
