import {
  TrendingUp, TrendingDown, Users, Target, Award, Download, Filter,
  CheckCircle, Clock, AlertCircle, ChevronRight,
} from 'lucide-react';

const stats = [
  {
    label: '전체 팀 달성률',
    value: '87.4%',
    change: '+3.2%',
    up: true,
    icon: <Target className="w-5 h-5" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    sub: '목표 대비 달성',
  },
  {
    label: '팀원 총 인원',
    value: '312명',
    change: '+8명',
    up: true,
    icon: <Users className="w-5 h-5" />,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    sub: '전분기 대비',
  },
  {
    label: '우수 달성 팀',
    value: '14팀',
    change: '+2팀',
    up: true,
    icon: <Award className="w-5 h-5" />,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    sub: '90% 이상 달성',
  },
  {
    label: '미달성 팀',
    value: '3팀',
    change: '-1팀',
    up: false,
    icon: <TrendingDown className="w-5 h-5" />,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-500',
    sub: '50% 미만 달성',
  },
];

// 4단계 프로세스 현황
const processStages = [
  {
    step: 1,
    label: '목표 등록',
    desc: '팀 업적목표 등록',
    completed: 8,
    total: 8,
    color: 'emerald',
  },
  {
    step: 2,
    label: '실적 등록',
    desc: '주요 실적 및 달성률 입력',
    completed: 6,
    total: 8,
    color: 'blue',
  },
  {
    step: 3,
    label: '1차 평가',
    desc: '1차 업적평가 점수 부여',
    completed: 4,
    total: 8,
    color: 'violet',
  },
  {
    step: 4,
    label: '2차 평가',
    desc: '2차 업적평가 점수 확정',
    completed: 2,
    total: 8,
    color: 'amber',
  },
];

// 팀별 4단계 진행 현황
const teams = [
  {
    name: '개발팀',
    leader: '김민준',
    members: 24,
    achievement: 92,
    goalScore: 95,
    selfScore: 91,
    firstScore: 93,
    secondScore: 92,
    firstGrade: 'S',
    secondGrade: 'S',
    stages: ['완료', '완료', '완료', '완료'],
  },
  {
    name: '마케팅팀',
    leader: '이서연',
    members: 18,
    achievement: 85,
    goalScore: 88,
    selfScore: 85,
    firstScore: 87,
    secondScore: 86,
    firstGrade: 'A',
    secondGrade: 'A',
    stages: ['완료', '완료', '완료', '완료'],
  },
  {
    name: '영업팀',
    leader: '박지호',
    members: 32,
    achievement: 78,
    goalScore: 80,
    selfScore: 78,
    firstScore: 79,
    secondScore: null,
    firstGrade: 'B',
    secondGrade: null,
    stages: ['완료', '완료', '완료', '진행중'],
  },
  {
    name: '디자인팀',
    leader: '최수아',
    members: 10,
    achievement: 95,
    goalScore: 97,
    selfScore: 94,
    firstScore: null,
    secondScore: null,
    firstGrade: null,
    secondGrade: null,
    stages: ['완료', '완료', '진행중', '미시작'],
  },
  {
    name: '고객성공팀',
    leader: '정우성',
    members: 15,
    achievement: 62,
    goalScore: 65,
    selfScore: 62,
    firstScore: null,
    secondScore: null,
    firstGrade: null,
    secondGrade: null,
    stages: ['완료', '완료', '미시작', '미시작'],
  },
  {
    name: '재무팀',
    leader: '한예진',
    members: 8,
    achievement: 88,
    goalScore: 90,
    selfScore: 88,
    firstScore: null,
    secondScore: null,
    firstGrade: null,
    secondGrade: null,
    stages: ['완료', '진행중', '미시작', '미시작'],
  },
  {
    name: '인사팀',
    leader: '오동현',
    members: 6,
    achievement: 91,
    goalScore: 93,
    selfScore: 91,
    firstScore: null,
    secondScore: null,
    firstGrade: null,
    secondGrade: null,
    stages: ['완료', '진행중', '미시작', '미시작'],
  },
  {
    name: '데이터팀',
    leader: '윤소희',
    members: 12,
    achievement: 44,
    goalScore: null,
    selfScore: null,
    firstScore: null,
    secondScore: null,
    firstGrade: null,
    secondGrade: null,
    stages: ['완료', '미시작', '미시작', '미시작'],
  },
];

const gradeBadgeClass = (grade: string | null) => {
  if (!grade) return 'bg-gray-100 text-gray-400';
  const map: Record<string, string> = {
    S: 'bg-violet-100 text-violet-700',
    A: 'bg-emerald-100 text-emerald-700',
    B: 'bg-blue-100 text-blue-700',
    C: 'bg-amber-100 text-amber-700',
    D: 'bg-rose-100 text-rose-600',
  };
  return map[grade] ?? 'bg-gray-100 text-gray-500';
};

