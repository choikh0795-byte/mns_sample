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
    reason: '고객 불만 접수 건수 30% 감소를 위한 응대 체계 구축 필요',
    keyResult: '고객 만족도 설문 결과 4.5점 이상 달성',
    evalType: '정성',
    weight: 30,
  },
  {
    id: 2,
    checked: false,
    orgGoal: '매출 목표 달성',
    goal: '신규 거래처 확보 및 매출 신장',
    reason: '연간 매출 목표 120억 달성을 위한 신규 채널 확대 필요',
    keyResult: '신규 거래처 15개사 이상 계약 체결 및 매출 10% 이상 성장',
    evalType: '정량',
    weight: 40,
  },
  {
    id: 3,
    checked: false,
    orgGoal: '조직 역량 강화',
    goal: '팀원 역량 교육 및 멘토링 프로그램 운영',
    reason: '구성원의 직무 역량 향상 및 조직 내 지식 공유 문화 정착',
    keyResult: '팀원 교육 이수율 100% 및 역량 평가 점수 평균 85점 이상',
    evalType: '정성',
    weight: 20,
  },
  {
    id: 4,
    checked: false,
    orgGoal: '업무 효율화',
    goal: '반복 업무 자동화 및 업무 프로세스 개선',
    reason: '수작업 처리 비중 감소를 통한 핵심 업무 집중 환경 조성',
    keyResult: '반복 업무 자동화율 60% 이상, 업무 처리 시간 20% 단축',
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
            <span className="text-sm font-semibold text-slate-900">목표 목록</span>
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

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-4 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                  />
                </th>
                <th className="text-left text-sm font-semibold text-slate-600 px-3 py-3.5 w-32">상위조직목표</th>
                <th className="text-left text-sm font-semibold text-slate-600 px-3 py-3.5 w-44">목표</th>
                <th className="text-left text-sm font-semibold text-slate-600 px-3 py-3.5">설정 사유</th>
                <th className="text-left text-sm font-semibold text-slate-600 px-3 py-3.5">핵심 결과물</th>
                <th className="text-center text-sm font-semibold text-slate-600 px-3 py-3.5 w-24">평가구분</th>
                <th className="text-center text-sm font-semibold text-slate-600 px-3 py-3.5 w-20">비중(%)</th>
              </tr>
            </thead>
            <tbody>
              {goals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
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
                  </td>
                </tr>
              ) : (
                goals.map((goal, idx) => (
                  <tr
                    key={goal.id}
                    className={`border-b border-slate-100 transition-colors ${
                      goal.checked ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'
                    } ${idx === goals.length - 1 ? 'border-none' : ''}`}
                  >
                    <td className="px-4 py-3.5">
                      <input
                        type="checkbox"
                        checked={goal.checked}
                        onChange={() => toggleRow(goal.id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={goal.orgGoal}
                        onChange={(e) => updateField(goal.id, 'orgGoal', e.target.value)}
                        placeholder="상위조직목표 입력"
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={goal.goal}
                        onChange={(e) => updateField(goal.id, 'goal', e.target.value)}
                        placeholder="목표 입력"
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={goal.reason}
                        onChange={(e) => updateField(goal.id, 'reason', e.target.value)}
                        placeholder="설정 사유 입력"
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={goal.keyResult}
                        onChange={(e) => updateField(goal.id, 'keyResult', e.target.value)}
                        placeholder="핵심 결과물 입력"
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <select
                        value={goal.evalType}
                        onChange={(e) => updateField(goal.id, 'evalType', e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center"
                      >
                        {evalTypeOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={goal.weight}
                        onChange={(e) => updateField(goal.id, 'weight', Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
