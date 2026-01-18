#!/usr/bin/env node

/**
 * ML Service Startup Script
 * Starts the FastAPI ML service with all checks and verifications
 * 
 * Usage: node start-ml.js
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
const { exec } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}❌${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ️${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️${colors.reset} ${msg}`),
  task: (msg) => console.log(`${colors.cyan}→${colors.reset} ${msg}`)
};

// Configuration
const ML_SERVICE_DIR = path.join(__dirname, 'ml-service');
const ML_PORT = 8001;
const ML_URL = `http://localhost:${ML_PORT}`;
const DASHBOARD_URL = 'http://localhost:8000/dashboard';
const HEALTH_ENDPOINT = `${ML_URL}/api/health`;
const MAX_RETRIES = 30;
const RETRY_DELAY = 1000;

// Main execution
async function main() {
  console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.cyan}  🚀 ML SERVICE STARTUP${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);

  try {
    // Step 1: Check Python installation
    log.task('Step 1/5: Checking Python installation...');
    await checkPython();
    log.success('Python found');

    // Step 2: Install dependencies
    log.task('Step 2/5: Installing Python dependencies...');
    await installDependencies();
    log.success('Dependencies installed');

    // Step 3: Check and kill existing process on port 5000
    log.task('Step 3/5: Checking port 5000...');
    await checkAndKillPort(ML_PORT);
    log.success('Port 5000 is available');

    // Step 4: Start ML service
    log.task('Step 4/5: Starting ML service...');
    startMLService();
    log.success('ML service process started');

    // Step 5: Wait for service to be ready
    log.task('Step 5/5: Waiting for service to be ready...');
    await waitForService(HEALTH_ENDPOINT, MAX_RETRIES, RETRY_DELAY);
    log.success('ML service is running');

    // Final messages
    console.log(`\n${colors.green}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.green}  ✨ ML SERVICE READY${colors.reset}`);
    console.log(`${colors.green}${'='.repeat(60)}${colors.reset}\n`);
    
    log.info(`ML Service URL: ${ML_URL}`);
    log.info(`Health Check: ${HEALTH_ENDPOINT}`);
    log.info(`API Docs: ${ML_URL}/docs`);
    log.info(`Dashboard: ${DASHBOARD_URL}`);
    
    console.log('');
    log.success('Opening dashboard in browser...');
    openBrowser(DASHBOARD_URL);

    console.log(`\n${colors.cyan}All services are ready! 🎉${colors.reset}\n`);

  } catch (error) {
    log.error(`Startup failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Check if Python is installed
 */
function checkPython() {
  return new Promise((resolve, reject) => {
    exec('python --version', (error, stdout) => {
      if (error) {
        reject(new Error('Python not found. Please install Python 3.8 or higher.'));
      } else {
        log.info(`Found: ${stdout.trim()}`);
        resolve();
      }
    });
  });
}

/**
 * Install Python dependencies using pip
 */
function installDependencies() {
  return new Promise((resolve, reject) => {
    const requirementsPath = path.join(ML_SERVICE_DIR, 'requirements.txt');
    
    if (!fs.existsSync(requirementsPath)) {
      reject(new Error('requirements.txt not found'));
      return;
    }

    log.info('Running: pip install -r requirements.txt');
    
    const pip = spawn('pip', ['install', '-r', 'requirements.txt'], {
      cwd: ML_SERVICE_DIR,
      stdio: ['pipe', 'pipe', 'pipe']
    });

    pip.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`pip install failed with code ${code}`));
      }
    });

    pip.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Check if port is in use and kill the process if needed
 */
function checkAndKillPort(port) {
  return new Promise((resolve) => {
    const isWindows = os.platform() === 'win32';
    const command = isWindows 
      ? `netstat -ano | findstr :${port}`
      : `lsof -i :${port}`;

    exec(command, (error, stdout) => {
      if (error || !stdout) {
        // Port is free
        log.info(`Port ${port} is available`);
        resolve();
      } else {
        // Port is in use, kill it
        log.warning(`Port ${port} is in use. Attempting to kill existing process...`);
        
        if (isWindows) {
          // Extract PID from netstat output
          const lines = stdout.trim().split('\n');
          if (lines.length > 0) {
            const pid = lines[0].split(/\s+/).pop();
            exec(`taskkill /PID ${pid} /F`, () => {
              log.success(`Killed process ${pid}`);
              setTimeout(resolve, 1000);
            });
          } else {
            resolve();
          }
        } else {
          // Unix/Linux
          const pid = stdout.split('\n')[0].split(/\s+/)[1];
          exec(`kill -9 ${pid}`, () => {
            log.success(`Killed process ${pid}`);
            setTimeout(resolve, 1000);
          });
        }
      }
    });
  });
}

/**
 * Start ML service in a new terminal window
 */
function startMLService() {
  const isWindows = os.platform() === 'win32';
  
  if (isWindows) {
    // Windows: Open in new PowerShell window
    const command = `cd "${ML_SERVICE_DIR}" && python app.py`;
    exec(`powershell -NoExit -Command "${command}"`, {
      detached: true,
      stdio: 'ignore'
    }).unref();
  } else {
    // Unix/Linux/Mac: Open in new terminal
    const command = `cd "${ML_SERVICE_DIR}" && python app.py`;
    exec(`gnome-terminal -- bash -c "${command}; exec bash"`, (error) => {
      if (error) {
        // Fallback for macOS
        exec(`open -a Terminal "${ML_SERVICE_DIR}/app.py"`, (err) => {
          if (err) {
            log.warning('Could not open terminal automatically');
          }
        });
      }
    }).unref();
  }
}

/**
 * Wait for ML service to be ready
 */
function waitForService(url, maxRetries, delay) {
  return new Promise((resolve, reject) => {
    let retries = 0;

    const checkHealth = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          retry();
        }
      }).on('error', () => {
        retry();
      });
    };

    const retry = () => {
      retries++;
      if (retries >= maxRetries) {
        reject(new Error(`ML service did not respond after ${maxRetries} attempts`));
      } else {
        const percentage = Math.round((retries / maxRetries) * 100);
        process.stdout.write(`\rWaiting for ML service... ${percentage}%`);
        setTimeout(checkHealth, delay);
      }
    };

    checkHealth();
  });
}

/**
 * Open URL in default browser
 */
function openBrowser(url) {
  const isWindows = os.platform() === 'win32';
  const isMac = os.platform() === 'darwin';

  if (isWindows) {
    exec(`start ${url}`);
  } else if (isMac) {
    exec(`open ${url}`);
  } else {
    exec(`xdg-open ${url}`);
  }
}

// Run main function
main().catch((error) => {
  log.error(`Fatal error: ${error.message}`);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nShutting down...');
  process.exit(0);
});
