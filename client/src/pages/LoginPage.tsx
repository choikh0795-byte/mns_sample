import { useState } from 'react';
import { useAuthStore } from '../core/store/useAuthStore';
import { Eye, EyeOff, BarChart2, Check, Star } from 'lucide-react';

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

  const features = [
    '팀 OKR 및 개인 목표 통합 관리',
    '360도 다면 평가 및 피드백',
    'AI 기반 성과 분석 리포트',
    '실시간 진행률 트래킹 및 알림',
  ];

  return (
    <div className="min-h-screen flex">
      {/* 좌측 브랜드 패널 — 다크 프리미엄 */}
      <div className="hidden lg:flex lg:w-[46%] bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* 배경 도트 패턴 */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.08) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* 블러 글로우 */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* 로고 */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
            <BarChart2 className="text-white w-5 h-5" />
          </div>
          <div>
            <span className="text-white text-xl font-bold tracking-tight">PMS</span>
            <span className="text-slate-500 text-sm ml-2 font-normal">Performance Management</span>
          </div>
        </div>

        {/* 중앙 카피 + 피처 리스트 */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span className="text-xs font-semibold text-blue-400">3,200개 기업이 선택한 HR 플랫폼</span>
          </div>

          <h1 className="text-[2.75rem] font-bold text-white leading-[1.2] mb-4">
            성과관리의<br />
            <span className="text-blue-400">새로운 기준</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-10">
            목표 설정부터 역량 평가까지,<br />
            하나의 플랫폼으로 완성하세요.
          </p>

          {/* 피처 체크리스트 */}
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3.5">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-slate-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 — 고객 증언 */}
        <div className="relative z-10">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              "PMS 도입 후 평가 사이클이 절반으로 줄었고, 구성원들의 목표 몰입도가 눈에 띄게 높아졌습니다."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-300">
                이서
              </div>
              <div>
                <p className="text-white text-sm font-semibold">이서연</p>
                <p className="text-slate-500 text-xs">HR 디렉터 · 카카오스타일</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 로그인 폼 */}
      <div className="w-full lg:w-[54%] flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-[400px]">
          {/* 모바일 로고 */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <BarChart2 className="text-white w-5 h-5" />
            </div>
            <span className="text-slate-900 text-xl font-bold">PMS</span>
          </div>

          {/* 헤더 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1.5">다시 만나서 반가워요 👋</h2>
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
                className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-[#F7F8FA] text-sm text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  비밀번호
                </label>
                <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  비밀번호 찾기
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-[#F7F8FA] text-sm text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all pr-11"
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

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
              />
              <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                로그인 상태 유지
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

          {/* 구분선 + 프로토타입 안내 */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-xs text-slate-500 font-medium mb-0.5">프로토타입 안내</p>
              <p className="text-xs text-slate-400">어떤 이메일/비밀번호로도 로그인 가능합니다.</p>
            </div>
          </div>

          {/* 하단 — 사용자 아바타 신뢰 지표 */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['bg-violet-100 text-violet-700', 'bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700'].map((cls, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${cls}`}
                >
                  {['김', '이', '박', '최'][i]}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">
              <span className="font-semibold text-slate-600">3,200+</span> 명의 HR 담당자가 사용 중
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
