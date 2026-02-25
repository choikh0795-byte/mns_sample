import { useState } from 'react';
import { Search, ChevronDown, Save, Info, Eye } from 'lucide-react';

interface TeamGoalSecondEval {
  id: number;
  expanded: boolean;
  orgGoal: string;
  goal: string;
  keyResult: string;
  evalType: '정량' | '정성';
  weight: number;
  mainResult: string;
  achievementRate: number;
  selfScore: number;
  firstEvalScore: number;
  secondEvalScore: number | '';
}

const initialGoals: TeamGoalSecondEval[] = [
  {
    id: 1,
    expanded: false,
    orgGoal: '고객 만족도 향상',
    goal: '고객 응대 프로세스 개선 및 VOC 감소',
    keyResult: '고객 만족도 설문 결과 4.5점 이상 달성 및 응대 평균 시간 20분 이내 단축, VOC 월 50건 이하 유지',
    evalType: '정성',
    weight: 30,
    mainResult: '고객 만족도 4.6점 달성, VOC 월 43건으로 감소, 평균 응대 시간 17분으로 단축. 응대 매뉴얼 v2.0 배포 완료.',
    achievementRate: 105,
    selfScore: 98,
    firstEvalScore: 95,
    secondEvalScore: 93,
  },
  {
    id: 2,
    expanded: false,
    orgGoal: '매출 목표 달성',
    goal: '신규 거래처 확보 및 매출 신장',
    keyResult: '신규 거래처 15개사 이상 계약 체결 및 매출 10% 이상 성장, 신규 채널 매출 비중 30% 이상 달성',
    evalType: '정량',
    weight: 40,
    mainResult: '신규 거래처 17개사 계약 체결 완료, 매출 13% 성장 달성, 신규 채널 매출 비중 33% 확보.',
    achievementRate: 113,
    selfScore: 110,
    firstEvalScore: 112,
    secondEvalScore: 110,
  },
  {
    id: 3,
    expanded: false,
    orgGoal: '조직 역량 강화',
    goal: '팀원 역량 교육 및 멘토링 프로그램 운영',
    keyResult: '팀원 교육 이수율 100% 및 역량 평가 점수 평균 85점 이상 달성, 분기별 사내 세미나 2회 이상 진행',
    evalType: '정성',
    weight: 20,
    mainResult: '팀원 교육 이수율 100% 달성, 역량 평가 평균 87점, 사내 세미나 3회 진행 완료.',
    achievementRate: 100,
    selfScore: 90,
    firstEvalScore: 88,
    secondEvalScore: '',
  },
  {
    id: 4,
    expanded: false,
    orgGoal: '업무 효율화',
    goal: '반복 업무 자동화 및 업무 프로세스 개선',
    keyResult: '반복 업무 자동화율 60% 이상, 업무 처리 시간 20% 단축, 오류 발생률 5% 미만 유지',
    evalType: '정량',
    weight: 10,
    mainResult: '자동화율 65% 달성, 처리 시간 22% 단축, 오류 발생률 3.2% 유지.',
    achievementRate: 108,
    selfScore: 105,
    firstEvalScore: 105,
    secondEvalScore: '',
  },
];

const departmentOptions = ['개발팀', '마케팅팀', '영업팀', '인사팀', '재무팀', '디자인팀', '고객성공팀'];

