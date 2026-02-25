import { ChevronRight, ChevronDown, Users, CheckCircle, Clock } from 'lucide-react';

const gradeToScore: Record<string, number> = {
  S: 100,
  A: 80,
  B: 60,
  C: 40,
  D: 20,
};

const employees = [
  {
    id: 1,
    name: '이서연',
    dept: '마케팅팀',
    position: '대리',
    avatarBg: 'bg-violet-100',
    avatarText: 'text-violet-700',
    selfEvalDate: '2026-01-15',
    items: [
      { area: '고객 소통 강화', goal: '고객 피드백 수집 체계 구축', keyResult: '월별 NPS 조사 실시 및 개선안 3건 이상 도출', evalType: '정량', grade: 'S', score: 100 },
      { area: '마케팅 콘텐츠 개선', goal: '브랜드 일관성 높은 콘텐츠 제작', keyResult: '콘텐츠 품질 평가 점수 4.2점 이상 유지', evalType: '정성', grade: 'A', score: 80 },
      { area: '팀 협업 문화', goal: '주간 정기 팀 리뷰 정례화', keyResult: '주간 미팅 실시율 90% 이상 달성', evalType: '정량', grade: 'A', score: 80 },
    ],
  },
  {
    id: 2,
    name: '박지호',
    dept: '영업팀',
    position: '과장',
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-700',
    selfEvalDate: '2026-01-14',
    items: [
      { area: '고객 관계 관리', goal: '주요 고객 정기 방문 및 만족도 관리', keyResult: '고객 만족도 설문 4.0점 이상 달성', evalType: '정성', grade: 'B', score: 60 },
      { area: '영업 프로세스 개선', goal: '제안서 품질 향상 및 표준화', keyResult: '제안서 표준 템플릿 3종 완성 및 적용', evalType: '정량', grade: '', score: 0 },
    ],
  },
  {
    id: 3,
    name: '최수아',
    dept: '인사팀',
    position: '차장',
    avatarBg: 'bg-rose-100',
    avatarText: 'text-rose-600',
    selfEvalDate: '2026-01-13',
    items: [
      { area: '온보딩 프로세스 개선', goal: '신입 적응 기간 단축 및 만족도 향상', keyResult: '온보딩 만족도 4.3점 이상, 적응 기간 30일 내 완료', evalType: '정성', grade: 'A', score: 80 },
      { area: '평가 제도 개선', goal: '공정하고 투명한 평가 문화 조성', keyResult: '평가 이의 신청 건수 전년 대비 50% 감소', evalType: '정량', grade: 'S', score: 100 },
      { area: '직원 복지 강화', goal: '구성원 복리후생 만족도 개선', keyResult: '복지 만족도 설문 4.0점 이상 달성', evalType: '정성', grade: 'B', score: 60 },
    ],
  },
  {
    id: 4,
    name: '정우성',
    dept: '재무팀',
    position: '과장',
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-700',
    selfEvalDate: '2026-01-16',
    items: [
      { area: '예산 관리 투명성', goal: '부서별 예산 집행 현황 실시간 공유', keyResult: '월별 예산 리포트 제공 및 접근성 향상', evalType: '정량', grade: '', score: 0 },
      { area: '재무 프로세스 디지털화', goal: '수기 보고 업무 자동화', keyResult: '자동화 업무 비율 60% 이상 달성', evalType: '정량', grade: '', score: 0 },
    ],
  },
];

const gradeBadge = (g: string) => {
  if (g === 'S') return 'bg-violet-100 text-violet-700';
  if (g === 'A') return 'bg-blue-100 text-blue-700';
  if (g === 'B') return 'bg-emerald-100 text-emerald-700';
  if (g === 'C') return 'bg-amber-100 text-amber-700';
  if (g === 'D') return 'bg-rose-100 text-rose-600';
  return 'bg-slate-100 text-slate-400';
};

const evalTypeBadge = (t: string) => {
  if (t === '정량') return 'bg-blue-50 text-blue-600';
  return 'bg-violet-50 text-violet-600';
};

const getEvalStatus = (items: typeof employees[0]['items']) => {
  const total = items.length;
  const done = items.filter((i) => i.grade !== '').length;
  if (done === 0) return '미시작';
  if (done === total) return '완료';
  return '진행중';
};

const statusBadge = (s: string) => {
  if (s === '완료') return 'bg-emerald-100 text-emerald-700';
  if (s === '진행중') return 'bg-amber-100 text-amber-700';
  return 'bg-gray-100 text-gray-500';
};

const selectCls = "w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none text-center";

// Show first 2 employees expanded, rest collapsed for UI demo
const expandedIds = [1, 3];

