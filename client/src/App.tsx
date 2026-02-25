import { useState } from 'react';
import { useAuthStore } from './core/store/useAuthStore';
import { MainLayout } from './core/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { TeamStatusPage } from './pages/TeamStatusPage';
import { CompetencyEvalPage } from './pages/CompetencyEvalPage';
import { CulturePage } from './pages/CulturePage';
import { CultureEvalRegistrationPage } from './pages/CultureEvalRegistrationPage';
import { CultureFirstEvalPage } from './pages/CultureFirstEvalPage';
import { ComprehensivePage } from './pages/ComprehensivePage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { GoalRegistrationPage } from './pages/GoalRegistrationPage';
import { TeamGoalRegistrationPage } from './pages/TeamGoalRegistrationPage';
import { TeamAchievementResultPage } from './pages/TeamAchievementResultPage';
import { TeamFirstEvalPage } from './pages/TeamFirstEvalPage';
import { TeamSecondEvalPage } from './pages/TeamSecondEvalPage';
import { IndividualAchievementPrintPage } from './pages/IndividualAchievementPrintPage';
import { CompetencySelfEvalPage } from './pages/CompetencySelfEvalPage';

const renderPage = (menuId: string) => {
  switch (menuId) {
    case 'team-status':
      return <TeamStatusPage />;
    case 'team-goal-registration':
      return <TeamGoalRegistrationPage />;
    case 'team-achievement-result':
      return <TeamAchievementResultPage />;
    case 'team-first-eval':
      return <TeamFirstEvalPage />;
    case 'team-second-eval':
      return <TeamSecondEvalPage />;
    case 'goal-registration':
      return <GoalRegistrationPage />;
    case 'individual-achievement-print':
      return <IndividualAchievementPrintPage />;
    case 'competency-eval':
      return <CompetencyEvalPage />;
    case 'competency-self-eval':
      return <CompetencySelfEvalPage />;
    case 'culture-improvement':
    case 'culture-dashboard':
      return <CulturePage />;
    case 'culture-eval-registration':
      return <CultureEvalRegistrationPage />;
    case 'culture-first-eval':
      return <CultureFirstEvalPage />;
    case 'comprehensive-eval':
      return <ComprehensivePage />;
    default:
      return <PlaceholderPage menuId={menuId} />;
  }
};

function App() {
  const { isAuthenticated } = useAuthStore();
  const [activeMenu, setActiveMenu] = useState('team-status');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <MainLayout activeMenu={activeMenu} onMenuChange={setActiveMenu}>
      {renderPage(activeMenu)}
    </MainLayout>
  );
}

export default App;
