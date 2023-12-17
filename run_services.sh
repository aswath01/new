folders=("api_gateway" "user_service" "assignment_service")

current_dir=$(pwd)
# Loop through the folders and open terminals, running 'npm run dev'
for folder in "${folders[@]}"; do
  osascript -e "tell application \"Terminal\" to do script \"cd $current_dir/$folder && npm run dev\""
done