FROM python:3.10-slim

RUN apt-get update && apt-get install -y gcc libffi-dev libssl-dev

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app

EXPOSE 8000

RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
