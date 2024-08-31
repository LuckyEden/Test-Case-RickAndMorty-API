# backend/Dockerfile
FROM python:3.11.5-bullseye

# Projede makefile kullanıldığı için make yüklenmesi gerekiyor
RUN apt-get update && apt-get install -y make && rm -rf /var/lib/apt/lists/*

WORKDIR /*

# Dependencies kurulumu
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy  
COPY . .

# Expose  
EXPOSE 8000
 
 