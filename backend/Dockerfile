FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

ENV ENVIRONMENT=production

CMD [ "uvicorn", "app.main:app", "--port", "8000", "--host", "0.0.0.0" ]