import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import ComparisonPage from './pages/comparison_page'
import PresetmapPage from './pages/presetmap_page'
import PageFooter from './components/page_footer/footer'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComparisonPage />} />
        <Route path="/presetmap" element={<PresetmapPage />} />
      </Routes>
      <PageFooter />
    </Router>
  )
}

export default App