const calcGrade = (score: number): { grade: string; cls: string } => {
  if (score >= 110) return { grade: 'S', cls: 'bg-violet-100 text-violet-700 border-violet-200' };
  if (score >= 90)  return { grade: 'A', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  if (score >= 70)  return { grade: 'B', cls: 'bg-blue-100 text-blue-700 border-blue-200' };
  if (score >= 60)  return { grade: 'C', cls: 'bg-amber-100 text-amber-700 border-amber-200' };
  return { grade: 'D', cls: 'bg-rose-100 text-rose-600 border-rose-200' };
};

export const TeamSecondEvalPage = () => {
  const [year, setYear] = useState('2026');
  const [department, setDepartment] = useState('개발팀');
  const [goals, setGoals] = useState<TeamGoalSecondEval[]>(initialGoals);

  const toggleExpand = (id: number) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, expanded: !g.expanded } : g)));
  };

  const updateScore = (id: number, value: string) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, secondEvalScore: value === '' ? '' : Math.min(120, Math.max(0, Number(value))) }
          : g
      )
    );
  };

  const firstWeightedTotal = goals.reduce(
    (sum, g) => sum + (g.firstEvalScore * g.weight) / 100,
    0
  );

  const secondWeightedTotal = goals.reduce((sum, g) => {
    if (g.secondEvalScore === '') return sum;
    return sum + (Number(g.secondEvalScore) * g.weight) / 100;
  }, 0);

  const allScored = goals.every((g) => g.secondEvalScore !== '');
  const firstGradeResult = calcGrade(firstWeightedTotal);
  const { grade: secondGrade, cls: secondCls } = allScored
    ? calcGrade(secondWeightedTotal)
    : { grade: '-', cls: 'bg-gray-100 text-gray-400 border-gray-200' };

  return (
    <div className="p-8">
      {/* 페이지 헤더 */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs text-slate-400 mb-1">팀 업적 관리</p>
          <h1 className="text-2xl font-bold text-slate-900">2차평가 등록</h1>
          <p className="text-sm text-slate-500 mt-1">1차 평가점수를 참고하여 최종 2차 업적평가 점수를 부여합니다.</p>
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
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">부서</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="block px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-40"
            >
              {departmentOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
            <Search className="w-4 h-4" />
            조회
          </button>
        </div>
      </div>

      {/* 1차 평가 결과 요약 */}
      <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <Eye className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-violet-700 mb-2">1차 평가 결과 (참고용)</p>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-violet-500 mb-0.5">가중합산 1차 점수</p>
                <p className="text-xl font-bold text-violet-800">{firstWeightedTotal.toFixed(1)}점</p>
              </div>
              <div className="h-8 w-px bg-violet-200" />
              <div>
                <p className="text-xs text-violet-500 mb-0.5">1차 등급</p>
                <span className={`px-3 py-1 rounded-lg text-base font-bold border ${firstGradeResult.cls}`}>
                  {firstGradeResult.grade}
                </span>
              </div>
              <div className="h-8 w-px bg-violet-200" />
              <div className="flex items-center gap-4">
                {goals.map((g) => (
                  <div key={g.id} className="text-center">
                    <p className="text-xs text-violet-500 mb-0.5 truncate max-w-[80px]">{g.goal.substring(0, 8)}…</p>
                    <p className="text-sm font-bold text-violet-700">{g.firstEvalScore}점</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 등급 기준 */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <Info className="w-4 h-4 text-amber-500 shrink-0" />
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs font-semibold text-amber-700">2차 평가등급 기준</span>
            {[
              { grade: 'S', label: '110점 이상', cls: 'bg-violet-100 text-violet-700' },
              { grade: 'A', label: '90점 이상', cls: 'bg-emerald-100 text-emerald-700' },
              { grade: 'B', label: '70점 이상', cls: 'bg-blue-100 text-blue-700' },
              { grade: 'C', label: '60점 이상', cls: 'bg-amber-100 text-amber-700' },
              { grade: 'D', label: '60점 미만', cls: 'bg-rose-100 text-rose-600' },
            ].map((g) => (
              <div key={g.grade} className="flex items-center gap-1.5">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${g.cls}`}>{g.grade}</span>
                <span className="text-xs text-amber-600">{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 목표별 2차 평가 목록 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-900">목표별 2차 평가</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
              {goals.length}건
            </span>
          </div>
          <span className="text-xs text-slate-400">1차 점수를 참고하여 2차 평가 점수를 입력하세요</span>
        </div>

        {/* 그리드 헤더 */}
        <div className="grid grid-cols-[2.5rem_1fr_1fr_5rem_6rem_6rem_7rem_2rem] gap-0 px-6 py-3 bg-slate-50/70 border-b border-slate-100">
          <div />
          <div className="text-xs font-semibold text-slate-500">목표</div>
          <div className="text-xs font-semibold text-slate-500">주요 실적</div>
          <div className="text-xs font-semibold text-slate-500 text-center">비중</div>
          <div className="text-xs font-semibold text-slate-500 text-center">본인점수</div>
          <div className="text-xs font-semibold text-violet-600 text-center">1차 점수</div>
          <div className="text-xs font-semibold text-amber-600 text-center">2차 평가점수</div>
          <div />
        </div>

        <div className="divide-y divide-slate-100">
          {goals.map((goal, idx) => {
            const secondWeighted = goal.secondEvalScore !== ''
              ? (Number(goal.secondEvalScore) * goal.weight) / 100
              : null;
            const scoreDiff =
              goal.secondEvalScore !== '' ? Number(goal.secondEvalScore) - goal.firstEvalScore : null;
            return (
              <div key={goal.id} className={goal.expanded ? 'bg-amber-50/20' : ''}>
                {/* 기본 행 */}
                <div
                  className="grid grid-cols-[2.5rem_1fr_1fr_5rem_6rem_6rem_7rem_2rem] gap-0 items-center px-6 py-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  onClick={() => toggleExpand(goal.id)}
                >
                  <div className="flex items-center justify-center">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="min-w-0 pr-3">
                    <p className="text-xs text-slate-400 mb-0.5 truncate">{goal.orgGoal}</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{goal.goal}</p>
                    <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${goal.evalType === '정량' ? 'bg-blue-100 text-blue-700' : 'bg-violet-100 text-violet-700'}`}>
                      {goal.evalType}
                    </span>
                  </div>
                  <div className="min-w-0 pr-3">
                    <p className="text-xs text-slate-500 truncate">{goal.mainResult}</p>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                      달성율 {goal.achievementRate}%
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-bold text-slate-700">{goal.weight}%</span>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-slate-500">{goal.selfScore}점</span>
                  </div>
                  {/* 1차 점수 (읽기 전용) */}
                  <div className="text-center">
                    <span className="text-sm font-bold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-lg">
                      {goal.firstEvalScore}점
                    </span>
                  </div>
                  {/* 2차 평가점수 입력 */}
                  <div className="flex flex-col items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min={0}
                        max={120}
                        value={goal.secondEvalScore}
                        onChange={(e) => updateScore(goal.id, e.target.value)}
                        placeholder="점수"
                        className="w-20 px-2.5 py-1.5 border-2 border-amber-200 rounded-lg bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-center pr-6 font-semibold"
                      />
                      <span className="absolute right-2 text-xs text-slate-400 pointer-events-none">점</span>
                    </div>
                    {secondWeighted !== null && (
                      <span className="text-xs text-amber-600 font-semibold">→ {secondWeighted.toFixed(1)}점</span>
                    )}
                    {scoreDiff !== null && (
                      <span className={`text-xs font-semibold ${scoreDiff > 0 ? 'text-emerald-600' : scoreDiff < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                        {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${goal.expanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* 상세 펼침 */}
                {goal.expanded && (
                  <div className="px-6 pb-5 pt-2 bg-slate-50/30 border-t border-slate-100">
                    <div className="max-w-4xl grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">핵심결과물</label>
                        <div className="px-3 py-2.5 bg-white border border-slate-100 rounded-lg text-sm text-slate-600 leading-relaxed">
                          {goal.keyResult}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">주요 실적</label>
                        <div className="px-3 py-2.5 bg-white border border-slate-100 rounded-lg text-sm text-slate-600 leading-relaxed">
                          {goal.mainResult}
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center gap-6 pt-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">달성율</span>
                          <span className="text-sm font-bold text-emerald-600">{goal.achievementRate}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">본인점수</span>
                          <span className="text-sm font-bold text-slate-700">{goal.selfScore}점</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">1차 평가점수</span>
                          <span className="text-sm font-bold text-violet-700">{goal.firstEvalScore}점</span>
                          <span className="text-xs text-slate-400">× {goal.weight}% = {((goal.firstEvalScore * goal.weight) / 100).toFixed(1)}점</span>
                        </div>
                        {goal.secondEvalScore !== '' && (
                          <div className="flex items-center gap-2 ml-auto">
                            <span className="text-xs text-slate-500">2차 평가점수</span>
                            <span className="text-sm font-bold text-amber-700">{goal.secondEvalScore}점</span>
                            <span className="text-xs text-slate-400">× {goal.weight}% = {((Number(goal.secondEvalScore) * goal.weight) / 100).toFixed(1)}점</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 하단 합산 요약 */}
        <div className="px-6 py-5 border-t border-slate-100 bg-gradient-to-r from-amber-50/50 to-white rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* 1차 결과 */}
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-0.5">1차 합산</p>
                <p className="text-lg font-bold text-violet-600">{firstWeightedTotal.toFixed(1)}점</p>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${firstGradeResult.cls}`}>
                  {firstGradeResult.grade}
                </span>
              </div>
              <div className="text-slate-300 text-lg font-light">→</div>
              {/* 2차 결과 */}
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-0.5">2차 합산 (최종)</p>
                <p className="text-2xl font-bold text-amber-700">
                  {allScored ? `${secondWeightedTotal.toFixed(1)}점` : '—'}
                </p>
                <span className={`px-3 py-1 rounded-xl text-base font-bold border ${secondCls}`}>
                  {secondGrade}
                </span>
              </div>
              {!allScored && (
                <p className="text-xs text-slate-400 italic ml-2">모든 목표에 점수를 입력하면 최종 등급이 산출됩니다.</p>
              )}
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
              <Save className="w-4 h-4" />
              최종 평가 확정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
