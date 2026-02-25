import { useState } from 'react';
import {
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle,
  UploadCloud,
  HelpCircle,
  Target,
  AlertCircle,
} from 'lucide-react';

interface TeamGoal {
  id: number;
  checked: boolean;
  expanded: boolean;
  orgGoal: string;
  goal: string;
  reason: string;
  keyResult: string;
  evalType: '정량' | '정성';
  weight: number;
}

const orgGoalOptions = [
  '2026 글로벌 시장 진출 기반 마련',
  '제품 사용성 및 성능 고도화',
  '개발 조직 역량 강화 및 문화 정착',
  '고객 만족도 향상',
  '운영 효율화 및 비용 최적화',
];

const departmentOptions = [
  '플랫폼 개발팀',
  '프로덕트 디자인팀',
  '고객성공팀 (CS)',
  '마케팅팀',
  '영업팀',
  '인사팀',
  '재무팀',
];

const initialGoals: TeamGoal[] = [
  {
    id: 1,
    checked: false,
    expanded: false,
    orgGoal: '2026 글로벌 시장 진출 기반 마련',
    goal: '다국어 지원 아키텍처 설계 및 초기 구현',
    reason:
      '해외 주요 고객사 대상 서비스 확장을 위해 i18n 기반 다국어 아키텍처 도입이 필요합니다. 현재 한국어 단일 언어 서비스 구조로는 글로벌 시장 진출 시 기술적 확장성에 한계가 있습니다.',
    keyResult:
      '1. i18n 라이브러리 도입 및 영어·일본어 초기 지원 완료\n2. 전체 UI 텍스트 다국어 리소스 분리율 100%\n3. 3개 이상 주요 화면 다국어 전환 데모 완성',
    evalType: '정성',
    weight: 30,
  },
  {
    id: 2,
    checked: true,
    expanded: true,
    orgGoal: '제품 사용성 및 성능 고도화',
    goal: '프론트엔드 렌더링 최적화 및 로딩 속도 개선',
    reason:
      '최근 글로벌 고객사의 대규모 데이터 로드 시 브라우저 프리징 현상 리포트 증가. 초기 로딩 속도(LCP)와 상호작용 지연(INP)을 개선하여 사용자 경험을 향상시키고 이탈률을 방지하기 위함.',
    keyResult:
      '1. 초기 로딩 속도(LCP) 1.5초 이내 달성\n2. 번들 사이즈 30% 축소 (Code Splitting 및 Tree Shaking 적용)\n3. Lighthouse 성능 점수 90점 이상 달성',
    evalType: '정량',
    weight: 40,
  },
  {
    id: 3,
    checked: false,
    expanded: false,
    orgGoal: '개발 조직 역량 강화 및 문화 정착',
    goal: '사내 프론트엔드 코드 컨벤션 수립 및 세미나 주최',
    reason:
      '팀 내 코드 품질 편차 축소 및 온보딩 효율 향상을 위해 공통 코드 컨벤션 정립이 필요합니다. 일관된 개발 문화 정착으로 코드 리뷰 시간을 단축하고 생산성을 높이기 위함.',
    keyResult:
      '1. 프론트엔드 코드 컨벤션 문서 작성 및 팀 전파 완료\n2. 분기별 사내 기술 세미나 2회 이상 주최\n3. 신규 입사자 온보딩 만족도 4.0점 이상 달성',
    evalType: '정성',
    weight: 30,
  },
];

