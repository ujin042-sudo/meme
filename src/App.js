import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/AdminPage';
import { initGA } from './utils/analytics';
import './App.css';

function App() {
  useEffect(() => {
    // GA4 초기화
    initGA();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
