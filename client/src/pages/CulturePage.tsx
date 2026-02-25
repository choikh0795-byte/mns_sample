import { Heart, TrendingUp, Users, CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';

const evalStats = [
  { label: '평가 대상 인원', value: '48명', sub: '전체 직원 기준', icon: <Users className="w-5 h-5" />, ibg: 'bg-blue-100', ic: 'text-blue-600' },
  { label: '자기평가 완료', value: '38명', sub: '완료율 79%', icon: <CheckCircle className="w-5 h-5" />, ibg: 'bg-emerald-100', ic: 'text-emerald-600' },
  { label: '1차평가 완료', value: '24명', sub: '완료율 50%', icon: <TrendingUp className="w-5 h-5" />, ibg: 'bg-violet-100', ic: 'text-violet-600' },
  { label: '2차평가 완료', value: '10명', sub: '완료율 21%', icon: <Heart className="w-5 h-5" />, ibg: 'bg-amber-100', ic: 'text-amber-600' },
];

const evalPeriod = [
  { step: '자기평가', period: '2026-01-06 ~ 2026-01-20', status: '완료', done: 38, total: 48 },
  { step: '1차평가 (조직장)', period: '2026-01-21 ~ 2026-02-07', status: '진행중', done: 24, total: 48 },
  { step: '2차평가 (최종)', period: '2026-02-10 ~ 2026-02-21', status: '진행중', done: 10, total: 48 },
];

const employeeStatus = [
  { name: '김민준', dept: '개발팀', selfEval: '완료', firstEval: '완료', secondEval: '완료', firstGrade: 'A', secondGrade: 'B' },
  { name: '이서연', dept: '마케팅팀', selfEval: '완료', firstEval: '완료', secondEval: '완료', firstGrade: 'S', secondGrade: 'A' },
  { name: '박지호', dept: '영업팀', selfEval: '완료', firstEval: '완료', secondEval: '진행중', firstGrade: 'B', secondGrade: '-' },
  { name: '최수아', dept: '인사팀', selfEval: '완료', firstEval: '완료', secondEval: '미시작', firstGrade: 'A', secondGrade: '-' },
  { name: '정우성', dept: '재무팀', selfEval: '완료', firstEval: '진행중', secondEval: '미시작', firstGrade: '-', secondGrade: '-' },
  { name: '한예진', dept: '디자인팀', selfEval: '완료', firstEval: '미시작', secondEval: '미시작', firstGrade: '-', secondGrade: '-' },
  { name: '오동현', dept: '개발팀', selfEval: '진행중', firstEval: '미시작', secondEval: '미시작', firstGrade: '-', secondGrade: '-' },
  { name: '윤소희', dept: '고객성공팀', selfEval: '미시작', firstEval: '미시작', secondEval: '미시작', firstGrade: '-', secondGrade: '-' },
];

const gradeDistribution = [
  { grade: 'S', count: 4, color: 'bg-violet-500', textColor: 'text-violet-700', bg: 'bg-violet-50' },
  { grade: 'A', count: 10, color: 'bg-blue-500', textColor: 'text-blue-700', bg: 'bg-blue-50' },
  { grade: 'B', count: 14, color: 'bg-emerald-500', textColor: 'text-emerald-700', bg: 'bg-emerald-50' },
  { grade: 'C', count: 6, color: 'bg-amber-400', textColor: 'text-amber-700', bg: 'bg-amber-50' },
  { grade: 'D', count: 4, color: 'bg-rose-400', textColor: 'text-rose-600', bg: 'bg-rose-50' },
];

const statusBadge = (s: string) => {
  if (s === '완료') return 'bg-emerald-100 text-emerald-700';
  if (s === '진행중') return 'bg-blue-100 text-blue-700';
  if (s === '미시작') return 'bg-gray-100 text-gray-500';
  return 'bg-gray-100 text-gray-400';
};

const gradeBadge = (g: string) => {
  if (g === 'S') return 'bg-violet-100 text-violet-700';
  if (g === 'A') return 'bg-blue-100 text-blue-700';
  if (g === 'B') return 'bg-emerald-100 text-emerald-700';
  if (g === 'C') return 'bg-amber-100 text-amber-700';
  if (g === 'D') return 'bg-rose-100 text-rose-600';
  return 'bg-slate-100 text-slate-400';
};

const stepStatusBadge = (s: string) => {
  if (s === '완료') return 'bg-emerald-100 text-emerald-700';
  if (s === '진행중') return 'bg-amber-100 text-amber-700';
  return 'bg-gray-100 text-gray-500';
};

const stepStatusIcon = (s: string) => {
  if (s === '완료') return <CheckCircle className="w-4 h-4 text-emerald-500" />;
  if (s === '진행중') return <Clock className="w-4 h-4 text-amber-500" />;
  return <AlertCircle className="w-4 h-4 text-slate-300" />;
};

export const CulturePage = () => (
  <div className="p-8">
    {/* 페이지 헤더 */}
    <div className="flex items-start justify-between mb-8">
      <div>
        <p className="text-xs text-slate-400 mb-1">조직문화개선</p>
        <h1 className="text-2xl font-bold text-slate-900">조직문화개선 평가 현황</h1>
        <p className="text-sm text-slate-500 mt-1">2026년 상반기 조직문화개선 평가 진행 현황을 확인하세요.</p>
      </div>
      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all">
          <TrendingUp className="w-4 h-4" /> 결과 리포트
        </button>
      </div>
    </div>

    {/* 지표 카드 */}
    <div className="grid grid-cols-4 gap-5 mb-8">
      {evalStats.map((s) => (
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

    {/* 평가 단계 진행 현황 */}
    <div className="grid grid-cols-5 gap-6 mb-8">
      {/* 평가 단계별 현황 */}
      <div className="col-span-3 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-slate-700">평가 단계별 진행 현황</h2>
          <span className="text-xs text-slate-400">2026 상반기</span>
        </div>
        <div className="space-y-5">
          {evalPeriod.map((e, i) => (
            <div key={e.step}>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="flex items-center gap-2 w-6 h-6 rounded-full bg-slate-100 justify-center shrink-0">
                  <span className="text-xs font-bold text-slate-600">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {stepStatusIcon(e.status)}
                      <span className="text-sm font-semibold text-slate-800">{e.step}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${stepStatusBadge(e.status)}`}>{e.status}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{e.done}/{e.total}명</span>
                  </div>
                  <p className="text-xs text-slate-400 ml-6 mb-2">{e.period}</p>
                  <div className="ml-6 w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className={`rounded-full h-1.5 ${Math.round(e.done / e.total * 100) >= 80 ? 'bg-emerald-500' : Math.round(e.done / e.total * 100) >= 50 ? 'bg-blue-500' : 'bg-amber-400'}`}
                      style={{ width: `${Math.round(e.done / e.total * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 등급 분포 */}
      <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-slate-700">1차평가 등급 분포</h2>
          <span className="text-xs text-slate-400">완료 기준 38명</span>
        </div>
        <div className="space-y-3">
          {gradeDistribution.map((g) => (
            <div key={g.grade} className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${g.bg} ${g.textColor} shrink-0`}>{g.grade}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-600">{g.grade}등급</span>
                  <span className="text-xs font-semibold text-slate-700">{g.count}명</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className={`${g.color} rounded-full h-1.5`} style={{ width: `${(g.count / 38) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">평균 점수</span>
            <span className="text-sm font-bold text-slate-900">76.8점</span>
          </div>
        </div>
      </div>
    </div>

    {/* 구성원별 평가 현황 테이블 */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-700">구성원별 평가 현황</h2>
        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700">
          전체 보기 <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="text-left text-sm font-semibold text-slate-600 px-6 py-3.5">이름</th>
            <th className="text-left text-sm font-semibold text-slate-600 px-4 py-3.5">부서</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">자기평가</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">1차평가</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">1차 등급</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">2차평가</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">2차 등급</th>
          </tr>
        </thead>
        <tbody>
          {employeeStatus.map((e, idx) => (
            <tr key={e.name} className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${idx === employeeStatus.length - 1 ? 'border-none' : ''}`}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                    {e.name[0]}
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{e.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-slate-600">{e.dept}</td>
              <td className="px-4 py-4 text-center">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge(e.selfEval)}`}>{e.selfEval}</span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge(e.firstEval)}`}>{e.firstEval}</span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${gradeBadge(e.firstGrade)}`}>{e.firstGrade}</span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge(e.secondEval)}`}>{e.secondEval}</span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${gradeBadge(e.secondGrade)}`}>{e.secondGrade}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
