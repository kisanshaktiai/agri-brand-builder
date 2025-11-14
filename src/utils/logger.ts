// Production-safe logging utility
const PREFIX = '[KisanShakti]';
const MAX_LOGS = 100;

interface LogEntry {
  timestamp: string;
  level: 'info' | 'error' | 'warn' | 'debug';
  message: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];

  private persistToStorage() {
    try {
      const recentLogs = this.logs.slice(-MAX_LOGS);
      localStorage.setItem('kisanshakti_logs', JSON.stringify(recentLogs));
    } catch (e) {
      // Storage might be full or blocked
    }
  }

  private log(level: LogEntry['level'], message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const entry: LogEntry = { timestamp, level, message, data };
    
    this.logs.push(entry);
    this.persistToStorage();

    const icon = {
      info: '✅',
      error: '❌',
      warn: '⚠️',
      debug: '🔍'
    }[level];

    const logFn = level === 'error' ? console.error : 
                  level === 'warn' ? console.warn : console.log;

    if (data) {
      logFn(`${PREFIX} ${icon} ${message}`, data);
    } else {
      logFn(`${PREFIX} ${icon} ${message}`);
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  error(message: string, data?: any) {
    this.log('error', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  getStoredLogs(): LogEntry[] {
    try {
      const stored = localStorage.getItem('kisanshakti_logs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  clearLogs() {
    this.logs = [];
    try {
      localStorage.removeItem('kisanshakti_logs');
    } catch {
      // Storage blocked
    }
  }
}

export const logger = new Logger();
