import { useState } from 'react';
import { Search, ChevronDown, AlertCircle, Save } from 'lucide-react';

interface TeamGoalResult {
  id: number;
  expanded: boolean;
  orgGoal: string;
  goal: string;
  reason: string;
  keyResult: string;
  evalType: '정량' | '정성';
  weight: number;
  mainResult: string;
  achievementRate: number | '';
  selfScore: number | '';
}

const initialGoals: TeamGoalResult[] = [
  {
    id: 1,
    expanded: false,
    orgGoal: '고객 만족도 향상',
    goal: '고객 응대 프로세스 개선 및 VOC 감소',
    reason: '고객 불만 접수 건수 30% 감소를 위한 응대 체계 구축이 필요합니다. 현재 평균 응대 시간이 업계 기준 대비 1.5배 수준으로 개선이 시급한 상황입니다.',
    keyResult: '고객 만족도 설문 결과 4.5점 이상 달성 및 응대 평균 시간 20분 이내 단축, VOC 월 50건 이하 유지',
    evalType: '정성',
    weight: 30,
    mainResult: '고객 만족도 4.6점 달성, VOC 월 43건으로 감소, 평균 응대 시간 17분으로 단축. 응대 매뉴얼 v2.0 배포 완료.',
    achievementRate: 105,
    selfScore: 98,
  },
  {
    id: 2,
    expanded: false,
    orgGoal: '매출 목표 달성',
    goal: '신규 거래처 확보 및 매출 신장',
    reason: '연간 매출 목표 120억 달성을 위한 신규 채널 확대가 필요합니다. 기존 거래처 의존도를 낮추고 리스크를 분산하기 위한 전략적 접근이 필요한 시점입니다.',
    keyResult: '신규 거래처 15개사 이상 계약 체결 및 매출 10% 이상 성장, 신규 채널 매출 비중 30% 이상 달성',
    evalType: '정량',
    weight: 40,
    mainResult: '신규 거래처 17개사 계약 체결 완료, 매출 13% 성장 달성, 신규 채널 매출 비중 33% 확보.',
    achievementRate: 113,
    selfScore: 110,
  },
  {
    id: 3,
    expanded: false,
    orgGoal: '조직 역량 강화',
    goal: '팀원 역량 교육 및 멘토링 프로그램 운영',
    reason: '구성원의 직무 역량 향상 및 조직 내 지식 공유 문화 정착을 위해 체계적인 교육 시스템 도입이 필요합니다.',
    keyResult: '팀원 교육 이수율 100% 및 역량 평가 점수 평균 85점 이상 달성, 분기별 사내 세미나 2회 이상 진행',
    evalType: '정성',
    weight: 20,
    mainResult: '팀원 교육 이수율 100% 달성, 역량 평가 평균 87점, 사내 세미나 3회 진행 완료.',
    achievementRate: 100,
    selfScore: 90,
  },
  {
    id: 4,
    expanded: false,
    orgGoal: '업무 효율화',
    goal: '반복 업무 자동화 및 업무 프로세스 개선',
    reason: '수작업 처리 비중 감소를 통한 핵심 업무 집중 환경 조성 및 인적 오류 최소화가 필요합니다.',
    keyResult: '반복 업무 자동화율 60% 이상, 업무 처리 시간 20% 단축, 오류 발생률 5% 미만 유지',
    evalType: '정량',
    weight: 10,
    mainResult: '자동화율 65% 달성, 처리 시간 22% 단축, 오류 발생률 3.2% 유지.',
    achievementRate: 108,
    selfScore: 105,
  },
];

const departmentOptions = ['개발팀', '마케팅팀', '영업팀', '인사팀', '재무팀', '디자인팀', '고객성공팀'];

