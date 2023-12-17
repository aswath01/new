#!/bin/bash

folders=(
  "api_gateway"
  "user_service"
  "assignment_service"
)

for folder in "${folders[@]}"; do
  env_file="$folder/.env"
  echo "Creating $env_file"
  echo "USER_SERVICE_URL=http://user_service:3001" > "$env_file"
  echo "CLASSROOM_SERVICE_URL=http://localhost:3002" >> "$env_file"
  echo "ASSIGNMENT_SERVICE_URL=http://assignment_service:3003" >> "$env_file"
  echo "AUTHENTICATE_FB_KEY=AIzaSyBtGuIOhOR6D1difgbeaPQtLtHYwwGe5wM" >> "$env_file"
  echo "JWT_SECRET_KEY=AIzaSyBtGuIOhOR6D1difgbeaPQtLtHYwwGe5wM" >> "$env_file"
done
