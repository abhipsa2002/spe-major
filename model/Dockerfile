# Base image
FROM python:3.10 


# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Set the working directory
WORKDIR /myapp

# Install dependencies
COPY requirements.txt .
RUN pip install -r ./requirements.txt

# Copy the Django project
COPY . .

EXPOSE 8060

# Run the Django server on localhost and port 8094
CMD ["python", "manage.py", "runserver", "0.0.0.0:8060"]
