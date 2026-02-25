import { useState } from 'react';
import { RotateCcw, Save, CheckCircle } from 'lucide-react';

type EvalLevel = '매우우수' | '우수' | '보통' | '미흡' | '매우미흡' | null;

interface CompetencyItem {
  id: string;
  name: string;
  definition: string;
  behaviorIndicators: string[];
}

const competencyItems: CompetencyItem[] = [
  {
    id: 'c01',
    name: '사업의 이해도',
    definition: '회사의 비즈니스 모델, 시장 환경, 경쟁 구도 및 산업 트렌드를 깊이 이해하고 이를 업무에 적극적으로 활용하는 역량',
    behaviorIndicators: [
      '회사의 전략 방향과 사업 목표를 정확히 이해하고 업무에 연계한다',
      '산업 및 시장 동향을 주기적으로 파악하고 변화에 민감하게 반응한다',
      '경쟁사 동향을 분석하여 차별화 방안을 모색한다',
    ],
  },
  {
    id: 'c02',
    name: '정보수집/분석력',
    definition: '다양한 경로를 통해 필요한 정보를 체계적으로 수집하고, 수집된 데이터를 논리적으로 분석하여 유의미한 인사이트를 도출하는 역량',
    behaviorIndicators: [
      '다양한 채널을 활용하여 신뢰성 높은 정보를 수집한다',
      '수집된 정보를 체계적으로 분류하고 핵심을 도출한다',
      '데이터에 기반한 분석으로 의사결정을 지원한다',
    ],
  },
  {
    id: 'c03',
    name: '전략적기획력',
    definition: '조직의 비전과 목표를 달성하기 위한 중장기 전략을 수립하고, 실행 가능한 로드맵을 작성하여 자원을 효과적으로 배분하는 역량',
    behaviorIndicators: [
      '조직 목표에 부합하는 전략적 방향성을 설정한다',
      '현실적이고 실행 가능한 계획을 수립한다',
      '리스크를 사전에 파악하고 대응 방안을 마련한다',
    ],
  },
  {
    id: 'c04',
    name: '체계적 실행력',
    definition: '수립된 계획을 체계적인 절차와 방법론을 적용하여 효율적으로 실행하고, 진척 사항을 지속적으로 모니터링하며 목표를 달성하는 역량',
    behaviorIndicators: [
      '업무 우선순위를 명확히 설정하고 계획적으로 실행한다',
      '업무 진행 상황을 정기적으로 점검하고 이슈를 조기에 발굴한다',
      '기한 내에 약속한 결과물을 완성도 높게 납기한다',
    ],
  },
  {
    id: 'c05',
    name: '문제해결력',
    definition: '업무 수행 중 발생하는 다양한 문제를 신속하게 인식하고, 근본 원인을 파악하여 효과적인 해결 방안을 도출하고 실행하는 역량',
    behaviorIndicators: [
      '문제의 근본 원인을 체계적으로 분석한다',
      '다양한 해결 대안을 도출하고 최선의 방안을 선택한다',
      '유사 문제의 재발 방지를 위한 예방 조치를 취한다',
    ],
  },
  {
    id: 'c06',
    name: '효과적결과보고/공유능력',
    definition: '업무 결과와 핵심 정보를 상황과 대상에 맞게 명확하고 간결하게 보고하며, 조직 내 원활한 정보 공유를 통해 협업 효과를 극대화하는 역량',
    behaviorIndicators: [
      '핵심 내용을 명확하고 간결하게 구조화하여 보고한다',
      '보고 대상과 목적에 맞는 적절한 형식과 수준으로 전달한다',
      '팀원들과 업무 정보를 적시에 공유하여 협업을 촉진한다',
    ],
  },
  {
    id: 'c07',
    name: '능동적피드백/적극적수용력',
    definition: '상사, 동료, 고객으로부터의 피드백을 열린 자세로 수용하고, 스스로도 적극적으로 피드백을 구하며 이를 성장의 기회로 삼는 역량',
    behaviorIndicators: [
      '타인의 피드백을 방어적으로 받아들이지 않고 성장 기회로 활용한다',
      '피드백을 바탕으로 행동 변화를 실천하고 개선 결과를 공유한다',
      '주변에 건설적인 피드백을 먼저 제공하여 상호 성장을 도모한다',
    ],
  },
  {
    id: 'c08',
    name: '창의적대안제시',
    definition: '기존 방식에 구애받지 않고 새로운 시각으로 아이디어를 발굴하며, 혁신적인 대안을 제시하여 조직의 변화와 성장을 이끄는 역량',
    behaviorIndicators: [
      '기존 틀을 벗어난 새로운 관점과 아이디어를 제시한다',
      '타 산업이나 분야의 사례를 적극 참고하여 혁신 아이디어를 도출한다',
      '창의적 아이디어를 실현 가능한 실행 계획으로 구체화한다',
    ],
  },
  {
    id: 'c09',
    name: '지속적개선',
    definition: '현재의 업무 방식과 프로세스에 만족하지 않고 지속적으로 개선점을 발굴하며, 작은 변화들을 꾸준히 실천하여 장기적인 성과 향상을 추구하는 역량',
    behaviorIndicators: [
      '반복되는 업무에서도 더 나은 방법을 끊임없이 모색한다',
      '작은 개선이라도 지속적으로 실천하고 그 효과를 측정한다',
      '개인 및 팀의 역량 향상을 위한 학습 활동에 능동적으로 참여한다',
    ],
  },
];

