import * as React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error in component tree:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-lg w-full rounded-lg border border-destructive/20 bg-destructive/10 p-6">
            <h1 className="text-2xl font-bold text-destructive">Ocorreu um erro</h1>
            <p className="mt-2 text-sm text-foreground/80">
              Algo deu errado ao carregar esta página. Veja o console do navegador para detalhes.
            </p>
            {this.state.error && (
              <pre className="mt-4 max-h-48 overflow-auto rounded bg-slate-800 p-3 text-xs text-white">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
