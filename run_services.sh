folders=("api_gateway" "user_service" "assignment_service")

current_dir=$(pwd)
# Loop through the folders and open terminals, running 'npm run dev'
for folder in "${folders[@]}"; do
  cd "$current_dir/$folder" && npm run dev
done
