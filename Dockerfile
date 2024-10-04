# Fase 1: Builder
FROM python:3.10-slim AS builder

RUN apt-get update && apt-get install -y curl tar supervisor && rm -rf /var/lib/apt/lists/*

RUN curl -L https://ollama.com/download/ollama-linux-amd64.tgz -o ollama-linux-amd64.tgz \
    && tar -C /usr -xzf ollama-linux-amd64.tgz \
    && rm ollama-linux-amd64.tgz

COPY requirements.txt /app/
WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

RUN chmod +x /app/start.sh

EXPOSE 8000 11434
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord"]
