import { useState } from 'react';
import { useAuthStore } from './core/store/useAuthStore';
import { MainLayout } from './core/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { TeamStatusPage } from './pages/TeamStatusPage';
import { CompetencyEvalPage } from './pages/CompetencyEvalPage';
import { CulturePage } from './pages/CulturePage';
import { ComprehensivePage } from './pages/ComprehensivePage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { GoalRegistrationPage } from './pages/GoalRegistrationPage';

const renderPage = (menuId: string) => {
  switch (menuId) {
    case 'team-status':
      return <TeamStatusPage />;
    case 'goal-registration':
      return <GoalRegistrationPage />;
    case 'competency-eval':
      return <CompetencyEvalPage />;
    case 'culture-improvement':
      return <CulturePage />;
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