export const TeamGoalRegistrationPage = () => {
  const [year, setYear] = useState('2026');
  const [department, setDepartment] = useState('플랫폼 개발팀');
  const [goals, setGoals] = useState<TeamGoal[]>(initialGoals);
  const [nextId, setNextId] = useState(4);

  const totalWeight = goals.reduce((sum, g) => sum + g.weight, 0);
  const allChecked = goals.length > 0 && goals.every((g) => g.checked);
  const someChecked = goals.some((g) => g.checked);

  const toggleAll = () => {
    const newVal = !allChecked;
    setGoals((prev) => prev.map((g) => ({ ...g, checked: newVal })));
  };

  const toggleRow = (id: number) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, checked: !g.checked } : g)));
  };

  const toggleExpand = (id: number) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, expanded: !g.expanded } : g)));
  };

  const deleteSelected = () => {
    setGoals((prev) => prev.filter((g) => !g.checked));
  };

  const deleteGoal = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const addGoal = () => {
    setGoals((prev) => [
      ...prev,
      {
        id: nextId,
        checked: false,
        expanded: true,
        orgGoal: orgGoalOptions[0],
        goal: '',
        reason: '',
        keyResult: '',
        evalType: '정량',
        weight: 0,
      },
    ]);
    setNextId((n) => n + 1);
  };

  const updateField = (
    id: number,
    field: keyof Omit<TeamGoal, 'id' | 'checked' | 'expanded'>,
    value: string | number
  ) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const weightBarColor =
    totalWeight === 100
      ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
      : totalWeight > 100
      ? 'bg-gradient-to-r from-rose-400 to-rose-500'
      : 'bg-gradient-to-r from-brand-400 to-brand-500';

  return (
    <div className="p-8 lg:p-10 min-h-full">
      <div className="w-full max-w-6xl mx-auto flex flex-col">

        {/* ── 페이지 헤더 ── */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8">
          <div>
            {/* 브레드크럼 */}
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2">
              <span className="hover:text-slate-800 cursor-pointer transition-colors">팀업적관리</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-brand-600 font-semibold bg-brand-50 px-2 py-0.5 rounded-md">목표등록</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {year}년 팀 목표 등록
            </h1>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              부서의 연간 핵심 목표를 수립하고 구체적인 실행 계획과 비중을 설정합니다.
            </p>
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all">
              <UploadCloud className="w-4 h-4 text-slate-400" />
              엑셀 일괄 업로드
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all">
              <CheckCircle className="w-4 h-4 text-slate-300" />
              최종 목표 확정
            </button>
          </div>
        </header>

        {/* ── 필터 + 상태 요약 카드 ── */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 flex flex-wrap lg:flex-nowrap justify-between items-center gap-6 mb-6 relative overflow-hidden">
          {/* 장식 블롭 */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

          <div className="flex items-center gap-2 lg:gap-6 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            {/* 평가년도 */}
            <div className="flex items-center gap-3 shrink-0">
              <label className="text-sm font-semibold text-slate-700">평가년도</label>
              <div className="relative w-36">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="block w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <option value="2026">2026년</option>
                  <option value="2025">2025년</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0" />

            {/* 대상 부서 */}
            <div className="flex items-center gap-3 shrink-0">
              <label className="text-sm font-semibold text-slate-700">대상 부서</label>
              <div className="relative w-52">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="block w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  {departmentOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* 선택 삭제 (조건부) */}
            {someChecked && (
              <>
                <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0" />
                <button
                  onClick={deleteSelected}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold rounded-xl border border-rose-100 transition-all shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                  선택 삭제
                </button>
              </>
            )}
          </div>

          {/* 등록 현황 + 비중 */}
          <div className="flex items-center gap-6 bg-slate-50/80 rounded-xl px-6 py-4 border border-slate-100/80 w-full lg:w-auto shrink-0 relative z-10">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-500 mb-1">등록된 목표</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-slate-900 leading-none">{goals.length}</span>
                <span className="text-sm font-medium text-slate-400">건</span>
              </div>
            </div>

            <div className="w-px h-10 bg-slate-200" />

            <div className="flex flex-col min-w-[190px]">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-600">총 비중 합계</span>
                <div className="flex items-baseline gap-0.5">
                  <span
                    className={`text-xl font-bold leading-none ${
                      totalWeight === 100
                        ? 'text-emerald-600'
                        : totalWeight > 100
                        ? 'text-rose-500'
                        : 'text-amber-600'
                    }`}
                  >
                    {totalWeight}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      totalWeight === 100 ? 'text-emerald-500/70' : 'text-slate-400'
                    }`}
                  >
                    %
                  </span>
                </div>
              </div>
              <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                <div
                  className={`rounded-full h-2 transition-all duration-700 ${weightBarColor}`}
                  style={{ width: `${Math.min(totalWeight, 100)}%` }}
                />
              </div>
              {totalWeight === 100 ? (
                <span className="text-[11px] font-semibold text-emerald-600 mt-2 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  비중 100% 설정 완료
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-rose-500 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {totalWeight > 100
                    ? `비중 초과 (+${totalWeight - 100}%)`
                    : `비중 미달 (${100 - totalWeight}% 남음)`}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── 목표 목록 카드 ── */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_16px_rgba(0,0,0,0.02)] flex flex-col relative z-10">

          {/* 컬럼 헤더 */}
          <div className="flex items-center px-6 py-3.5 gap-4 bg-slate-50/80 border-b border-slate-200 rounded-t-2xl select-none">
            <div className="w-[60px] flex justify-center">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-slate-300 accent-brand-600 cursor-pointer"
              />
            </div>
            <div className="flex-1 grid grid-cols-12 gap-6 items-center">
              <div className="col-span-3 text-xs font-bold text-slate-500">상위조직목표</div>
              <div className="col-span-5 text-xs font-bold text-slate-500">목표 (수행 과제)</div>
              <div className="col-span-2 text-xs font-bold text-slate-500">평가구분</div>
              <div className="col-span-2 text-xs font-bold text-slate-500 text-right pr-4">비중 (%)</div>
            </div>
            <div className="w-12" />
          </div>

          {/* 목록 아이템 */}
          <div className="flex flex-col">
            {goals.length === 0 ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-600 mb-1">등록된 목표가 없습니다</p>
                  <p className="text-xs text-slate-400">아래 버튼을 눌러 첫 번째 팀 목표를 등록하세요.</p>
                </div>
              </div>
            ) : (
              goals.map((goal) => (
                <div
                  key={goal.id}
                  className={
                    goal.expanded
                      ? 'border-b border-brand-200 bg-brand-50/30 shadow-[inset_4px_0_0_#3b82f6]'
                      : 'border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors group'
                  }
                >
                  {/* 행 헤더 */}
                  <div
                    className={`flex items-center px-6 py-[18px] gap-4 cursor-pointer ${
                      goal.expanded ? 'border-b border-brand-100/60' : ''
                    }`}
                    onClick={() => toggleExpand(goal.id)}
                  >
                    {/* 체크박스 + 아코디언 아이콘 */}
                    <div className="w-[60px] flex items-center justify-between">
                      <div onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={goal.checked}
                          onChange={() => toggleRow(goal.id)}
                          className="w-4 h-4 rounded border-slate-300 accent-brand-600 cursor-pointer"
                        />
                      </div>
                      {goal.expanded ? (
                        <ChevronUp className="w-4.5 h-4.5 text-brand-600" />
                      ) : (
                        <ChevronDown className="w-4.5 h-4.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
                      )}
                    </div>

                    {/* 컬럼 데이터 */}
                    <div className="flex-1 grid grid-cols-12 gap-6 items-center">
                      {/* 상위조직목표 */}
                      <div
                        className={`col-span-3 text-sm truncate ${
                          goal.expanded
                            ? 'text-brand-600 font-semibold'
                            : 'text-slate-600 font-medium'
                        }`}
                        title={goal.orgGoal}
                      >
                        {goal.orgGoal || <span className="text-slate-300 font-normal">미입력</span>}
                      </div>

                      {/* 목표 */}
                      <div
                        className={`col-span-5 text-sm font-bold truncate ${
                          goal.expanded ? 'text-brand-900' : 'text-slate-900'
                        }`}
                        title={goal.goal}
                      >
                        {goal.goal || <span className="text-slate-300 font-normal">목표 미입력</span>}
                      </div>

                      {/* 평가구분 뱃지 */}
                      <div className="col-span-2 flex items-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${
                            goal.evalType === '정량'
                              ? 'bg-blue-50 text-blue-700 border-blue-100'
                              : 'bg-violet-50 text-violet-700 border-violet-100'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              goal.evalType === '정량' ? 'bg-blue-500' : 'bg-violet-500'
                            }`}
                          />
                          {goal.evalType}평가
                        </span>
                      </div>

                      {/* 비중 */}
                      <div
                        className={`col-span-2 text-sm font-bold text-right pr-4 font-mono ${
                          goal.expanded ? 'text-brand-700' : 'text-slate-700'
                        }`}
                      >
                        {goal.weight}%
                      </div>
                    </div>

                    {/* 삭제 버튼 */}
                    <div className="w-12 flex justify-end">
                      <button
                        onClick={(e) => deleteGoal(goal.id, e)}
                        className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-all"
                        title="삭제"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>

                  {/* 펼쳐진 폼 */}
                  {goal.expanded && (
                    <div className="px-6 py-7 pl-[100px] bg-white border-t border-brand-100 border-dashed">
                      <div className="grid grid-cols-2 gap-x-10 gap-y-7">

                        {/* 상위조직목표 — select */}
                        <div className="col-span-1 relative">
                          <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-2.5">
                            상위조직목표
                            <span className="text-rose-500 text-xs">*</span>
                          </label>
                          <div className="relative">
                            <select
                              value={goal.orgGoal}
                              onChange={(e) => updateField(goal.id, 'orgGoal', e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="block w-full pl-4 pr-10 py-3 border border-slate-200 rounded-xl bg-white text-sm font-medium text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:border-slate-300 transition-all shadow-sm"
                            >
                              {orgGoalOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* 목표 — text input */}
                        <div className="col-span-1">
                          <label className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-2.5">
                            목표 (수행 과제)
                            <span className="text-rose-500 text-xs">*</span>
                          </label>
                          <input
                            type="text"
                            value={goal.goal}
                            onChange={(e) => updateField(goal.id, 'goal', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="팀 목표를 입력하세요"
                            className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:border-slate-300 transition-all shadow-sm"
                          />
                        </div>

                        {/* 설정 사유 — textarea + 글자수 카운터 */}
                        <div className="col-span-2">
                          <div className="flex justify-between items-end mb-2.5">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-800">
                              <HelpCircle className="w-4 h-4 text-slate-400" />
                              설정 사유
                            </label>
                            <span className="text-xs font-medium text-slate-400">
                              {goal.reason.length} / 500자
                            </span>
                          </div>
                          <textarea
                            rows={2}
                            maxLength={500}
                            value={goal.reason}
                            onChange={(e) => updateField(goal.id, 'reason', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="목표 설정 사유를 입력하세요"
                            className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:border-slate-300 transition-all resize-y min-h-[80px] leading-relaxed shadow-sm"
                          />
                        </div>

                        {/* 핵심결과물 — textarea */}
                        <div className="col-span-2">
                          <div className="flex items-end mb-2.5">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-800">
                              <Target className="w-4 h-4 text-slate-400" />
                              핵심결과물 (Key Results)
                            </label>
                          </div>
                          <textarea
                            rows={3}
                            value={goal.keyResult}
                            onChange={(e) => updateField(goal.id, 'keyResult', e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="달성해야 할 핵심 결과물을 입력하세요"
                            className="block w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-white text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:border-slate-300 transition-all resize-y min-h-[100px] leading-relaxed shadow-sm"
                          />
                        </div>

                        {/* 평가구분 토글 + 비중 입력 */}
                        <div className="col-span-1 flex gap-6">
                          {/* 평가구분 — 토글 버튼 */}
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-slate-800 mb-2.5">평가구분</label>
                            <div
                              className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/60 shadow-inner"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => updateField(goal.id, 'evalType', '정량')}
                                className={`flex-1 py-2 text-sm rounded-lg transition-all ${
                                  goal.evalType === '정량'
                                    ? 'font-bold bg-white text-brand-600 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200/50'
                                    : 'font-semibold text-slate-500 hover:text-slate-700'
                                }`}
                              >
                                정량평가
                              </button>
                              <button
                                onClick={() => updateField(goal.id, 'evalType', '정성')}
                                className={`flex-1 py-2 text-sm rounded-lg transition-all ${
                                  goal.evalType === '정성'
                                    ? 'font-bold bg-white text-brand-600 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200/50'
                                    : 'font-semibold text-slate-500 hover:text-slate-700'
                                }`}
                              >
                                정성평가
                              </button>
                            </div>
                          </div>

                          {/* 비중 */}
                          <div className="flex-1">
                            <label className="block text-sm font-bold text-slate-800 mb-2.5">비중 (%)</label>
                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={goal.weight}
                                onChange={(e) => updateField(goal.id, 'weight', Number(e.target.value))}
                                className="block w-full pl-4 pr-10 py-3 border border-slate-200 rounded-xl bg-white text-base font-bold text-slate-900 text-right focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:border-slate-300 transition-all shadow-sm font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold select-none">
                                %
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 폼 액션 버튼 */}
                        <div className="col-span-1 flex items-end justify-end gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleExpand(goal.id); }}
                            className="px-5 py-2.5 bg-white text-slate-600 text-sm font-bold rounded-xl border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all"
                          >
                            접기
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-2.5 bg-brand-600 text-white text-sm font-bold rounded-xl hover:bg-brand-700 shadow-sm shadow-brand-500/30 transition-all"
                          >
                            변경사항 저장
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* 신규 목표 추가 버튼 */}
          <div className="p-3 bg-slate-50/30">
            <button
              onClick={addGoal}
              className="w-full py-3.5 flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all border border-dashed border-slate-300 hover:border-brand-300"
            >
              <Plus className="w-4.5 h-4.5" />
              신규 목표 행 추가하기
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