const stageBadge = (status: string) => {
  const map: Record<string, string> = {
    '완료': 'bg-emerald-100 text-emerald-700',
    '진행중': 'bg-amber-100 text-amber-700',
    '미시작': 'bg-gray-100 text-gray-400',
  };
  return map[status] ?? 'bg-gray-100 text-gray-500';
};

const stageIcon = (status: string) => {
  if (status === '완료') return <CheckCircle className="w-3.5 h-3.5" />;
  if (status === '진행중') return <Clock className="w-3.5 h-3.5" />;
  return <AlertCircle className="w-3.5 h-3.5" />;
};

const processColorMap: Record<string, { bg: string; text: string; border: string; bar: string; light: string }> = {
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200', bar: 'bg-emerald-500', light: 'bg-emerald-50' },
  blue:    { bg: 'bg-blue-500',    text: 'text-blue-700',    border: 'border-blue-200',    bar: 'bg-blue-500',    light: 'bg-blue-50' },
  violet:  { bg: 'bg-violet-500',  text: 'text-violet-700',  border: 'border-violet-200',  bar: 'bg-violet-500',  light: 'bg-violet-50' },
  amber:   { bg: 'bg-amber-500',   text: 'text-amber-700',   border: 'border-amber-200',   bar: 'bg-amber-400',   light: 'bg-amber-50' },
};

const progressColor = (v: number) =>
  v >= 80 ? 'bg-emerald-500' : v >= 50 ? 'bg-blue-500' : 'bg-amber-400';

const quarterTrend = [
  { label: '2025 Q1', value: 76 },
  { label: '2025 Q2', value: 80 },
  { label: '2025 Q3', value: 84 },
  { label: '2025 Q4', value: 87 },
  { label: '2026 Q1', value: 87 },
];

