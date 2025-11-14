import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logger } from '@/utils/logger';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';

export const DebugPanel: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState(logger.getLogs());

  useEffect(() => {
    // Check if debug mode is enabled via URL parameter
    const params = new URLSearchParams(window.location.search);
    const debugMode = params.get('debug') === 'true';
    setIsVisible(debugMode);

    if (debugMode) {
      logger.info('Debug panel activated');
    }
  }, []);

  useEffect(() => {
    // Update logs every second when panel is visible
    if (isVisible) {
      const interval = setInterval(() => {
        setLogs(logger.getLogs());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const downloadLogs = () => {
    const logsText = JSON.stringify(logs, null, 2);
    const blob = new Blob([logsText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kisanshakti-logs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    logger.info('Logs downloaded');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 bg-card border-2 border-primary rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col">
      <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
        <h3 className="font-bold text-sm">Debug Panel</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={downloadLogs}
            className="h-6 w-6 p-0 hover:bg-primary-foreground/20"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0 hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-3 border-b border-border bg-muted/50">
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Route:</span>
            <span className="font-mono text-foreground">{location.pathname}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Environment:</span>
            <span className="font-mono text-foreground">
              {import.meta.env.MODE}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Logs:</span>
            <span className="font-mono text-foreground">{logs.length}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2 space-y-1 bg-background">
        {logs.slice(-50).map((log, index) => (
          <div
            key={index}
            className={`text-xs font-mono p-2 rounded ${
              log.level === 'error'
                ? 'bg-destructive/10 text-destructive'
                : log.level === 'warn'
                ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'
                : log.level === 'debug'
                ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                : 'bg-muted/50 text-foreground'
            }`}
          >
            <div className="flex justify-between gap-2 mb-1">
              <span className="font-bold">{log.level.toUpperCase()}</span>
              <span className="text-muted-foreground">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div>{log.message}</div>
            {log.data && (
              <pre className="mt-1 text-[10px] opacity-70 overflow-auto">
                {JSON.stringify(log.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>

      <div className="p-2 border-t border-border bg-muted/50">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            logger.clearLogs();
            setLogs([]);
          }}
          className="w-full text-xs"
        >
          Clear Logs
        </Button>
      </div>
    </div>
  );
};
