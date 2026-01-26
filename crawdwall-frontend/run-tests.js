const { exec } = require('child_process');
const os = require('os');

console.log('Starting test execution...');

// Determine the correct command based on the OS
const platform = os.platform();
let cmd = 'npx jest --verbose';
if (platform === 'win32') {
  // On Windows, use cmd explicitly
  cmd = 'cmd /c "npx jest --verbose"';
}

const testProcess = exec(cmd, { cwd: process.cwd() });

testProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

testProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

testProcess.on('close', (code) => {
  console.log(`Tests completed with exit code ${code}`);
  process.exit(code);
});