#!/bin/sh

ollama start --port 11234 &

uvicorn main:app --host 0.0.0.0 --port 8000