const evalLevels: { label: EvalLevel; score: number; color: string; bgColor: string; borderColor: string }[] = [
  { label: '매우우수', score: 5, color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-300' },
  { label: '우수', score: 4, color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-300' },
  { label: '보통', score: 3, color: 'text-slate-700', bgColor: 'bg-slate-50', borderColor: 'border-slate-300' },
  { label: '미흡', score: 2, color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-300' },
  { label: '매우미흡', score: 1, color: 'text-rose-700', bgColor: 'bg-rose-50', borderColor: 'border-rose-300' },
];

const getLevelStyle = (level: EvalLevel) => {
  const found = evalLevels.find((l) => l.label === level);
  return found ?? null;
};

const getScoreSummaryColor = (avg: number) => {
  if (avg >= 4.5) return 'text-emerald-600';
  if (avg >= 3.5) return 'text-blue-600';
  if (avg >= 2.5) return 'text-slate-700';
  if (avg >= 1.5) return 'text-amber-600';
  return 'text-rose-600';
};

const getScoreSummaryLabel = (avg: number) => {
  if (avg >= 4.5) return '매우우수';
  if (avg >= 3.5) return '우수';
  if (avg >= 2.5) return '보통';
  if (avg >= 1.5) return '미흡';
  return '매우미흡';
};

export const CompetencySelfEvalPage = () => {
  const [evaluations, setEvaluations] = useState<Record<string, EvalLevel>>({});
  const [saved, setSaved] = useState(false);

  const handleSelect = (itemId: string, level: EvalLevel) => {
    setSaved(false);
    setEvaluations((prev) => ({ ...prev, [itemId]: level }));
  };

  const handleReset = () => {
    setEvaluations({});
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  const evaluatedCount = Object.values(evaluations).filter((v) => v !== null && v !== undefined).length;
  const totalCount = competencyItems.length;
  const allDone = evaluatedCount === totalCount;

  const scoreSum = Object.entries(evaluations).reduce((sum, [, level]) => {
    const found = evalLevels.find((l) => l.label === level);
    return sum + (found?.score ?? 0);
  }, 0);
  const scoreAvg = evaluatedCount > 0 ? scoreSum / evaluatedCount : 0;

  return (
    <div className="p-8">
      {/* 페이지 헤더 */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs text-slate-400 mb-1">역량평가</p>
          <h1 className="text-2xl font-bold text-slate-900">본인평가</h1>
          <p className="text-sm text-slate-500 mt-1">9가지 직무역량 항목에 대해 본인의 역량 수준을 평가합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
          <button
            onClick={handleSave}
            disabled={!allDone}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            저장
          </button>
        </div>
      </div>

      {/* 진행 요약 카드 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-slate-500 mb-1">평가 진행률</p>
              <p className="text-2xl font-bold text-slate-900">
                {evaluatedCount}
                <span className="text-base font-normal text-slate-400"> / {totalCount}</span>
              </p>
            </div>
            <div className="w-px h-10 bg-slate-100" />
            {evaluatedCount > 0 && (
              <div>
                <p className="text-xs text-slate-500 mb-1">현재 평균 점수</p>
                <p className={`text-2xl font-bold ${getScoreSummaryColor(scoreAvg)}`}>
                  {scoreAvg.toFixed(1)}
                  <span className="text-sm font-semibold ml-1">{getScoreSummaryLabel(scoreAvg)}</span>
                </p>
              </div>
            )}
            {saved && allDone && (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">저장 완료</span>
              </div>
            )}
          </div>
          {!allDone && (
            <p className="text-xs text-amber-600 font-medium">
              미평가 항목 {totalCount - evaluatedCount}건이 남아있습니다
            </p>
          )}
          {allDone && !saved && (
            <p className="text-xs text-blue-600 font-medium">
              모든 항목 평가 완료 · 저장 버튼을 눌러 제출하세요
            </p>
          )}
        </div>

        {/* 프로그레스 바 */}
        <div className="mt-4">
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all ${allDone ? 'bg-emerald-500' : 'bg-blue-500'}`}
              style={{ width: `${(evaluatedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 역량 평가 항목 목록 */}
      <div className="space-y-4">
        {competencyItems.map((item, idx) => {
          const currentLevel = evaluations[item.id] ?? null;
          const currentStyle = getLevelStyle(currentLevel);

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all ${
                currentLevel
                  ? 'border-blue-100 shadow-[0_2px_12px_rgba(59,130,246,0.06)]'
                  : 'border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
              }`}
            >
              <div className="p-6">
                {/* 항목 헤더 */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                      {currentLevel && currentStyle && (
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentStyle.bgColor} ${currentStyle.color} ${currentStyle.borderColor}`}>
                          {currentLevel}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">{item.definition}</p>

                    {/* 행동 지표 */}
                    <ul className="space-y-1">
                      {item.behaviorIndicators.map((indicator, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                          <span className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 평가 선택 */}
                <div className="flex items-center gap-2 mt-5 pl-11">
                  {evalLevels.map((level) => {
                    const isSelected = evaluations[item.id] === level.label;
                    return (
                      <button
                        key={level.label}
                        type="button"
                        onClick={() => handleSelect(item.id, level.label)}
                        className={`flex-1 flex flex-col items-center justify-center px-3 py-3 rounded-xl border-2 transition-all ${
                          isSelected
                            ? `${level.bgColor} ${level.borderColor} ${level.color} shadow-sm`
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`text-lg font-bold mb-0.5 ${isSelected ? level.color : 'text-slate-400'}`}>
                          {level.score}
                        </span>
                        <span className={`text-xs font-semibold ${isSelected ? level.color : 'text-slate-500'}`}>
                          {level.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 액션 바 */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            * 모든 역량 항목에 대한 평가를 완료한 후 저장 버튼을 눌러 제출하세요.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              초기화
            </button>
            <button
              onClick={handleSave}
              disabled={!allDone}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
