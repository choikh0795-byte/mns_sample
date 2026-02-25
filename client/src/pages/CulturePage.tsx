import { Heart, MessageSquare, TrendingUp, Users, Download, Plus } from 'lucide-react';

const surveys = [
  { title: '2026 Q1 조직문화 진단', period: '2026-01-02 ~ 2026-01-16', participants: 287, total: 312, rate: 92, status: '완료' },
  { title: '심리적 안전감 조사', period: '2025-12-01 ~ 2025-12-15', participants: 298, total: 312, rate: 96, status: '완료' },
  { title: '리더십 360도 피드백', period: '2026-02-01 ~ 2026-02-28', participants: 120, total: 312, rate: 38, status: '진행중' },
  { title: '워라밸 만족도 조사', period: '2025-10-01 ~ 2025-10-15', participants: 305, total: 312, rate: 98, status: '완료' },
];

const issues = [
  { category: '소통', title: '부서 간 정보 공유 부족', priority: '높음', assignee: '오동현', dueDate: '2026-02-28', status: '진행중' },
  { category: '성장', title: '교육/훈련 기회 확대 요청', priority: '중간', assignee: '한예진', dueDate: '2026-03-15', status: '계획중' },
  { category: '환경', title: '원격근무 정책 개선', priority: '높음', assignee: '김민준', dueDate: '2026-02-15', status: '완료' },
  { category: '관계', title: '팀빌딩 행사 정례화', priority: '낮음', assignee: '이서연', dueDate: '2026-04-01', status: '계획중' },
];

const metrics = [
  { label: '조직 만족도', value: 4.1, max: 5, change: '+0.3' },
  { label: '심리적 안전감', value: 3.8, max: 5, change: '+0.5' },
  { label: '리더십 신뢰도', value: 4.2, max: 5, change: '+0.1' },
  { label: '성장 기회 인식', value: 3.6, max: 5, change: '+0.4' },
];

const priorityBadge = (p: string) => {
  if (p === '높음') return 'bg-rose-100 text-rose-600';
  if (p === '중간') return 'bg-amber-100 text-amber-700';
  return 'bg-slate-100 text-slate-500';
};

const statusBadge = (s: string) => {
  if (s === '완료') return 'bg-emerald-100 text-emerald-700';
  if (s === '진행중') return 'bg-blue-100 text-blue-700';
  return 'bg-gray-100 text-gray-500';
};

export const CulturePage = () => (
  <div className="p-8">
    <div className="flex items-start justify-between mb-8">
      <div>
        <p className="text-xs text-slate-400 mb-1">조직문화개선</p>
        <h1 className="text-2xl font-bold text-slate-900">조직문화 현황</h1>
        <p className="text-sm text-slate-500 mt-1">구성원 설문 결과 및 개선 액션 플랜을 관리하세요.</p>
      </div>
      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all">
          <Download className="w-4 h-4" /> 내보내기
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Plus className="w-4 h-4" /> 설문 생성
        </button>
      </div>
    </div>

    {/* 지표 카드 */}
    <div className="grid grid-cols-4 gap-5 mb-8">
      {[
        { label: '설문 참여율', value: '92%', sub: '이번 분기', icon: <Users className="w-5 h-5" />, ibg: 'bg-blue-100', ic: 'text-blue-600' },
        { label: '개선 과제', value: '12건', sub: '진행 중', icon: <MessageSquare className="w-5 h-5" />, ibg: 'bg-violet-100', ic: 'text-violet-600' },
        { label: '조직 만족도', value: '4.1 / 5', sub: '전분기 대비 +0.3', icon: <Heart className="w-5 h-5" />, ibg: 'bg-rose-100', ic: 'text-rose-500' },
        { label: '개선 완료율', value: '67%', sub: '액션 플랜 기준', icon: <TrendingUp className="w-5 h-5" />, ibg: 'bg-emerald-100', ic: 'text-emerald-600' },
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

    <div className="grid grid-cols-5 gap-6 mb-8">
      {/* 핵심 지표 */}
      <div className="col-span-2 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">조직문화 핵심 지표</h2>
        <div className="space-y-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-slate-700">{m.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">{m.value}</span>
                  <span className="text-xs font-semibold text-emerald-600">{m.change}</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-blue-500 rounded-full h-1.5"
                  style={{ width: `${(m.value / m.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 설문 목록 */}
      <div className="col-span-3 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">설문 현황</h2>
        <div className="space-y-3">
          {surveys.map((s) => (
            <div key={s.title} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-slate-900">{s.title}</p>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge(s.status)}`}>{s.status}</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">{s.period}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                  <div className="bg-blue-500 rounded-full h-1.5" style={{ width: `${s.rate}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-600">{s.participants}/{s.total}명 ({s.rate}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 개선 액션 플랜 */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-700">개선 액션 플랜</h2>
        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700">
          <Plus className="w-3.5 h-3.5" /> 과제 추가
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left text-sm font-semibold text-slate-600 px-6 py-3.5">과제명</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">카테고리</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">우선순위</th>
            <th className="text-left text-sm font-semibold text-slate-600 px-4 py-3.5">담당자</th>
            <th className="text-left text-sm font-semibold text-slate-600 px-4 py-3.5">마감일</th>
            <th className="text-center text-sm font-semibold text-slate-600 px-4 py-3.5">상태</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((i, idx) => (
            <tr key={i.title} className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${idx === issues.length - 1 ? 'border-none' : ''}`}>
              <td className="px-6 py-4 text-sm font-medium text-slate-900">{i.title}</td>
              <td className="px-4 py-4 text-center">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">{i.category}</span>
              </td>
              <td className="px-4 py-4 text-center">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${priorityBadge(i.priority)}`}>{i.priority}</span>
              </td>
              <td className="px-4 py-4 text-sm text-slate-700">{i.assignee}</td>
              <td className="px-4 py-4 text-sm text-slate-500">{i.dueDate}</td>
              <td className="px-4 py-4 text-center">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge(i.status)}`}>{i.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
