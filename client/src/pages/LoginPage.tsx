import { useState } from 'react';
import { useAuthStore } from '../core/store/useAuthStore';
import { Eye, EyeOff, BarChart2, TrendingUp, CheckCircle, Users, Target, MessageCircle } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      {/* 좌측 브랜드 패널 — 화이트/그레이 계열 */}
      <div className="hidden lg:flex lg:w-1/2 bg-white border-r border-slate-100 flex-col justify-between p-12">
        {/* 로고 */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <BarChart2 className="text-white w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-900 text-xl font-bold tracking-tight">PMS</span>
            <span className="text-slate-400 text-sm ml-2 font-normal">Performance Management System</span>
          </div>
        </div>

        {/* 메인 카피 */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span className="text-xs font-semibold text-blue-600">2026 성과관리 플랫폼</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            성과를 측정하고<br />
            <span className="text-blue-600">성장을 가속화</span>하세요
          </h1>
          <p className="text-slate-500 text-base leading-relaxed mb-10">
            팀 업적부터 개인 역량평가까지, 통합된 인사평가 플랫폼으로<br />
            조직의 성과를 체계적으로 관리하세요.
          </p>

          {/* 통계 카드 */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <CheckCircle className="w-4 h-4 text-emerald-600" />, label: '평가 완료율', value: '94.2%', sub: '이번 분기 기준', bg: 'bg-emerald-50', border: 'border-emerald-100' },
              { icon: <Users className="w-4 h-4 text-blue-600" />, label: '활성 사용자', value: '312명', sub: '전체 임직원', bg: 'bg-blue-50', border: 'border-blue-100' },
              { icon: <Target className="w-4 h-4 text-violet-600" />, label: '팀 OKR 달성', value: '87%', sub: '목표 대비', bg: 'bg-violet-50', border: 'border-violet-100' },
              { icon: <MessageCircle className="w-4 h-4 text-amber-600" />, label: '피드백 건수', value: '1,840건', sub: '이번 달 누적', bg: 'bg-amber-50', border: 'border-amber-100' },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} border ${stat.border} rounded-2xl p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 */}
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>© 2026 PMS HR Platform. All rights reserved.</span>
        </div>
      </div>

      {/* 우측 로그인 폼 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F7F8FA]">
        <div className="w-full max-w-md">
          {/* 모바일 로고 */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <BarChart2 className="text-white w-5 h-5" />
            </div>
            <span className="text-slate-900 text-xl font-bold">PMS</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">로그인</h2>
            <p className="text-slate-500 text-sm">계정 정보를 입력하여 시작하세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                비밀번호
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20" />
                <span className="text-sm text-slate-600">로그인 상태 유지</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                비밀번호 찾기
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  로그인 중...
                </>
              ) : (
                '로그인'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs text-blue-700 font-medium mb-1">프로토타입 안내</p>
            <p className="text-xs text-blue-600">어떤 이메일/비밀번호로도 로그인 가능합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
