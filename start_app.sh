#!/bin/bash

# Navigate to your project directory if necessary
# cd /path/to/your/project

# Run `npm run dev` in the background and redirect its output to a log file
cd brightedge_ui
nohup npm run dev > dev.log 2>&1 &

# Wait for a few seconds to ensure the above command starts smoothly
sleep 5

# Run `node index.js` in the background and redirect its output to another log file
cd ..
cd brightedge_ui
nohup node index.js > index.log 2>&1 &