FROM python:3.10-slim

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt
RUN pip install ollama

EXPOSE 11234

CMD ["ollama", "start", "--port", "11234"]
