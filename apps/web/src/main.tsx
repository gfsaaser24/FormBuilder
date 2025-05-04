import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/shared/Toaster';
import { fontSans } from './lib/fonts';
import { cn } from './lib/utils';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="relative flex min-h-screen flex-col">
            <App />
            <Toaster />
          </div>
        </ThemeProvider>
      </div>
    </React.StrictMode>
  </BrowserRouter>
);