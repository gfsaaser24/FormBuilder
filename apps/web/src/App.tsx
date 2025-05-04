import { Routes, Route } from 'react-router-dom';
import { SiteHeader } from './components/site-header';
import { TailwindIndicator } from './components/tailwind-indicator';
import HomePage from './pages/index/HomePage';
import BuilderPage from './pages/builder/BuilderPage';
import TemplatesPage from './pages/templates/TemplatesPage';

function App() {
  return (
    <>
      <SiteHeader />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
        </Routes>
      </div>
      <TailwindIndicator />
    </>
  );
}

export default App;