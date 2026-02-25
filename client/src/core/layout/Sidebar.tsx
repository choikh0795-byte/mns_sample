import React, { useState } from 'react';
import {
  Target, Users, Star, Heart, BarChart2,
  ChevronDown, LogOut, Bell,
  ClipboardList, User, FileText, Award, LayoutDashboard, PenLine, BookOpen,
  TrendingUp, CheckSquare, CheckCircle2,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

interface SubMenuItem {
  id: string;
  label: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: SubMenuItem[];
}

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'team-management',
    label: '팀 업적 관리',
    icon: <Target className="w-5 h-5" />,
    children: [
      { id: 'team-status', label: '팀 성과 현황' },
      { id: 'team-goal-registration', label: '목표 등록' },
      { id: 'team-achievement-result', label: '실적 등록' },
      { id: 'team-first-eval', label: '1차평가' },
      { id: 'team-second-eval', label: '2차평가' },
    ],
  },
  {
    id: 'individual-eval',
    label: '개인별 업적평가',
    icon: <Users className="w-5 h-5" />,
    children: [
      { id: 'goal-registration', label: '개인별 목표 등록' },
      { id: 'individual-achievement-print', label: '개인별업적평가 출력' },
    ],
  },
  {
    id: 'competency-eval',
    label: '역량평가',
    icon: <Star className="w-5 h-5" />,
    children: [
      { id: 'competency-self-eval', label: '본인평가' },
    ],
  },
  {
    id: 'culture-improvement',
    label: '조직문화개선',
    icon: <Heart className="w-5 h-5" />,
    children: [
      { id: 'culture-dashboard', label: '대시보드' },
      { id: 'culture-eval-registration', label: '자기평가 등록' },
      { id: 'culture-first-eval', label: '1차평가' },
    ],
  },
  {
    id: 'comprehensive-eval',
    label: '종합평가',
    icon: <BarChart2 className="w-5 h-5" />,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuChange }) => {
  const { user, logout } = useAuthStore();

  const findDefaultOpen = () => {
    for (const m of menuItems) {
      if (m.children?.some((c) => c.id === activeMenu)) return m.id;
    }
    return '';
  };
  const [openMenuId, setOpenMenuId] = useState<string>(findDefaultOpen);

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
            <p className="text-sm font-bold text-slate-900 leading-none">PMS</p>
            <p className="text-xs text-slate-400 mt-0.5">Performance Management System</p>
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
          const hasChildren = menu.children && menu.children.length > 0;
          const isOpen = openMenuId === menu.id;
          const isParentActive = hasChildren
            ? menu.children!.some((c) => c.id === activeMenu)
            : activeMenu === menu.id;

          if (hasChildren) {
            return (
              <div key={menu.id}>
                {/* 부모 메뉴 (accordion) */}
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
                  <span
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${
                      isParentActive ? 'text-blue-400' : 'text-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {/* 서브 메뉴 */}
                {isOpen && (
                  <div className="mt-1 ml-3 pl-4 border-l-2 border-slate-100 space-y-0.5">
                    {menu.children!.map((child) => {
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
                          {child.id === 'team-status' ? (
                            <BarChart2 className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          ) : child.id === 'team-goal-registration' ? (
                            <BookOpen className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          ) : child.id === 'individual-achievement-print' ? (
                            <FileText className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          ) : child.id === 'competency-self-eval' ? (
                            <Award className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          ) : child.id === 'culture-dashboard' ? (
                            <LayoutDashboard className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          ) : child.id === 'culture-eval-registration' ? (
                            <PenLine className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          ) : child.id === 'culture-first-eval' ? (
                            <ClipboardList className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          ) : child.id === 'team-achievement-result' ? (
                            <TrendingUp className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          ) : child.id === 'team-first-eval' ? (
                            <CheckSquare className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          ) : child.id === 'team-second-eval' ? (
                            <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          ) : (
                            <ClipboardList className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-slate-400'}`} />
                          )}
                          <span className="flex-1 text-left">{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // 서브메뉴 없는 단일 메뉴
          return (
            <button
              key={menu.id}
              onClick={() => {
                onMenuChange(menu.id);
                setOpenMenuId('');
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isParentActive
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={isParentActive ? 'text-blue-600' : 'text-slate-400'}>
                {menu.icon}
              </span>
              <span className="flex-1 text-left">{menu.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 하단 유저 프로필 */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-all">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-slate-500" />
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
