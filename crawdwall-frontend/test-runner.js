import { spawn } from 'child_process';

// Simple test runner to verify Jest is working
console.log('Running basic tests...');

// Run a simple test
spawn('npx', ['jest', '--testPathPattern=login'], {
  stdio: 'inherit',
  shell: true
}).on('close', (code) => {
  console.log(`Test process exited with code ${code}`);
  process.exit(code);
});