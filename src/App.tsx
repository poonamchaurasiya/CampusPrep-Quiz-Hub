import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { InstructionsPage } from './pages/InstructionsPage';
import { QuizPage } from './pages/QuizPage';
import { ResultPage } from './pages/ResultPage';
import { DashboardPage } from './pages/DashboardPage';
import { DSAPage } from './pages/DSAPage';
import { MixedQuizPage } from './pages/MixedQuizPage';
import { AboutPage } from './pages/AboutPage';

function AppContent() {
  const { isDark } = useThemeStore();
  const location = useLocation();

  // Hide nav/footer on active quiz pages (not instructions or results)
  const isActiveQuiz = /^\/quiz\/[^/]+$/.test(location.pathname);

  // Apply dark mode class on mount
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
      {!isActiveQuiz && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/quiz/:quizId/instructions" element={<InstructionsPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/result/:quizId" element={<ResultPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dsa" element={<DSAPage />} />
          <Route path="/mixed" element={<MixedQuizPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      {!isActiveQuiz && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
