// Error logging service for production

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  meta?: Record<string, any>;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Keep last 1000 logs

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private addLog(level: LogEntry['level'], message: string, meta?: Record<string, any>): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta
    };

    this.logs.push(logEntry);

    // Maintain max log count
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console[level](logEntry);
    }
  }

  info(message: string, meta?: Record<string, any>): void {
    this.addLog('info', message, meta);
  }

  warn(message: string, meta?: Record<string, any>): void {
    this.addLog('warn', message, meta);
  }

  error(message: string, meta?: Record<string, any>): void {
    this.addLog('error', message, meta);
  }

  debug(message: string, meta?: Record<string, any>): void {
    this.addLog('debug', message, meta);
  }

  // Method to send logs to external service (implement as needed)
  async sendLogsToService(): Promise<void> {
    // In a real implementation, this would send logs to an external service
    // like Sentry, LogRocket, etc.
    console.log('Sending logs to external service:', this.logs);
    
    // Clear logs after sending
    this.logs = [];
  }

  // Get recent logs for debugging
  getLogs(count = 50): LogEntry[] {
    return this.logs.slice(-count);
  }

  // Clear all logs
  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = Logger.getInstance();