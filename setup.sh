#!/bin/bash
# Quick Start Script for Climate-Aware Crop Stress Monitoring System

echo "🌾 Climate-Aware Crop Stress Monitoring System"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+"
    exit 1
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "⚠️  Python3 not found. ML service setup will be skipped"
fi

echo -e "${GREEN}✓ Prerequisites checked${NC}"
echo ""

# Setup Frontend
echo -e "${BLUE}[1/3] Setting up Frontend...${NC}"
cd frontend || exit
npm install
if [ ! -f .env ]; then
    cp ../.env.example .env
    echo "⚠️  Created .env - Update with your Firebase credentials"
fi
echo -e "${GREEN}✓ Frontend ready${NC}"
cd .. || exit

# Setup Backend
echo ""
echo -e "${BLUE}[2/3] Setting up Backend...${NC}"
cd backend || exit
npm install
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Created .env - Update with your Firebase credentials"
fi
echo -e "${GREEN}✓ Backend ready${NC}"
cd .. || exit

# Setup ML Service (Optional)
echo ""
echo -e "${BLUE}[3/3] ML Service (Optional)${NC}"
if command -v python3 &> /dev/null; then
    cd ml-service || exit
    python3 -m venv venv
    source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
    pip install -r requirements.txt
    echo -e "${GREEN}✓ ML service environment ready${NC}"
    cd .. || exit
else
    echo "⚠️  Python not installed, skipping ML service setup"
fi

echo ""
echo -e "${GREEN}=== Setup Complete ===${NC}"
echo ""
echo "To start development:"
echo "  Terminal 1: cd frontend && npm run dev"
echo "  Terminal 2: cd backend && npm run dev"
echo "  Terminal 3: cd ml-service && python app.py (optional)"
echo ""
echo "Access the app at: http://localhost:5173"
echo ""
echo "Documentation:"
echo "  - docs/SETUP.md - Full setup instructions"
echo "  - docs/ARCHITECTURE.md - System design"
echo "  - docs/API.md - API endpoints"