export const TeamAchievementResultPage = () => {
  const [year, setYear] = useState('2026');
  const [department, setDepartment] = useState('개발팀');
  const [goals, setGoals] = useState<TeamGoalResult[]>(initialGoals);

  const totalWeight = goals.reduce((sum, g) => sum + g.weight, 0);
  const avgAchievement = goals
    .filter((g) => g.achievementRate !== '')
    .reduce((sum, g, _, arr) => sum + (Number(g.achievementRate) * g.weight) / 100 / arr.length, 0);

  const toggleExpand = (id: number) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, expanded: !g.expanded } : g)));
  };

  const updateField = (
    id: number,
    field: keyof Pick<TeamGoalResult, 'mainResult' | 'achievementRate' | 'selfScore'>,
    value: string | number
  ) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const weightedSelfScore = goals.reduce((sum, g) => {
    if (g.selfScore === '') return sum;
    return sum + (Number(g.selfScore) * g.weight) / 100;
  }, 0);

  return (
    <div className="p-8">
      {/* 페이지 헤더 */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs text-slate-400 mb-1">팀 업적 관리</p>
          <h1 className="text-2xl font-bold text-slate-900">실적 등록</h1>
          <p className="text-sm text-slate-500 mt-1">팀 업적목표에 대한 주요 실적, 달성률, 본인점수를 입력합니다.</p>
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

      {/* 실적 요약 카드 */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5">
          <p className="text-xs font-medium text-slate-500 mb-1">목표 수</p>
          <p className="text-2xl font-bold text-slate-900">{goals.length}개</p>
          <p className="text-xs text-slate-400 mt-1">비중 합계 {totalWeight}%</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5">
          <p className="text-xs font-medium text-slate-500 mb-1">가중 달성률</p>
          <p className="text-2xl font-bold text-emerald-600">{avgAchievement.toFixed(1)}%</p>
          <p className="text-xs text-slate-400 mt-1">비중 반영 달성률</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5">
          <p className="text-xs font-medium text-slate-500 mb-1">가중 본인점수</p>
          <p className="text-2xl font-bold text-blue-600">{weightedSelfScore.toFixed(1)}점</p>
          <p className="text-xs text-slate-400 mt-1">비중 반영 자기평가 점수</p>
        </div>
      </div>

      {/* 목표별 실적 목록 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-900">실적 목록</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {goals.length}건
            </span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                totalWeight === 100
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}
            >
              {totalWeight !== 100 && <AlertCircle className="w-3.5 h-3.5" />}
              비중 합계: {totalWeight}%
            </div>
          </div>
          <span className="text-xs text-slate-400">클릭하여 실적을 입력하세요</span>
        </div>

        {/* 그리드 헤더 */}
        <div className="grid grid-cols-[2.5rem_1fr_1fr_6rem_5rem_2rem] gap-0 px-6 py-3 bg-slate-50/70 border-b border-slate-100">
          <div />
          <div className="text-xs font-semibold text-slate-500">상위조직목표 / 목표</div>
          <div className="text-xs font-semibold text-slate-500">핵심결과물</div>
          <div className="text-xs font-semibold text-slate-500 text-center">평가구분</div>
          <div className="text-xs font-semibold text-slate-500 text-center">비중(%)</div>
          <div />
        </div>

        {/* 아코디언 목록 */}
        <div className="divide-y divide-slate-100">
          {goals.map((goal, idx) => {
            const hasResult = goal.mainResult.trim() !== '' || goal.achievementRate !== '' || goal.selfScore !== '';
            return (
              <div key={goal.id} className={goal.expanded ? 'bg-blue-50/20' : ''}>
                {/* 기본 행 */}
                <div
                  className="grid grid-cols-[2.5rem_1fr_1fr_6rem_5rem_2rem] gap-0 items-center px-6 py-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  onClick={() => toggleExpand(goal.id)}
                >
                  <div className="flex items-center justify-center">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="min-w-0 pr-4">
                    <p className="text-xs text-slate-400 mb-0.5 truncate">{goal.orgGoal}</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{goal.goal}</p>
                  </div>
                  <div className="min-w-0 pr-4">
                    <p className="text-xs text-slate-500 truncate">{goal.keyResult}</p>
                    {hasResult && (
                      <div className="flex items-center gap-2 mt-1">
                        {goal.achievementRate !== '' && (
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            달성율 {goal.achievementRate}%
                          </span>
                        )}
                        {goal.selfScore !== '' && (
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            본인점수 {goal.selfScore}점
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${goal.evalType === '정량' ? 'bg-blue-100 text-blue-700' : 'bg-violet-100 text-violet-700'}`}>
                      {goal.evalType}
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-sm font-bold text-slate-700">{goal.weight}%</span>
                  </div>
                  <div className="flex justify-center">
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${goal.expanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* 펼쳐진 상세 영역 */}
                {goal.expanded && (
                  <div className="px-6 pb-6 pt-2 bg-slate-50/40 border-t border-slate-100">
                    <div className="max-w-4xl">
                      {/* 목표 정보 (읽기 전용) */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5">상위조직목표</label>
                          <div className="px-3 py-2.5 bg-white border border-slate-100 rounded-lg text-sm text-slate-600">
                            {goal.orgGoal}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5">목표</label>
                          <div className="px-3 py-2.5 bg-white border border-slate-100 rounded-lg text-sm text-slate-600">
                            {goal.goal}
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">설정 사유</label>
                        <div className="px-3 py-2.5 bg-white border border-slate-100 rounded-lg text-sm text-slate-600 leading-relaxed">
                          {goal.reason}
                        </div>
                      </div>
                      <div className="mb-5">
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">핵심결과물</label>
                        <div className="px-3 py-2.5 bg-white border border-slate-100 rounded-lg text-sm text-slate-600 leading-relaxed">
                          {goal.keyResult}
                        </div>
                      </div>

                      {/* 실적 입력 구분선 */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 h-px bg-blue-100" />
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                          실적 입력 영역
                        </span>
                        <div className="flex-1 h-px bg-blue-100" />
                      </div>

                      {/* 주요실적 */}
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                          주요 실적 <span className="text-rose-400">*</span>
                        </label>
                        <textarea
                          value={goal.mainResult}
                          onChange={(e) => updateField(goal.id, 'mainResult', e.target.value)}
                          placeholder="주요 실적을 구체적으로 입력하세요 (수치, 달성 내용 등)"
                          rows={3}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                        />
                      </div>

                      {/* 달성율 + 본인점수 */}
                      <div className="flex items-end gap-6">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                            달성율 (%) <span className="text-rose-400">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type="number"
                              min={0}
                              max={200}
                              value={goal.achievementRate}
                              onChange={(e) =>
                                updateField(goal.id, 'achievementRate', e.target.value === '' ? '' : Number(e.target.value))
                              }
                              placeholder="0"
                              className="w-28 px-3 py-2.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center pr-7"
                            />
                            <span className="absolute right-2.5 text-xs text-slate-400 pointer-events-none">%</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">목표 대비 실제 달성 비율</p>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                            본인점수 <span className="text-rose-400">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type="number"
                              min={0}
                              max={120}
                              value={goal.selfScore}
                              onChange={(e) =>
                                updateField(goal.id, 'selfScore', e.target.value === '' ? '' : Number(e.target.value))
                              }
                              placeholder="0"
                              className="w-28 px-3 py-2.5 border border-slate-200 rounded-lg bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center pr-8"
                            />
                            <span className="absolute right-2.5 text-xs text-slate-400 pointer-events-none">점</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">0 ~ 120점 범위</p>
                        </div>
                        {goal.selfScore !== '' && (
                          <div className="pb-0.5">
                            <p className="text-xs text-slate-500 mb-1">가중 기여점수</p>
                            <p className="text-lg font-bold text-blue-600">
                              {((Number(goal.selfScore) * goal.weight) / 100).toFixed(1)}점
                            </p>
                            <p className="text-xs text-slate-400">{goal.selfScore}점 × {goal.weight}%</p>
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

        {/* 하단 요약 */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              * 주요 실적, 달성율, 본인점수를 모두 입력한 후 저장하세요.
            </p>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-5 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">가중 본인점수 합계</span>
                  <span className="font-bold text-base text-blue-600">{weightedSelfScore.toFixed(1)}점</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
                <Save className="w-4 h-4" />
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
