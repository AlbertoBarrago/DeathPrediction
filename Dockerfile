FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt
RUN pip install ollama && \
    ollama --version

which ollama

COPY . /app

RUN chmod +x /app/start.sh

EXPOSE 8000 11234

CMD ["/app/start.sh"]
