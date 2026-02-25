import { Search, Filter, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const evaluations = [
  { name: '김민준', dept: '개발팀', role: '시니어 개발자', score: 92, grade: 'S', status: '완료', reviewer: '이서연', date: '2026-01-15' },
  { name: '박지호', dept: '영업팀', role: '영업 매니저', score: 85, grade: 'A', status: '완료', reviewer: '정우성', date: '2026-01-18' },
  { name: '최수아', dept: '디자인팀', role: '리드 디자이너', score: 78, grade: 'B', status: '진행중', reviewer: '한예진', date: '-' },
  { name: '정우성', dept: '고객성공팀', role: 'CS 매니저', score: 65, grade: 'C', status: '진행중', reviewer: '오동현', date: '-' },
  { name: '한예진', dept: '재무팀', role: '재무 분석가', score: 88, grade: 'A', status: '완료', reviewer: '김민준', date: '2026-01-20' },
  { name: '오동현', dept: '인사팀', role: 'HRD 담당자', score: 91, grade: 'S', status: '완료', reviewer: '윤소희', date: '2026-01-22' },
  { name: '윤소희', dept: '데이터팀', role: '데이터 분석가', score: 0, grade: '-', status: '미시작', reviewer: '-', date: '-' },
  { name: '이서연', dept: '마케팅팀', role: '마케팅 리드', score: 82, grade: 'B', status: '완료', reviewer: '박지호', date: '2026-01-17' },
];

const gradeBadge = (grade: string) => {
  const map: Record<string, string> = {
    'S': 'bg-violet-100 text-violet-700',
    'A': 'bg-emerald-100 text-emerald-700',
    'B': 'bg-blue-100 text-blue-700',
    'C': 'bg-amber-100 text-amber-700',
    '-': 'bg-gray-100 text-gray-400',
  };
  return map[grade] ?? 'bg-gray-100 text-gray-500';
};

const statusIcon = (status: string) => {
  if (status === '완료') return <CheckCircle className="w-4 h-4 text-emerald-500" />;
  if (status === '진행중') return <Clock className="w-4 h-4 text-amber-500" />;
  return <AlertCircle className="w-4 h-4 text-slate-400" />;
};

const statusClass = (status: string) => {
  if (status === '완료') return 'bg-emerald-100 text-emerald-700';
  if (status === '진행중') return 'bg-amber-100 text-amber-700';
  return 'bg-gray-100 text-gray-500';
};

export const IndividualEvalPage = () => (
  <div className="p-8">
    <div className="flex items-start justify-between mb-8">
      <div>
        <p className="text-xs text-slate-400 mb-1">개인별 업적평가</p>
        <h1 className="text-2xl font-bold text-slate-900">평가 현황</h1>
        <p className="text-sm text-slate-500 mt-1">2026년 1분기 개인별 업적평가 현황을 확인하세요.</p>
      </div>
      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all">
          <Filter className="w-4 h-4" /> 필터
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Download className="w-4 h-4" /> 내보내기
        </button>
      </div>
    </div>

    {/* 요약 배지 */}
    <div className="flex gap-4 mb-6">
      {[
        { label: '완료', count: 5, cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
        { label: '진행중', count: 2, cls: 'bg-amber-50 text-amber-700 border-amber-100' },
        { label: '미시작', count: 1, cls: 'bg-slate-50 text-slate-500 border-slate-100' },
      ].map((b) => (
        <div key={b.label} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${b.cls}`}>
          {b.label} <span className="text-lg font-bold">{b.count}</span>
        </div>
      ))}
    </div>

    {/* 검색 */}
    <div className="mb-6">
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="이름 또는 부서 검색..."
          className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>
    </div>

    {/* 테이블 */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left text-sm font-semibold text-slate-600 px-6 py-3.5">평가 대상</th>
            <th className="text-left text-sm font-semibold text-slate-600 px-4 py-3.5">부서</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">점수</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">등급</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">상태</th>
            <th className="text-left text-sm font-semibold text-slate-600 px-4 py-3.5">평가자</th>
            <th className="text-left text-sm font-semibold text-slate-600 px-4 py-3.5">완료일</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((e, idx) => (
            <tr
              key={e.name}
              className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${idx === evaluations.length - 1 ? 'border-none' : ''}`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-bold text-violet-700">
                    {e.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{e.name}</p>
                    <p className="text-xs text-slate-400">{e.role}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-slate-600">{e.dept}</td>
              <td className="px-4 py-4 text-center">
                {e.score > 0 ? (
                  <span className="text-sm font-bold text-slate-900">{e.score}점</span>
                ) : (
                  <span className="text-sm text-slate-400">-</span>
                )}
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${gradeBadge(e.grade)}`}>
                  {e.grade}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusClass(e.status)}`}>
                  {statusIcon(e.status)}
                  {e.status}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-slate-600">{e.reviewer}</td>
              <td className="px-4 py-4 text-sm text-slate-500">{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
