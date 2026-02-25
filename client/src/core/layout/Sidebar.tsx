import React, { useState } from 'react';
import {
  Target, Users, Star, Heart, BarChart2,
  ChevronDown, ChevronRight, LogOut, Bell,
  TrendingUp, ClipboardList, PlusSquare, Activity,
  UserCheck, Award, Search, MessageSquare,
  Layers, PlayCircle, PieChart, FileText,
  CheckSquare, AlertCircle, BookOpen,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'team-achievement',
    label: '팀 업적 관리',
    icon: <Target className="w-5 h-5" />,
    children: [
      { id: 'team-status', label: '팀 성과 현황', icon: <TrendingUp className="w-4 h-4" />, badge: 'NEW' },
      { id: 'goal-setting', label: '목표 설정 (OKR)', icon: <ClipboardList className="w-4 h-4" /> },
      { id: 'achievement-entry', label: '업적 등록/수정', icon: <PlusSquare className="w-4 h-4" /> },
      { id: 'progress-monitoring', label: '진행현황 모니터링', icon: <Activity className="w-4 h-4" /> },
    ],
  },
  {
    id: 'individual-eval',
    label: '개인별 업적평가',
    icon: <Users className="w-5 h-5" />,
    children: [
      { id: 'eval-status', label: '평가 현황', icon: <UserCheck className="w-4 h-4" />, badge: '3' },
      { id: 'eval-progress', label: '평가 진행', icon: <PlayCircle className="w-4 h-4" /> },
      { id: 'eval-results', label: '평가 결과 조회', icon: <Search className="w-4 h-4" /> },
      { id: 'feedback-mgmt', label: '피드백 관리', icon: <MessageSquare className="w-4 h-4" /> },
    ],
  },
  {
    id: 'competency-eval',
    label: '역량평가',
    icon: <Star className="w-5 h-5" />,
    children: [
      { id: 'competency-criteria', label: '역량 기준 관리', icon: <Layers className="w-4 h-4" /> },
      { id: 'competency-progress', label: '역량평가 진행', icon: <Award className="w-4 h-4" />, badge: '진행중' },
      { id: 'competency-analysis', label: '결과 분석', icon: <PieChart className="w-4 h-4" /> },
    ],
  },
  {
    id: 'culture-improvement',
    label: '조직문화개선',
    icon: <Heart className="w-5 h-5" />,
    children: [
      { id: 'survey-mgmt', label: '설문 관리', icon: <ClipboardList className="w-4 h-4" /> },
      { id: 'culture-analysis', label: '결과 분석', icon: <BarChart2 className="w-4 h-4" /> },
      { id: 'action-plan', label: '개선 액션 플랜', icon: <CheckSquare className="w-4 h-4" /> },
    ],
  },
  {
    id: 'comprehensive-eval',
    label: '종합평가',
    icon: <BarChart2 className="w-5 h-5" />,
    children: [
      { id: 'score-status', label: '종합 점수 현황', icon: <AlertCircle className="w-4 h-4" /> },
      { id: 'eval-report', label: '평가 보고서', icon: <FileText className="w-4 h-4" /> },
      { id: 'annual-summary', label: '연간 평가 요약', icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuChange }) => {
  const { user, logout } = useAuthStore();

  // 현재 활성 서브메뉴가 속한 부모 메뉴를 찾아 기본 오픈
  const findParentId = (subId: string) => {
    return menuItems.find((m) => m.children.some((c) => c.id === subId))?.id ?? menuItems[0].id;
  };
  const [openMenuId, setOpenMenuId] = useState<string>(findParentId(activeMenu));

  const toggleMenu = (menuId: string) => {
    setOpenMenuId((prev) => (prev === menuId ? '' : menuId));
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col shrink-0 sticky top-0">
      {/* 서비스 로고 */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <BarChart2 className="text-white w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 leading-none">MNS 성과관리</p>
            <p className="text-xs text-slate-400 mt-0.5">HR Performance Platform</p>
          </div>
        </div>
      </div>

      {/* 알림 배지 */}
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center justify-between px-3 py-2 bg-amber-50 border border-amber-100 rounded-xl">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-700">미완료 평가 3건</span>
          </div>
          <span className="text-xs text-amber-500 font-semibold">확인 →</span>
        </div>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map((menu) => {
          const isOpen = openMenuId === menu.id;
          const isParentActive = menu.children.some((c) => c.id === activeMenu);

          return (
            <div key={menu.id}>
              {/* 부모 메뉴 */}
              <button
                onClick={() => toggleMenu(menu.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  isParentActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={isParentActive ? 'text-blue-600' : 'text-slate-400'}>
                  {menu.icon}
                </span>
                <span className="flex-1 text-left">{menu.label}</span>
                <span className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${isParentActive ? 'text-blue-400' : 'text-slate-300'}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {/* 서브 메뉴 */}
              {isOpen && (
                <div className="mt-1 ml-3 pl-4 border-l-2 border-slate-100 space-y-0.5">
                  {menu.children.map((child) => {
                    const isActive = child.id === activeMenu;
                    return (
                      <button
                        key={child.id}
                        onClick={() => {
                          onMenuChange(child.id);
                          setOpenMenuId(menu.id);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'
                        }`}
                      >
                        <span className={isActive ? 'text-blue-500' : 'text-slate-400'}>
                          {child.icon}
                        </span>
                        <span className="flex-1 text-left">{child.label}</span>
                        {child.badge && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                            child.badge === 'NEW'
                              ? 'bg-blue-100 text-blue-600'
                              : child.badge === '진행중'
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {child.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* 하단 유저 프로필 */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-all">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
            {user?.avatar ?? 'AD'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{user?.name ?? '관리자'}</p>
            <p className="text-xs text-slate-400 truncate">{user?.role ?? 'HR 매니저'}</p>
          </div>
          <button
            onClick={logout}
            className="text-slate-400 hover:text-slate-600 transition-colors shrink-0"
            title="로그아웃"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
