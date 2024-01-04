#!/bin/bash

cd api_gateway
docker build -t api_gateway .
cd ..   

cd assignment_service
docker build -t assignment_service .
cd ..

cd user_service
docker build -t user_service .
cd ..