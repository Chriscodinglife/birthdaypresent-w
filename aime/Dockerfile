FROM python:3

COPY /app /app

COPY requirements.txt /app

WORKDIR /app

RUN pip install -r requirements

WORKDIR /app

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]