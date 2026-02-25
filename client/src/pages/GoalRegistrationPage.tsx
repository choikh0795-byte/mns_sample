import { useState } from 'react';
import { Trash2, Plus, Search, AlertCircle } from 'lucide-react';

interface Goal {
  id: number;
  checked: boolean;
  orgGoal: string;
  goal: string;
  reason: string;
  keyResult: string;
  evalType: string;
  weight: number;
}

const initialGoals: Goal[] = [
  {
    id: 1,
    checked: false,
    orgGoal: '고객 만족도 향상',
    goal: '고객 응대 프로세스 개선',
    reason: '고객 불만 접수 건수 30% 감소를 위한 응대 체계 구축 필요. 현재 평균 응대 시간이 업계 기준 대비 1.5배 수준으로 개선이 시급한 상황임.',
    keyResult: '고객 만족도 설문 결과 4.5점 이상 달성 및 응대 평균 시간 20분 이내로 단축',
    evalType: '정성',
    weight: 30,
  },
  {
    id: 2,
    checked: false,
    orgGoal: '매출 목표 달성',
    goal: '신규 거래처 확보 및 매출 신장',
    reason: '연간 매출 목표 120억 달성을 위한 신규 채널 확대 필요. 기존 거래처 의존도 감소 및 리스크 분산이 필요한 시점임.',
    keyResult: '신규 거래처 15개사 이상 계약 체결 및 매출 10% 이상 성장, 신규 채널 매출 비중 30% 이상 달성',
    evalType: '정량',
    weight: 40,
  },
  {
    id: 3,
    checked: false,
    orgGoal: '조직 역량 강화',
    goal: '팀원 역량 교육 및 멘토링 프로그램 운영',
    reason: '구성원의 직무 역량 향상 및 조직 내 지식 공유 문화 정착을 위해 체계적인 교육 시스템 도입 필요',
    keyResult: '팀원 교육 이수율 100% 및 역량 평가 점수 평균 85점 이상 달성, 분기별 사내 세미나 2회 이상 진행',
    evalType: '정성',
    weight: 20,
  },
  {
    id: 4,
    checked: false,
    orgGoal: '업무 효율화',
    goal: '반복 업무 자동화 및 업무 프로세스 개선',
    reason: '수작업 처리 비중 감소를 통한 핵심 업무 집중 환경 조성 및 인적 오류 최소화',
    keyResult: '반복 업무 자동화율 60% 이상, 업무 처리 시간 20% 단축, 오류 발생률 5% 미만 유지',
    evalType: '정량',
    weight: 10,
  },
];

const evalTypeOptions = ['정량', '정성', '공통'];

