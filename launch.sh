#!/bin/bash
# Soma - local development launcher (Mac/Linux)
# Double-click or run: bash launch.sh

echo "========================================="
echo "  Soma - starting local dev server"
echo "========================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed."
    echo "Download it from https://nodejs.org (pick the LTS version)."
    read -p "Press Enter to exit..."
    exit 1
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "WARNING: .env.local not found."
    echo "Copy .env.example to .env.local and add your keys."
    echo "See MANUAL_TASKS.md MT-001 for instructions."
    echo ""
    echo "The app will run but login and AI features will not work without keys."
    echo ""
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
    echo "Installing dependencies (first time only, may take a minute)..."
    npm install
    echo ""
fi

echo "Starting dev server..."
echo "Open http://localhost:3000 in your browser."
echo "Press Ctrl+C to stop."
echo ""
npm run dev
