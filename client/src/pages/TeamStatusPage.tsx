import { TrendingUp, TrendingDown, Users, Target, Award, Download, Filter } from 'lucide-react';

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

const teams = [
  { name: '개발팀', leader: '김민준', members: 24, achievement: 92, status: '우수', q1: 88, q2: 90, q3: 92 },
  { name: '마케팅팀', leader: '이서연', members: 18, achievement: 85, status: '양호', q1: 79, q2: 82, q3: 85 },
  { name: '영업팀', leader: '박지호', members: 32, achievement: 78, status: '양호', q1: 75, q2: 77, q3: 78 },
  { name: '디자인팀', leader: '최수아', members: 10, achievement: 95, status: '우수', q1: 90, q2: 93, q3: 95 },
  { name: '고객성공팀', leader: '정우성', members: 15, achievement: 62, status: '미달', q1: 58, q2: 60, q3: 62 },
  { name: '재무팀', leader: '한예진', members: 8, achievement: 88, status: '양호', q1: 83, q2: 86, q3: 88 },
  { name: '인사팀', leader: '오동현', members: 6, achievement: 91, status: '우수', q1: 87, q2: 89, q3: 91 },
  { name: '데이터팀', leader: '윤소희', members: 12, achievement: 44, status: '미달', q1: 40, q2: 42, q3: 44 },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    '우수': 'bg-emerald-100 text-emerald-700',
    '양호': 'bg-blue-100 text-blue-700',
    '미달': 'bg-rose-100 text-rose-600',
  };
  return map[status] ?? 'bg-gray-100 text-gray-500';
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
        <p className="text-sm text-slate-500 mt-1">2026년 1분기 기준 전체 팀 업적 달성 현황을 확인하세요.</p>
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

    <div className="grid grid-cols-3 gap-6 mb-8">
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

      {/* 팀별 현황 요약 */}
      <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-700">팀별 성과 현황</h2>
          <span className="text-xs text-slate-400">최근 3분기 추이</span>
        </div>
        <div className="space-y-3">
          {teams.slice(0, 5).map((t) => (
            <div key={t.name} className="flex items-center gap-4">
              <div className="w-20 text-sm font-medium text-slate-700 shrink-0">{t.name}</div>
              <div className="flex gap-1 items-end h-6">
                {[t.q1, t.q2, t.q3].map((v, i) => (
                  <div
                    key={i}
                    className={`w-4 rounded-sm ${progressColor(v)} opacity-${i === 2 ? '100' : i === 1 ? '70' : '40'}`}
                    style={{ height: `${(v / 100) * 24}px` }}
                    title={`Q${i + 1}: ${v}%`}
                  />
                ))}
              </div>
              <div className="flex-1">
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className={`${progressColor(t.achievement)} rounded-full h-1.5`}
                    style={{ width: `${t.achievement}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-bold text-slate-700 w-12 text-right shrink-0">{t.achievement}%</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${statusBadge(t.status)}`}>
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 팀 상세 테이블 */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-700">전체 팀 상세 현황</h2>
        <span className="text-xs text-slate-400">{teams.length}개 팀</span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left text-sm font-semibold text-slate-600 px-6 py-3.5">팀명</th>
            <th className="text-left text-sm font-semibold text-slate-600 px-4 py-3.5">팀장</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">인원</th>
            <th className="text-left text-sm font-semibold text-slate-600 px-4 py-3.5">달성률</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">상태</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t, idx) => (
            <tr
              key={t.name}
              className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${idx === teams.length - 1 ? 'border-none' : ''}`}
            >
              <td className="px-6 py-4 text-sm font-semibold text-slate-900">{t.name}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                    {t.leader[0]}
                  </div>
                  <span className="text-sm text-slate-700">{t.leader}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-center text-sm text-slate-600">{t.members}명</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 w-32 bg-slate-100 rounded-full h-1.5">
                    <div
                      className={`${progressColor(t.achievement)} rounded-full h-1.5`}
                      style={{ width: `${t.achievement}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-700 w-10 shrink-0">{t.achievement}%</span>
                </div>
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${statusBadge(t.status)}`}>
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