export const GoalRegistrationPage = () => {
  const [year, setYear] = useState('2026');
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [nextId, setNextId] = useState(5);

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

  const deleteSelected = () => {
    setGoals((prev) => prev.filter((g) => !g.checked));
  };

  const deleteGoal = (id: number) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const addGoal = () => {
    setGoals((prev) => [
      ...prev,
      {
        id: nextId,
        checked: false,
        orgGoal: '',
        goal: '',
        reason: '',
        keyResult: '',
        evalType: '정량',
        weight: 0,
      },
    ]);
    setNextId((n) => n + 1);
  };

  const updateField = (id: number, field: keyof Omit<Goal, 'id' | 'checked'>, value: string | number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  return (
    <div className="p-8">
      {/* 페이지 헤더 */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs text-slate-400 mb-1">개인별 업적평가</p>
          <h1 className="text-2xl font-bold text-slate-900">개인별 목표 등록</h1>
          <p className="text-sm text-slate-500 mt-1">평가 연도별 개인 목표를 등록하고 관리합니다.</p>
        </div>
      </div>

      {/* 조회 조건 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-4">조회 조건</p>
        <div className="flex items-end gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">평가년도</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="block px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-36"
            >
              <option value="2024">2024년</option>
              <option value="2025">2025년</option>
              <option value="2026">2026년</option>
            </select>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
            <Search className="w-4 h-4" />
            조회
          </button>
        </div>
      </div>

      {/* 목표 목록 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {/* 목록 헤더 액션 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
              />
              <span className="text-sm font-semibold text-slate-900">목표 목록</span>
            </label>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {goals.length}건
            </span>
            {/* 비중 합계 */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              totalWeight === 100
                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                : 'bg-rose-50 text-rose-600 border-rose-100'
            }`}>
              {totalWeight !== 100 && <AlertCircle className="w-3.5 h-3.5" />}
              비중 합계: {totalWeight}%
              {totalWeight === 100 && <span className="ml-0.5">✓</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {someChecked && (
              <button
                onClick={deleteSelected}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-medium rounded-xl border border-rose-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                선택 삭제
              </button>
            )}
            <button
              onClick={addGoal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              목표 등록
            </button>
          </div>
        </div>

        {/* 카드 목록 */}
        <div className="p-4 space-y-3">
          {goals.length === 0 ? (
            <div className="py-16 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500">등록된 목표가 없습니다.</p>
                <button
                  onClick={addGoal}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all"
                >
                  <Plus className="w-4 h-4" />
                  첫 번째 목표 등록
                </button>
              </div>
            </div>
          ) : (
            goals.map((goal, idx) => (
              <div
                key={goal.id}
                className={`border rounded-xl p-5 transition-all ${
                  goal.checked
                    ? 'border-blue-200 bg-blue-50/30'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                {/* 카드 헤더 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={goal.checked}
                      onChange={() => toggleRow(goal.id)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                    />
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">목표 {idx + 1}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium text-slate-500">평가구분</label>
                      <select
                        value={goal.evalType}
                        onChange={(e) => updateField(goal.id, 'evalType', e.target.value)}
                        className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      >
                        {evalTypeOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-medium text-slate-500">비중</label>
                      <div className="relative flex items-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={goal.weight}
                          onChange={(e) => updateField(goal.id, 'weight', Number(e.target.value))}
                          className="w-16 px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center"
                        />
                        <span className="absolute right-2 text-xs text-slate-400 pointer-events-none">%</span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 필드 그리드 */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      상위조직목표
                    </label>
                    <textarea
                      value={goal.orgGoal}
                      onChange={(e) => updateField(goal.id, 'orgGoal', e.target.value)}
                      placeholder="상위 조직목표를 입력하세요"
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      목표
                    </label>
                    <textarea
                      value={goal.goal}
                      onChange={(e) => updateField(goal.id, 'goal', e.target.value)}
                      placeholder="목표를 입력하세요"
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    설정 사유
                  </label>
                  <textarea
                    value={goal.reason}
                    onChange={(e) => updateField(goal.id, 'reason', e.target.value)}
                    placeholder="목표 설정 사유를 입력하세요"
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    핵심 결과물
                  </label>
                  <textarea
                    value={goal.keyResult}
                    onChange={(e) => updateField(goal.id, 'keyResult', e.target.value)}
                    placeholder="핵심 결과물을 입력하세요"
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* 하단 비중 합계 요약 */}
        {goals.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">
                * 비중(%)의 합계는 반드시 <span className="font-bold text-slate-700">100%</span>가 되어야 합니다.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-slate-500">총 {goals.length}개 목표</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">비중 합계</span>
                    <span className={`font-bold text-base ${totalWeight === 100 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {totalWeight}%
                    </span>
                    {totalWeight !== 100 && (
                      <span className="text-xs text-rose-500">
                        ({totalWeight > 100 ? `+${totalWeight - 100}%` : `-${100 - totalWeight}%`})
                      </span>
                    )}
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
                  저장
                </button>
              </div>
            </div>

            {/* 비중 프로그레스 바 */}
            <div className="mt-3">
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    totalWeight === 100
                      ? 'bg-emerald-500'
                      : totalWeight > 100
                      ? 'bg-rose-500'
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(totalWeight, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
