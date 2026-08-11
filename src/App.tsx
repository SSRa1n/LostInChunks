import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import ProblemPage from './pages/problem_page.tsx/problem_page';
import ComparisonPage from './pages/comparison_page/comparison_page'
import PresetmapPage from './pages/presetmap_page/presetmap_page'
import PageFooter from './components/page_footer/footer'
import Navbar from './components/navbar/navbar';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProblemPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/presetmap" element={<PresetmapPage />} />
      </Routes>
      <PageFooter />
    </Router>
  )
}

export default App