export const CultureFirstEvalPage = () => (
  <div className="p-8">
    {/* 페이지 헤더 */}
    <div className="flex items-start justify-between mb-8">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
          <span>조직문화개선</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">1차평가</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">조직문화개선 1차평가</h1>
        <p className="text-sm text-slate-500 mt-1">구성원별 자기평가 내역을 확인하고 등급을 부여하세요.</p>
      </div>
      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <CheckCircle className="w-4 h-4" /> 전체 저장
        </button>
      </div>
    </div>

    {/* 평가 현황 요약 */}
    <div className="grid grid-cols-3 gap-5 mb-8">
      {[
        { label: '1차평가 대상', value: `${employees.length}명`, sub: '자기평가 완료 기준', icon: <Users className="w-5 h-5" />, ibg: 'bg-blue-100', ic: 'text-blue-600' },
        { label: '평가 완료', value: `${employees.filter(e => getEvalStatus(e.items) === '완료').length}명`, sub: '전체 항목 등급 부여 완료', icon: <CheckCircle className="w-5 h-5" />, ibg: 'bg-emerald-100', ic: 'text-emerald-600' },
        { label: '평가 진행중', value: `${employees.filter(e => getEvalStatus(e.items) === '진행중' || getEvalStatus(e.items) === '미시작').length}명`, sub: '등급 미부여 항목 존재', icon: <Clock className="w-5 h-5" />, ibg: 'bg-amber-100', ic: 'text-amber-600' },
      ].map((s) => (
        <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm font-medium text-slate-500">{s.label}</p>
            <div className={`w-9 h-9 ${s.ibg} rounded-xl flex items-center justify-center ${s.ic}`}>{s.icon}</div>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-1">{s.value}</p>
          <p className="text-xs text-slate-400">{s.sub}</p>
        </div>
      ))}
    </div>

    {/* 등급 기준 안내 */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm font-semibold text-slate-700">등급별 점수 기준</h2>
      </div>
      <div className="flex items-center gap-3">
        {[
          { grade: 'S', score: 100, color: 'bg-violet-100 text-violet-700' },
          { grade: 'A', score: 80, color: 'bg-blue-100 text-blue-700' },
          { grade: 'B', score: 60, color: 'bg-emerald-100 text-emerald-700' },
          { grade: 'C', score: 40, color: 'bg-amber-100 text-amber-700' },
          { grade: 'D', score: 20, color: 'bg-rose-100 text-rose-600' },
        ].map((g) => (
          <div key={g.grade} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${g.color}`}>{g.grade}</span>
            <span className="text-xs font-semibold text-slate-700">{g.score}점</span>
          </div>
        ))}
        <p className="ml-auto text-xs text-slate-400">등급 선택 시 점수가 자동 입력됩니다.</p>
      </div>
    </div>

    {/* 구성원별 평가 패널 */}
    <div className="space-y-4">
      {employees.map((emp) => {
        const status = getEvalStatus(emp.items);
        const totalScore = emp.items.filter(i => i.grade !== '').reduce((sum, i) => sum + i.score, 0);
        const avgScore = emp.items.filter(i => i.grade !== '').length > 0
          ? Math.round(totalScore / emp.items.filter(i => i.grade !== '').length)
          : 0;
        const isExpanded = expandedIds.includes(emp.id);

        return (
          <div key={emp.id} className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* 직원 헤더 */}
            <div className={`flex items-center justify-between px-6 py-4 ${isExpanded ? 'border-b border-slate-100' : ''} cursor-pointer hover:bg-slate-50/50 transition-colors`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${emp.avatarBg} flex items-center justify-center text-sm font-bold ${emp.avatarText} shrink-0`}>
                  {emp.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{emp.name}</span>
                    <span className="text-xs text-slate-500">{emp.dept} · {emp.position}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">자기평가 등록일 {emp.selfEvalDate} · 항목 {emp.items.length}개</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-slate-400 mb-0.5">1차평가 평균</p>
                  <p className="text-sm font-bold text-slate-900">{avgScore > 0 ? `${avgScore}점` : '-'}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge(status)}`}>{status}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* 평가 항목 테이블 */}
            {isExpanded && (
              <div>
                {/* 컬럼 헤더 */}
                <div className="grid grid-cols-12 gap-0 bg-slate-50/50 px-6 py-3 border-b border-slate-100">
                  <div className="col-span-1 text-xs font-semibold text-slate-500">No.</div>
                  <div className="col-span-2 text-xs font-semibold text-slate-500">개선 영역</div>
                  <div className="col-span-3 text-xs font-semibold text-slate-500">목표</div>
                  <div className="col-span-3 text-xs font-semibold text-slate-500">핵심결과물</div>
                  <div className="col-span-1 text-xs font-semibold text-slate-500 text-center">평가구분</div>
                  <div className="col-span-1 text-xs font-semibold text-slate-500 text-center">1차 등급</div>
                  <div className="col-span-1 text-xs font-semibold text-slate-500 text-center">1차 점수</div>
                </div>

                {/* 항목 행 */}
                {emp.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/30 transition-colors ${idx < emp.items.length - 1 ? 'border-b border-slate-100' : ''}`}
                  >
                    <div className="col-span-1">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-slate-800">{item.area}</p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm text-slate-600 leading-relaxed">{item.goal}</p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm text-slate-500 leading-relaxed">{item.keyResult}</p>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${evalTypeBadge(item.evalType)}`}>{item.evalType}</span>
                    </div>
                    <div className="col-span-1">
                      <div className="relative">
                        <select
                          defaultValue={item.grade}
                          className={selectCls}
                        >
                          <option value="">선택</option>
                          {Object.keys(gradeToScore).map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                          <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 text-center">
                      {item.grade ? (
                        <div className="flex flex-col items-center gap-0.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${gradeBadge(item.grade)}`}>{item.grade}</span>
                          <span className="text-xs font-semibold text-slate-700">{item.score}점</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300 font-medium">-</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* 하단 요약 */}
                <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50/70 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    평가 완료: {emp.items.filter(i => i.grade !== '').length}/{emp.items.length}개
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">
                      1차평가 평균 점수:
                      <span className="ml-1.5 font-bold text-slate-800">{avgScore > 0 ? `${avgScore}점` : '미완료'}</span>
                    </span>
                    <button className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-all">
                      저장
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);
