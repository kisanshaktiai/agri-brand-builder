import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/utils/logger';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('React Error Boundary caught error', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
    });

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = () => {
    logger.info('User triggered page reload from error boundary');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card border border-border rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <h1 className="text-2xl font-bold text-foreground">
                Something went wrong
              </h1>
            </div>
            
            <p className="text-muted-foreground mb-4">
              We encountered an unexpected error. Please try reloading the page.
            </p>

            {this.state.error && (
              <div className="bg-muted p-3 rounded mb-4 overflow-auto max-h-40">
                <p className="text-sm font-mono text-foreground">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={this.handleReload} className="flex-1">
                Reload Page
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  logger.info('User viewing error details');
                  console.log('Error Details:', {
                    error: this.state.error,
                    errorInfo: this.state.errorInfo,
                  });
                  alert('Error details logged to console. Press F12 to view.');
                }}
              >
                View Details
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Error ID: {Date.now().toString(36)}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
