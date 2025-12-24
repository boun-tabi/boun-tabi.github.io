#!/bin/bash

cd "$(dirname "$0")"

# Check if node_modules exists, install if not
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting TABILAB website..."
echo "Open http://localhost:4321 in your browser"
npm run dev
