import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/shared/Toaster";
import { SiteHeader } from './components/site-header';
import { TailwindIndicator } from './components/tailwind-indicator';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import TemplatesPage from './pages/TemplatesPage';
import { fontSans } from "./lib/fonts";
import { cn } from "./lib/utils";

function App() {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
            </Routes>
          </div>
          <Toaster />
        </div>
        <TailwindIndicator />
      </ThemeProvider>
    </div>
  );
}

export default App;