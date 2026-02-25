import { ClipboardList, Plus, Info, Save, ChevronRight } from 'lucide-react';

const evalItems = [
  {
    id: 1,
    area: '팀 간 소통 활성화',
    goal: '월 2회 이상 타부서 협업 미팅 정례화',
    keyResult: '협업 미팅 실행 횟수 12회 이상 달성',
    evalType: '정량',
  },
  {
    id: 2,
    area: '구성원 역량 강화',
    goal: '팀원 개인별 성장 계획(IDP) 수립 및 실행 지원',
    keyResult: '팀원 전원 IDP 수립 완료 및 분기별 리뷰 1회 이상',
    evalType: '정성',
  },
  {
    id: 3,
    area: '심리적 안전감 증진',
    goal: '팀 내 자유로운 의견 개진 문화 조성',
    keyResult: '팀 설문 결과 심리적 안전감 지수 4.0 이상 달성',
    evalType: '정량',
  },
];

const inputCls = "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
const selectCls = "w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none";

export const CultureEvalRegistrationPage = () => (
  <div className="p-8">
    {/* 페이지 헤더 */}
    <div className="flex items-start justify-between mb-8">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
          <span>조직문화개선</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 font-medium">자기평가 등록</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">조직문화개선 자기평가 등록</h1>
        <p className="text-sm text-slate-500 mt-1">개선 영역별 목표와 핵심결과물을 등록하세요.</p>
      </div>
      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all">
          임시 저장
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Save className="w-4 h-4" /> 등록 완료
        </button>
      </div>
    </div>

    {/* 평가 안내 배너 */}
    <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8">
      <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-blue-800 mb-1">자기평가 작성 안내</p>
        <p className="text-xs text-blue-600 leading-relaxed">
          개선 영역, 목표, 핵심결과물을 작성하고 평가 구분(정성/정량)을 선택하세요.
          항목은 최대 5개까지 추가할 수 있습니다. 등록 완료 후에는 조직장의 1차평가가 진행됩니다.
        </p>
      </div>
    </div>

    {/* 평가자 정보 */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 mb-6">
      <h2 className="text-sm font-semibold text-slate-700 mb-4">평가자 정보</h2>
      <div className="grid grid-cols-4 gap-6">
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1.5">이름</p>
          <p className="text-sm font-semibold text-slate-900">김민준</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1.5">부서</p>
          <p className="text-sm font-semibold text-slate-900">개발팀</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1.5">직급</p>
          <p className="text-sm font-semibold text-slate-900">과장</p>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1.5">평가 기간</p>
          <p className="text-sm font-semibold text-slate-900">2026-01-06 ~ 2026-01-20</p>
        </div>
      </div>
    </div>

    {/* 자기평가 항목 등록 */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-slate-700">자기평가 항목</h2>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{evalItems.length}개</span>
        </div>
        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
          <Plus className="w-3.5 h-3.5" /> 항목 추가
        </button>
      </div>

      {/* 테이블 헤더 */}
      <div className="grid grid-cols-12 gap-0 border-b border-slate-100 bg-slate-50/50 px-6 py-3">
        <div className="col-span-1 text-xs font-semibold text-slate-500">No.</div>
        <div className="col-span-3 text-xs font-semibold text-slate-500">개선 영역 <span className="text-rose-400">*</span></div>
        <div className="col-span-3 text-xs font-semibold text-slate-500">목표 <span className="text-rose-400">*</span></div>
        <div className="col-span-4 text-xs font-semibold text-slate-500">핵심결과물 <span className="text-rose-400">*</span></div>
        <div className="col-span-1 text-xs font-semibold text-slate-500">평가구분 <span className="text-rose-400">*</span></div>
      </div>

      {/* 항목 행 */}
      <div className="divide-y divide-slate-100">
        {evalItems.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-start hover:bg-slate-50/30 transition-colors">
            <div className="col-span-1 flex items-center h-full">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                {item.id}
              </span>
            </div>
            <div className="col-span-3">
              <input
                type="text"
                defaultValue={item.area}
                placeholder="개선이 필요한 영역을 입력하세요"
                className={inputCls}
              />
            </div>
            <div className="col-span-3">
              <input
                type="text"
                defaultValue={item.goal}
                placeholder="구체적인 목표를 입력하세요"
                className={inputCls}
              />
            </div>
            <div className="col-span-4">
              <input
                type="text"
                defaultValue={item.keyResult}
                placeholder="측정 가능한 핵심결과물을 입력하세요"
                className={inputCls}
              />
            </div>
            <div className="col-span-1">
              <div className="relative">
                <select defaultValue={item.evalType} className={selectCls}>
                  <option value="정성">정성</option>
                  <option value="정량">정량</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 항목 추가 안내 */}
      <div className="px-6 py-4 border-t border-slate-100">
        <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 transition-all">
          <Plus className="w-4 h-4" />
          <span>항목 추가 (최대 5개)</span>
        </button>
      </div>
    </div>

    {/* 평가 구분 설명 */}
    <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6">
      <h2 className="text-sm font-semibold text-slate-700 mb-4">평가 구분 안내</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full">정성</span>
            <span className="text-sm font-semibold text-slate-800">정성적 평가</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">수치로 측정하기 어려운 질적 목표에 사용합니다. 조직문화, 협업 태도, 리더십 등 행동 변화 위주의 목표에 적합합니다.</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">정량</span>
            <span className="text-sm font-semibold text-slate-800">정량적 평가</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">수치나 횟수로 측정 가능한 목표에 사용합니다. 참여율, 완료율, 횟수, 점수 등 명확한 기준이 있는 목표에 적합합니다.</p>
        </div>
      </div>
    </div>
  </div>
);
