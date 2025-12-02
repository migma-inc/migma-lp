
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalPartner } from './pages/GlobalPartner';
import { PartnerTerms } from './pages/PartnerTerms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/global-partner" element={<GlobalPartner />} />
        <Route path="/partner-terms" element={<PartnerTerms />} />
        <Route path="/" element={<Navigate to="/global-partner" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
