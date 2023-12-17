#!/bin/bash

folders=("api_gateway" "user_service" "assignment_service")

current_dir=$(pwd)

# Loop through the folders and run 'npm i' in each directory
for folder in "${folders[@]}"; do
  cd "$current_dir/$folder" && sudo npm i
done
