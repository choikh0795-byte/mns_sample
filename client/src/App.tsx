import { useState } from 'react';
import { useAuthStore } from './core/store/useAuthStore';
import { MainLayout } from './core/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { TeamStatusPage } from './pages/TeamStatusPage';
import { IndividualEvalPage } from './pages/IndividualEvalPage';
import { CompetencyEvalPage } from './pages/CompetencyEvalPage';
import { CulturePage } from './pages/CulturePage';
import { ComprehensivePage } from './pages/ComprehensivePage';
import { PlaceholderPage } from './pages/PlaceholderPage';

const renderPage = (menuId: string) => {
  switch (menuId) {
    case 'team-status':
      return <TeamStatusPage />;
    case 'eval-status':
      return <IndividualEvalPage />;
    case 'competency-progress':
      return <CompetencyEvalPage />;
    case 'survey-mgmt':
      return <CulturePage />;
    case 'score-status':
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
