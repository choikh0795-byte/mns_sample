import { Award, TrendingUp, Users, FileText, Download, BarChart2 } from 'lucide-react';

const rankings = [
  { rank: 1, name: '오동현', dept: '인사팀', achievement: 91, competency: 4.4, culture: 4.5, total: 93, grade: 'S' },
  { rank: 2, name: '최수아', dept: '디자인팀', achievement: 95, competency: 4.1, culture: 4.2, total: 91, grade: 'S' },
  { rank: 3, name: '김민준', dept: '개발팀', achievement: 92, competency: 4.3, culture: 3.9, total: 90, grade: 'A+' },
  { rank: 4, name: '한예진', dept: '재무팀', achievement: 88, competency: 3.9, culture: 4.1, total: 87, grade: 'A' },
  { rank: 5, name: '이서연', dept: '마케팅팀', achievement: 85, competency: 4.1, culture: 3.8, total: 85, grade: 'A' },
  { rank: 6, name: '박지호', dept: '영업팀', achievement: 78, competency: 3.9, culture: 3.7, total: 78, grade: 'B+' },
  { rank: 7, name: '정우성', dept: '고객성공팀', achievement: 65, competency: 3.5, culture: 3.6, total: 65, grade: 'B' },
  { rank: 8, name: '윤소희', dept: '데이터팀', achievement: 44, competency: 0, culture: 0, total: 0, grade: '-' },
];

const deptSummary = [
  { dept: '디자인팀', avgScore: 91.2, headcount: 10, topGrade: 'S' },
  { dept: '인사팀', avgScore: 90.5, headcount: 6, topGrade: 'S' },
  { dept: '개발팀', avgScore: 88.3, headcount: 24, topGrade: 'A+' },
  { dept: '재무팀', avgScore: 86.7, headcount: 8, topGrade: 'A' },
  { dept: '마케팅팀', avgScore: 84.1, headcount: 18, topGrade: 'A' },
];

const gradeBadge = (g: string) => {
  if (g === 'S') return 'bg-violet-100 text-violet-700';
  if (g.startsWith('A')) return 'bg-emerald-100 text-emerald-700';
  if (g.startsWith('B')) return 'bg-blue-100 text-blue-700';
  return 'bg-gray-100 text-gray-400';
};

const rankMedal = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
};

export const ComprehensivePage = () => (
  <div className="p-8">
    <div className="flex items-start justify-between mb-8">
      <div>
        <p className="text-xs text-slate-400 mb-1">종합평가</p>
        <h1 className="text-2xl font-bold text-slate-900">종합 점수 현황</h1>
        <p className="text-sm text-slate-500 mt-1">업적·역량·조직문화를 종합한 2026년 상반기 최종 평가 결과입니다.</p>
      </div>
      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all">
          <FileText className="w-4 h-4" /> 보고서 생성
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Download className="w-4 h-4" /> 전체 다운로드
        </button>
      </div>
    </div>

    {/* 지표 카드 */}
    <div className="grid grid-cols-4 gap-5 mb-8">
      {[
        { label: '전사 평균 종합점수', value: '82.4점', sub: '/ 100점 만점', icon: <Award className="w-5 h-5" />, ibg: 'bg-violet-100', ic: 'text-violet-600' },
        { label: 'S등급 인원', value: '38명', sub: '전체의 12.2%', icon: <TrendingUp className="w-5 h-5" />, ibg: 'bg-emerald-100', ic: 'text-emerald-600' },
        { label: '평가 완료 인원', value: '294명', sub: '312명 중', icon: <Users className="w-5 h-5" />, ibg: 'bg-blue-100', ic: 'text-blue-600' },
        { label: '평가 부서', value: '8개', sub: '전체 부서 참여', icon: <BarChart2 className="w-5 h-5" />, ibg: 'bg-amber-100', ic: 'text-amber-600' },
      ].map((s) => (
        <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 card-hover">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">{s.label}</p>
            <div className={`w-9 h-9 ${s.ibg} rounded-xl flex items-center justify-center ${s.ic}`}>{s.icon}</div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">{s.value}</p>
          <p className="text-xs text-slate-400">{s.sub}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-3 gap-6 mb-8">
      {/* 등급 분포 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">등급 분포</h2>
        <div className="space-y-3">
          {[
            { grade: 'S', count: 38, pct: 12.2, color: 'bg-violet-500' },
            { grade: 'A+', count: 64, pct: 20.5, color: 'bg-emerald-500' },
            { grade: 'A', count: 89, pct: 28.5, color: 'bg-blue-500' },
            { grade: 'B+', count: 72, pct: 23.1, color: 'bg-sky-400' },
            { grade: 'B', count: 31, pct: 9.9, color: 'bg-amber-400' },
            { grade: 'C 이하', count: 18, pct: 5.8, color: 'bg-rose-400' },
          ].map((g) => (
            <div key={g.grade}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">{g.grade}</span>
                <span className="text-slate-500">{g.count}명 ({g.pct}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className={`${g.color} rounded-full h-1.5`} style={{ width: `${g.pct * 3}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 부서별 요약 */}
      <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">부서별 종합 현황 (상위 5)</h2>
        <div className="space-y-4">
          {deptSummary.map((d, i) => (
            <div key={d.dept} className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 w-4">{i + 1}</span>
              <div className="w-20 text-sm font-semibold text-slate-800 shrink-0">{d.dept}</div>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">{d.headcount}명</span>
                  <span className="font-bold text-slate-700">{d.avgScore}점</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 rounded-full h-1.5"
                    style={{ width: `${d.avgScore}%` }}
                  />
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${gradeBadge(d.topGrade)}`}>
                최고 {d.topGrade}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 개인 종합 순위 */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-700">개인별 종합 평가 순위</h2>
        <span className="text-xs text-slate-400">업적 60% + 역량 30% + 조직문화 10%</span>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">순위</th>
            <th className="text-left text-sm font-semibold text-slate-600 px-4 py-3.5">이름</th>
            <th className="text-left text-sm font-semibold text-slate-600 px-4 py-3.5">부서</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">업적</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">역량</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">종합</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">등급</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((r, idx) => (
            <tr key={r.name} className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${idx === rankings.length - 1 ? 'border-none' : ''}`}>
              <td className="px-4 py-4 text-center text-sm font-bold text-slate-500">
                {rankMedal(r.rank)}
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">{r.name[0]}</div>
                  <span className="text-sm font-semibold text-slate-900">{r.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-slate-600">{r.dept}</td>
              <td className="px-4 py-4 text-center text-sm font-semibold text-slate-700">{r.achievement > 0 ? `${r.achievement}점` : '-'}</td>
              <td className="px-4 py-4 text-center text-sm font-semibold text-slate-700">{r.competency > 0 ? r.competency : '-'}</td>
              <td className="px-4 py-4 text-center text-sm font-bold text-slate-900">{r.total > 0 ? `${r.total}점` : '-'}</td>
              <td className="px-4 py-4 text-center">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${gradeBadge(r.grade)}`}>{r.grade}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
