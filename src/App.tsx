import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

import ProblemPage from './pages/problem_page.tsx/problem_page';
import ComparisonPage from './pages/comparison_page/comparison_page';
import PresetmapPage from './pages/presetmap_page/presetmap_page';
import AboutPage from './pages/about_page/about_page';
import PolicyPage from './pages/policy_page/policy_page';

import PageFooter from './components/page_footer/footer';
import Navbar from './components/navbar/navbar';

import stoneBackground from "/blocks/stone.png";
import lightBlueConcreteBackground from "/blocks/light_blue_concrete.png"
import endPortalBackground from "/blocks/end_portal.png";

const pageBackgrounds: Record<string, string> = {
  "/": stoneBackground,
  "/about": lightBlueConcreteBackground,
};

function Layout() {
  const location = useLocation();

  const background =
    pageBackgrounds[location.pathname] ?? endPortalBackground;

  return (
    <div
      className="layout"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<ProblemPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/presetmap" element={<PresetmapPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/policy" element={<PolicyPage />} />
      </Routes>

      <PageFooter />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App