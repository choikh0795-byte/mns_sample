import { Star, TrendingUp, Users, BarChart2, Download, Filter } from 'lucide-react';

const competencies = [
  { name: '리더십', weight: 20, avgScore: 3.8, maxScore: 5, level: '우수' },
  { name: '의사소통', weight: 15, avgScore: 4.1, maxScore: 5, level: '탁월' },
  { name: '문제해결력', weight: 20, avgScore: 3.6, maxScore: 5, level: '우수' },
  { name: '협업 능력', weight: 15, avgScore: 4.3, maxScore: 5, level: '탁월' },
  { name: '전문성', weight: 25, avgScore: 3.9, maxScore: 5, level: '우수' },
  { name: '혁신성', weight: 5, avgScore: 3.4, maxScore: 5, level: '보통' },
];

const individuals = [
  { name: '김민준', dept: '개발팀', leadership: 4.2, communication: 3.9, problem: 4.5, collaboration: 4.1, expertise: 4.8, total: 4.3 },
  { name: '이서연', dept: '마케팅팀', leadership: 3.8, communication: 4.6, problem: 3.7, collaboration: 4.4, expertise: 4.0, total: 4.1 },
  { name: '박지호', dept: '영업팀', leadership: 4.0, communication: 4.2, problem: 3.5, collaboration: 3.9, expertise: 3.8, total: 3.9 },
  { name: '최수아', dept: '디자인팀', leadership: 3.5, communication: 4.0, problem: 4.1, collaboration: 4.2, expertise: 4.6, total: 4.1 },
  { name: '정우성', dept: '고객성공팀', leadership: 3.2, communication: 3.8, problem: 3.4, collaboration: 3.7, expertise: 3.5, total: 3.5 },
];

const levelBadge = (level: string) => {
  const map: Record<string, string> = {
    '탁월': 'bg-violet-100 text-violet-700',
    '우수': 'bg-emerald-100 text-emerald-700',
    '보통': 'bg-amber-100 text-amber-700',
  };
  return map[level] ?? 'bg-gray-100 text-gray-500';
};

const ScoreBar = ({ value, max = 5 }: { value: number; max?: number }) => {
  const pct = (value / max) * 100;
  const color = pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-blue-500' : 'bg-amber-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
        <div className={`${color} rounded-full h-1.5`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-semibold text-slate-600 w-6 text-right">{value}</span>
    </div>
  );
};

export const CompetencyEvalPage = () => (
  <div className="p-8">
    <div className="flex items-start justify-between mb-8">
      <div>
        <p className="text-xs text-slate-400 mb-1">역량평가</p>
        <h1 className="text-2xl font-bold text-slate-900">역량평가 현황</h1>
        <p className="text-sm text-slate-500 mt-1">2026년 상반기 역량평가 진행 현황 및 결과를 확인하세요.</p>
      </div>
      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all">
          <Filter className="w-4 h-4" /> 필터
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Download className="w-4 h-4" /> 다운로드
        </button>
      </div>
    </div>

    {/* 지표 카드 */}
    <div className="grid grid-cols-3 gap-5 mb-8">
      {[
        { label: '평균 역량 점수', value: '3.87', sub: '/ 5.0 만점', icon: <Star className="w-5 h-5" />, iconBg: 'bg-violet-100', iconColor: 'text-violet-600' },
        { label: '평가 참여율', value: '91.2%', sub: '전체 임직원 대비', icon: <Users className="w-5 h-5" />, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
        { label: '역량 개선율', value: '+8.4%', sub: '전년 대비', icon: <TrendingUp className="w-5 h-5" />, iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
      ].map((s) => (
        <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 card-hover">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">{s.label}</p>
            <div className={`w-9 h-9 ${s.iconBg} rounded-xl flex items-center justify-center ${s.iconColor}`}>
              {s.icon}
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{s.value}</p>
          <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-5 gap-6 mb-8">
      {/* 역량 항목별 현황 */}
      <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-4 h-4 text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-700">역량 항목별 평균</h2>
        </div>
        <div className="space-y-4">
          {competencies.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700">{c.name}</span>
                  <span className="text-xs text-slate-400">({c.weight}%)</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${levelBadge(c.level)}`}>{c.level}</span>
              </div>
              <ScoreBar value={c.avgScore} max={c.maxScore} />
            </div>
          ))}
        </div>
      </div>

      {/* 개인별 역량 점수 */}
      <div className="col-span-3 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">개인별 역량 점수 (주요 5인)</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-semibold text-slate-500 pb-2.5">이름</th>
              <th className="text-center text-xs font-semibold text-slate-500 pb-2.5">리더십</th>
              <th className="text-center text-xs font-semibold text-slate-500 pb-2.5">소통</th>
              <th className="text-center text-xs font-semibold text-slate-500 pb-2.5">문제해결</th>
              <th className="text-center text-xs font-semibold text-slate-500 pb-2.5">협업</th>
              <th className="text-center text-xs font-semibold text-slate-500 pb-2.5">전문성</th>
              <th className="text-center text-xs font-semibold text-slate-500 pb-2.5">종합</th>
            </tr>
          </thead>
          <tbody>
            {individuals.map((p, idx) => (
              <tr key={p.name} className={`${idx !== individuals.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">{p.name[0]}</div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{p.name}</p>
                      <p className="text-[10px] text-slate-400">{p.dept}</p>
                    </div>
                  </div>
                </td>
                {[p.leadership, p.communication, p.problem, p.collaboration, p.expertise].map((v, i) => (
                  <td key={i} className="text-center">
                    <span className={`text-xs font-semibold ${v >= 4.0 ? 'text-emerald-600' : v >= 3.5 ? 'text-blue-600' : 'text-amber-600'}`}>{v}</span>
                  </td>
                ))}
                <td className="text-center">
                  <span className="text-sm font-bold text-slate-900">{p.total}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
