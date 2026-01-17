#!/usr/bin/env node
/**
 * Project Information Script
 * Run this to see project statistics and quick info
 * node info.js
 */

const fs = require('fs');
const path = require('path');

function countFiles(dir, ext = '') {
  try {
    const files = fs.readdirSync(dir);
    let count = 0;
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        if (!ext || file.endsWith(ext)) count++;
      } else if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        count += countFiles(fullPath, ext);
      }
    });
    return count;
  } catch (e) {
    return 0;
  }
}

console.log('\n🌾 Climate-Aware Crop Stress Monitoring System');
console.log('============================================\n');

console.log('📊 Project Statistics:');
console.log(`   Frontend files: ${countFiles('./frontend/src', '.jsx')} components`);
console.log(`   Backend files: ${countFiles('./backend/src', '.js')} files`);
console.log(`   Documentation: ${countFiles('./docs', '.md')} guides`);
console.log(`   Total configuration: ${countFiles('.', '.json')} package files\n`);

console.log('📁 Directory Structure:');
console.log('   ✓ frontend/          - React web application');
console.log('   ✓ backend/           - Node.js + Express API');
console.log('   ✓ ml-service/        - Python ML service (reference)');
console.log('   ✓ docs/              - Comprehensive documentation\n');

console.log('📚 Documentation Files:');
console.log('   ✓ README.md          - Project overview');
console.log('   ✓ QUICKSTART.md      - Quick reference guide');
console.log('   ✓ STRUCTURE.md       - Detailed folder structure');
console.log('   ✓ PROJECT_COMPLETE.md - Completion summary');
console.log('   ✓ FILE_INVENTORY.md  - Complete file listing');
console.log('   ✓ docs/SETUP.md      - Setup instructions');
console.log('   ✓ docs/ARCHITECTURE.md - System design');
console.log('   ✓ docs/API.md        - API reference\n');

console.log('🚀 Quick Start Commands:');
console.log('   1. cd frontend && npm install && npm run dev');
console.log('   2. cd backend && npm install && npm run dev');
console.log('   3. cd ml-service && pip install -r requirements.txt && python app.py\n');

console.log('🔗 Access Points:');
console.log('   Frontend:  http://localhost:5173');
console.log('   Backend:   http://localhost:5000/api');
console.log('   ML Service: http://localhost:5001/api\n');

console.log('📖 Start Here:');
console.log('   1. Read QUICKSTART.md');
console.log('   2. Open docs/index.html in browser');
console.log('   3. Follow docs/SETUP.md\n');

console.log('✨ Status: READY FOR DEVELOPMENT\n');