export const TeamStatusPage = () => (
  <div className="p-8">
    {/* 페이지 헤더 */}
    <div className="flex items-start justify-between mb-8">
      <div>
        <p className="text-xs text-slate-400 mb-1">팀 업적 관리</p>
        <h1 className="text-2xl font-bold text-slate-900">팀 성과 현황</h1>
        <p className="text-sm text-slate-500 mt-1">2026년 1분기 기준 전체 팀 업적 달성 및 평가 진행 현황을 확인하세요.</p>
      </div>
      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all">
          <Filter className="w-4 h-4" /> 필터
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Download className="w-4 h-4" /> 리포트 다운로드
        </button>
      </div>
    </div>

    {/* 지표 카드 */}
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 card-hover">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">{s.label}</p>
            <div className={`w-9 h-9 ${s.iconBg} rounded-xl flex items-center justify-center ${s.iconColor}`}>
              {s.icon}
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-2">{s.value}</p>
          <div className="flex items-center gap-1.5">
            {s.up ? (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span className={`text-xs font-semibold ${s.up ? 'text-emerald-600' : 'text-rose-500'}`}>{s.change}</span>
            <span className="text-xs text-slate-400">{s.sub}</span>
          </div>
        </div>
      ))}
    </div>

    {/* 업적관리 프로세스 현황 */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">업적관리 프로세스 현황</h2>
          <p className="text-xs text-slate-400 mt-0.5">전체 8개 팀 기준 단계별 진행 현황</p>
        </div>
        <span className="text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">2026년 1분기</span>
      </div>

      <div className="flex items-center gap-2">
        {processStages.map((stage, idx) => {
          const col = processColorMap[stage.color];
          const pct = Math.round((stage.completed / stage.total) * 100);
          return (
            <div key={stage.step} className="flex items-center flex-1 gap-2">
              {/* 카드 */}
              <div className={`flex-1 rounded-2xl border ${col.border} ${col.light} p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${col.bg} flex items-center justify-center text-white text-xs font-bold`}>
                      {stage.step}
                    </div>
                    <span className={`text-sm font-semibold ${col.text}`}>{stage.label}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{stage.completed}/{stage.total}팀</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">{stage.desc}</p>
                <div className="w-full bg-white rounded-full h-1.5 border border-slate-100">
                  <div
                    className={`${col.bar} rounded-full h-1.5 transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className={`text-xs font-bold mt-1.5 ${col.text}`}>{pct}% 완료</p>
              </div>
              {/* 화살표 */}
              {idx < processStages.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6 mb-6">
      {/* 분기별 달성률 트렌드 */}
      <div className="col-span-1 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">분기별 달성률 추이</h2>
        <div className="space-y-3">
          {quarterTrend.map((q) => (
            <div key={q.label}>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>{q.label}</span>
                <span className="font-semibold text-slate-700">{q.value}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className={`${progressColor(q.value)} rounded-full h-1.5 transition-all`}
                  style={{ width: `${q.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 평가 등급 분포 */}
      <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-700">2차평가 등급 분포 현황</h2>
          <span className="text-xs text-slate-400">확정 팀 기준</span>
        </div>
        <div className="grid grid-cols-5 gap-3 mb-4">
          {[
            { grade: 'S', label: '110점 이상', count: 2, cls: 'bg-violet-50 border-violet-200 text-violet-700', bar: 'bg-violet-500' },
            { grade: 'A', label: '90~109점', count: 0, cls: 'bg-emerald-50 border-emerald-200 text-emerald-700', bar: 'bg-emerald-500' },
            { grade: 'B', label: '70~89점', count: 0, cls: 'bg-blue-50 border-blue-200 text-blue-700', bar: 'bg-blue-500' },
            { grade: 'C', label: '60~69점', count: 0, cls: 'bg-amber-50 border-amber-200 text-amber-700', bar: 'bg-amber-400' },
            { grade: 'D', label: '60점 미만', count: 0, cls: 'bg-rose-50 border-rose-200 text-rose-600', bar: 'bg-rose-400' },
          ].map((g) => (
            <div key={g.grade} className={`rounded-xl border p-4 text-center ${g.cls}`}>
              <p className="text-2xl font-bold mb-1">{g.grade}</p>
              <p className="text-xs opacity-70 mb-2">{g.label}</p>
              <p className="text-xl font-bold">{g.count}팀</p>
            </div>
          ))}
        </div>
        <div className="text-xs text-slate-400 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="font-semibold text-slate-600">등급 기준</span>
          &nbsp;·&nbsp; S: 110점 이상 &nbsp;·&nbsp; A: 90점 이상 &nbsp;·&nbsp; B: 70점 이상 &nbsp;·&nbsp; C: 60점 이상 &nbsp;·&nbsp; D: 60점 미만
        </div>
      </div>
    </div>

    {/* 팀별 업적 단계 현황 테이블 */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-semibold text-slate-700">팀별 업적관리 단계 현황</h2>
          <p className="text-xs text-slate-400 mt-0.5">각 팀의 목표등록 → 실적등록 → 1차평가 → 2차평가 진행 상태</p>
        </div>
        <span className="text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{teams.length}개 팀</span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">팀명</th>
            <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">팀장</th>
            <th className="text-center text-xs font-semibold text-slate-500 px-3 py-3">달성률</th>
            <th className="text-center text-xs font-semibold text-emerald-600 px-3 py-3">① 목표등록</th>
            <th className="text-center text-xs font-semibold text-blue-600 px-3 py-3">② 실적등록</th>
            <th className="text-center text-xs font-semibold text-violet-600 px-3 py-3">③ 1차평가</th>
            <th className="text-center text-xs font-semibold text-amber-600 px-3 py-3">④ 2차평가</th>
            <th className="text-center text-xs font-semibold text-slate-500 px-4 py-3">1차등급</th>
            <th className="text-center text-xs font-semibold text-slate-500 px-4 py-3">2차등급</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t, idx) => (
            <tr
              key={t.name}
              className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${idx === teams.length - 1 ? 'border-none' : ''}`}
            >
              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-slate-900">{t.name}</span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                    {t.leader[0]}
                  </div>
                  <span className="text-sm text-slate-700">{t.leader}</span>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-bold text-slate-800">{t.achievement}%</span>
                  <div className="w-16 bg-slate-100 rounded-full h-1.5">
                    <div
                      className={`${progressColor(t.achievement)} rounded-full h-1.5`}
                      style={{ width: `${t.achievement}%` }}
                    />
                  </div>
                </div>
              </td>
              {t.stages.map((stage, si) => (
                <td key={si} className="px-3 py-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${stageBadge(stage)}`}>
                    {stageIcon(stage)}
                    {stage}
                  </span>
                </td>
              ))}
              <td className="px-4 py-4 text-center">
                {t.firstGrade ? (
                  <div className="flex flex-col items-center gap-0.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${gradeBadgeClass(t.firstGrade)}`}>
                      {t.firstGrade}
                    </span>
                    <span className="text-xs text-slate-400">{t.firstScore}점</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-300">-</span>
                )}
              </td>
              <td className="px-4 py-4 text-center">
                {t.secondGrade ? (
                  <div className="flex flex-col items-center gap-0.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${gradeBadgeClass(t.secondGrade)}`}>
                      {t.secondGrade}
                    </span>
                    <span className="text-xs text-slate-400">{t.secondScore}점</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-300">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
