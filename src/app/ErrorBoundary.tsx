import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="border-8 border-black bg-white p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h1 className="font-['Montserrat'] font-black text-5xl md:text-6xl mb-6 text-[#D44646]">
                Sorry :( Ein Fehler ist aufgetreten
              </h1>

              <div className="space-y-4">
                <p className="font-['Montserrat'] font-bold text-xl md:text-2xl">
                  Es tut mir sehr leid, aber beim Laden des Lebenslaufs ist ein Problem aufgetreten.
                </p>

                <div className="border-4 border-black p-6 bg-gray-50">
                  <h2 className="font-['Montserrat'] font-bold text-xl mb-4">Fehlerdetails:</h2>
                  {this.state.error && (
                    <pre className="font-mono text-sm bg-white border-2 border-black p-4 overflow-auto">
                      {this.state.error.toString()}
                    </pre>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center justify-center gap-2 bg-[#D44646] text-white px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-['Montserrat'] font-bold text-lg"
                  >
                    Seite neu laden
                  </button>

                  <a
                    href="mailto:dev@animalite.org"
                    className="flex items-center justify-center gap-2 bg-black text-white px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-['Montserrat'] font-bold text-lg"
                  >
                    Kontakt aufnehmen
                  </a>
                </div>
              </div>
            </div>

            <div className="border-4 border-black p-6 bg-[#D44646] text-white">
              <h3 className="font-['Montserrat'] font-bold text-lg mb-3">Mögliche Lösungen:</h3>
              <ul className="space-y-2 text-sm">
                <li>• Laden Sie die Seite neu</li>
                <li>• Löschen Sie Ihren Browser-Cache</li>
                <li>• Versuchen Sie einen anderen Browser</li>
                <li>• Kontaktieren Sie mich bei fortbestehenden Problemen</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
