import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './utils/constants';
import { useUser } from './context/UserContext';
import { localStorageService } from './services/storage/localStorageService';

// Pages (will be created next)
import SplashScreen from './pages/SplashScreen';
import LanguageSelection from './pages/LanguageSelection';
import Onboarding from './pages/Onboarding';
import ProfileSetup from './pages/ProfileSetup';
import Home from './pages/Home';
import MentalAgeQuiz from './pages/MentalAgeQuiz';
import Results from './pages/Results';
import History from './pages/History';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const { user, isLoading } = useUser();
  const onboardingComplete = localStorageService.isOnboardingComplete();

  if (isLoading) return <SplashScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.SPLASH} element={<SplashScreen />} />
        <Route path={ROUTES.LANGUAGE_SELECT} element={<LanguageSelection />} />
        <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />
        <Route path={ROUTES.PROFILE_SETUP} element={<ProfileSetup />} />
        <Route path={ROUTES.HOME} element={user ? <Home /> : <Navigate to={ROUTES.PROFILE_SETUP} />} />
        <Route path={ROUTES.QUIZ.MENTAL_AGE} element={<MentalAgeQuiz />} />
        <Route path={ROUTES.RESULTS} element={<Results />} />
        <Route path={ROUTES.HISTORY} element={<History />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
