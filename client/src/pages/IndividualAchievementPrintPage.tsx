import { useState } from 'react';
import { Search, Printer, User } from 'lucide-react';

interface EvalGoal {
  orgGoal: string;
  goal: string;
  reason: string;
  keyResult: string;
  achievement: string;
  evalType: string;
  weight: number;
  achieveRate: number;
  selfScore: number;
  firstEvalScore: number;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  dept: string;
  goals: EvalGoal[];
}

const departments = ['구매팀', '경영지원팀', '생산팀', 'SCM팀', '환경안전팀'];

const allEmployees: Employee[] = [
  // 구매팀
  {
    id: 'e01',
    name: '김민준',
    position: '과장',
    dept: '구매팀',
    goals: [
      {
        orgGoal: '원가 경쟁력 확보',
        goal: '주요 원자재 단가 협상을 통한 구매원가 절감',
        reason: '원자재 가격 상승에 대응하기 위한 공급업체 다원화 및 단가 협상 체계 구축 필요',
        keyResult: '연간 구매원가 5% 이상 절감 및 신규 공급업체 3개사 이상 발굴',
        achievement: '협상을 통해 구매원가 6.2% 절감 달성, 신규 공급업체 4개사 계약 완료',
        evalType: '정량',
        weight: 40,
        achieveRate: 110,
        selfScore: 92,
        firstEvalScore: 88,
      },
      {
        orgGoal: '공급망 안정화',
        goal: '주요 부품 안전재고 기준 수립 및 재고 관리 체계화',
        reason: '글로벌 공급망 불안정으로 인한 생산 차질 최소화를 위한 선제적 재고 관리 필요',
        keyResult: '안전재고 기준 수립 완료 및 재고 회전율 20% 개선',
        achievement: '안전재고 기준 수립 완료, 재고 회전율 18% 개선으로 목표 근접 달성',
        evalType: '정량',
        weight: 35,
        achieveRate: 90,
        selfScore: 82,
        firstEvalScore: 80,
      },
      {
        orgGoal: '구매 프로세스 혁신',
        goal: '전자 구매 시스템 도입 및 구매 프로세스 디지털화',
        reason: '수작업 위주의 구매 업무를 디지털화하여 처리 속도 향상 및 오류 감소',
        keyResult: '전자 구매 시스템 도입 완료, 구매 처리 시간 30% 단축',
        achievement: '시스템 도입 완료, 처리 시간 25% 단축 달성',
        evalType: '정성',
        weight: 25,
        achieveRate: 83,
        selfScore: 78,
        firstEvalScore: 75,
      },
    ],
  },
  {
    id: 'e02',
    name: '이서연',
    position: '대리',
    dept: '구매팀',
    goals: [
      {
        orgGoal: '원가 경쟁력 확보',
        goal: '소모품 및 MRO 구매 효율화',
        reason: '다수 부서에서 개별 구매하던 소모품을 통합 구매하여 비용 절감 및 관리 효율화',
        keyResult: '통합 구매 전환율 80% 이상, 소모품 구매비용 10% 절감',
        achievement: '통합 구매 전환율 85% 달성, 구매비용 12% 절감',
        evalType: '정량',
        weight: 50,
        achieveRate: 115,
        selfScore: 95,
        firstEvalScore: 90,
      },
      {
        orgGoal: '공급업체 관리 강화',
        goal: '공급업체 평가 체계 수립 및 운영',
        reason: '공급업체 품질 및 납기 준수율 향상을 위한 체계적인 평가 및 관리 시스템 필요',
        keyResult: '공급업체 평가 기준 수립 및 반기 평가 2회 실시',
        achievement: '평가 기준 수립 및 1차 평가 완료, 2차 평가 진행 중',
        evalType: '정성',
        weight: 50,
        achieveRate: 85,
        selfScore: 80,
        firstEvalScore: 78,
      },
    ],
  },

  // 경영지원팀
  {
    id: 'e03',
    name: '박지호',
    position: '차장',
    dept: '경영지원팀',
    goals: [
      {
        orgGoal: '경영 효율화',
        goal: '경영 성과 지표(KPI) 체계 고도화 및 대시보드 구축',
        reason: '임원진의 경영 의사결정 지원을 위한 실시간 성과 모니터링 시스템 필요',
        keyResult: '전사 KPI 대시보드 구축 완료, 경영진 보고 체계 개선',
        achievement: '대시보드 구축 완료 및 월간 경영 보고 체계 정립',
        evalType: '정성',
        weight: 45,
        achieveRate: 100,
        selfScore: 88,
        firstEvalScore: 85,
      },
      {
        orgGoal: '비용 최적화',
        goal: '판관비 예산 절감 및 예산 집행 관리 강화',
        reason: '부서별 예산 집행 실적 모니터링 강화를 통한 불필요한 지출 감소',
        keyResult: '판관비 예산 대비 5% 이내 집행, 부서별 월간 예산 리포트 발행',
        achievement: '판관비 예산 대비 3.8% 초과 집행, 리포트 체계 정립 완료',
        evalType: '정량',
        weight: 35,
        achieveRate: 92,
        selfScore: 82,
        firstEvalScore: 80,
      },
      {
        orgGoal: '조직 문화 개선',
        goal: '전사 소통 활성화 및 조직 문화 프로그램 운영',
        reason: '구성원 만족도 향상 및 조직 몰입도 증대를 위한 체계적인 문화 프로그램 필요',
        keyResult: '분기별 전사 소통 행사 4회 이상, 조직 만족도 설문 점수 3.8점 이상',
        achievement: '행사 4회 완료, 조직 만족도 4.1점 달성',
        evalType: '정성',
        weight: 20,
        achieveRate: 105,
        selfScore: 90,
        firstEvalScore: 88,
      },
    ],
  },
  {
    id: 'e04',
    name: '최수아',
    position: '사원',
    dept: '경영지원팀',
    goals: [
      {
        orgGoal: '행정 효율화',
        goal: '총무 업무 프로세스 표준화 및 문서화',
        reason: '담당자 변경 시에도 업무 연속성 확보를 위한 표준 매뉴얼 작성',
        keyResult: '주요 총무 업무 매뉴얼 100% 작성 완료',
        achievement: '주요 업무 매뉴얼 95% 작성 완료, 잔여 작업 진행 중',
        evalType: '정성',
        weight: 60,
        achieveRate: 95,
        selfScore: 85,
        firstEvalScore: 82,
      },
      {
        orgGoal: '구성원 지원 강화',
        goal: '복리후생 제도 개선 및 활용률 향상',
        reason: '미활용 복리후생 항목을 발굴하고 구성원 인지도를 높여 실질적 활용 증대',
        keyResult: '복리후생 활용률 전년 대비 20% 향상',
        achievement: '캠페인을 통한 활용률 18% 향상',
        evalType: '정량',
        weight: 40,
        achieveRate: 90,
        selfScore: 80,
        firstEvalScore: 78,
      },
    ],
  },

  // 생산팀
  {
    id: 'e05',
    name: '정우성',
    position: '팀장',
    dept: '생산팀',
    goals: [
      {
        orgGoal: '생산 효율 향상',
        goal: '생산 라인 OEE(설비종합효율) 개선',
        reason: '설비 가동률 및 품질률 향상을 통한 생산 원가 경쟁력 확보',
        keyResult: 'OEE 75% 이상 달성 (현재 68%)',
        achievement: 'OEE 77% 달성으로 목표 초과 달성',
        evalType: '정량',
        weight: 40,
        achieveRate: 112,
        selfScore: 93,
        firstEvalScore: 90,
      },
      {
        orgGoal: '품질 경쟁력 강화',
        goal: '불량률 개선 및 품질 관리 체계 고도화',
        reason: '고객 클레임 감소 및 품질 비용 절감을 위한 공정 내 품질 관리 강화',
        keyResult: '불량률 1.5% 이하 유지, 고객 클레임 전년 대비 30% 감소',
        achievement: '불량률 1.2% 달성, 고객 클레임 35% 감소',
        evalType: '정량',
        weight: 35,
        achieveRate: 115,
        selfScore: 95,
        firstEvalScore: 92,
      },
      {
        orgGoal: '안전 경영',
        goal: '안전 사고 Zero화 및 안전 문화 정착',
        reason: '산업재해 예방 및 안전한 작업 환경 조성을 통한 구성원 보호',
        keyResult: '연간 산업재해 0건, 안전 교육 이수율 100%',
        achievement: '산업재해 0건 달성, 안전 교육 이수율 100%',
        evalType: '공통',
        weight: 25,
        achieveRate: 100,
        selfScore: 90,
        firstEvalScore: 90,
      },
    ],
  },
  {
    id: 'e06',
    name: '한예진',
    position: '주임',
    dept: '생산팀',
    goals: [
      {
        orgGoal: '생산 효율 향상',
        goal: '생산 공정 표준화 및 작업지도서 정비',
        reason: '작업자 숙련도 편차로 인한 품질 불균일 해소 및 신규 작업자 교육 효율화',
        keyResult: '전 공정 작업지도서 100% 정비, 작업 표준화율 90% 달성',
        achievement: '작업지도서 98% 정비 완료, 표준화율 92% 달성',
        evalType: '정성',
        weight: 55,
        achieveRate: 100,
        selfScore: 88,
        firstEvalScore: 85,
      },
      {
        orgGoal: '원가 절감',
        goal: '생산 현장 낭비 요소 발굴 및 개선 활동',
        reason: '5S 활동 및 개선 제안 제도를 통한 현장 낭비 요소 발굴 및 지속적 개선',
        keyResult: '개선 제안 연 20건 이상, 채택된 개선안 원가 절감 효과 500만원 이상',
        achievement: '개선 제안 23건, 원가 절감 효과 650만원 달성',
        evalType: '정량',
        weight: 45,
        achieveRate: 118,
        selfScore: 92,
        firstEvalScore: 88,
      },
    ],
  },

  // SCM팀
  {
    id: 'e07',
    name: '오동현',
    position: '과장',
    dept: 'SCM팀',
    goals: [
      {
        orgGoal: '공급망 가시성 향상',
        goal: 'SCM 시스템 고도화 및 실시간 재고 현황 관리',
        reason: '전사 재고 현황의 실시간 파악 및 공급망 리스크 조기 경보 체계 구축',
        keyResult: 'SCM 시스템 고도화 완료, 재고 정확도 98% 이상 달성',
        achievement: '시스템 고도화 완료, 재고 정확도 99.1% 달성',
        evalType: '정량',
        weight: 45,
        achieveRate: 108,
        selfScore: 91,
        firstEvalScore: 88,
      },
      {
        orgGoal: '납기 준수율 향상',
        goal: '고객 주문 납기 준수율 개선',
        reason: '고객 만족도 향상 및 신규 수주 경쟁력 강화를 위한 납기 준수 체계 개선',
        keyResult: '납기 준수율 97% 이상 달성',
        achievement: '납기 준수율 97.8% 달성',
        evalType: '정량',
        weight: 35,
        achieveRate: 102,
        selfScore: 88,
        firstEvalScore: 85,
      },
      {
        orgGoal: '물류비 최적화',
        goal: '물류비 절감 및 배송 경로 최적화',
        reason: '운송 비용 증가에 대응하여 배송 경로 최적화 및 공동 물류 체계 도입',
        keyResult: '물류비 전년 대비 8% 절감',
        achievement: '물류비 7.2% 절감 달성',
        evalType: '정량',
        weight: 20,
        achieveRate: 90,
        selfScore: 82,
        firstEvalScore: 80,
      },
    ],
  },
  {
    id: 'e08',
    name: '윤소희',
    position: '대리',
    dept: 'SCM팀',
    goals: [
      {
        orgGoal: '공급망 가시성 향상',
        goal: '협력사 포털 운영 및 협력사 데이터 품질 향상',
        reason: '협력사 납기 및 품질 정보의 실시간 공유를 통한 공급망 투명성 확보',
        keyResult: '협력사 포털 활용률 90% 이상, 데이터 정확도 95% 이상',
        achievement: '포털 활용률 93%, 데이터 정확도 96% 달성',
        evalType: '정성',
        weight: 50,
        achieveRate: 104,
        selfScore: 87,
        firstEvalScore: 85,
      },
      {
        orgGoal: '재고 최적화',
        goal: '과잉재고 해소 및 적정 재고 기준 수립',
        reason: '사장 재고 및 과잉 재고 감소를 통한 운전자본 효율화',
        keyResult: '과잉재고 비율 5% 이하, 재고 회전일수 10일 단축',
        achievement: '과잉재고 비율 4.5%, 재고 회전일수 8일 단축',
        evalType: '정량',
        weight: 50,
        achieveRate: 108,
        selfScore: 90,
        firstEvalScore: 87,
      },
    ],
  },

  // 환경안전팀
  {
    id: 'e09',
    name: '김철수',
    position: '차장',
    dept: '환경안전팀',
    goals: [
      {
        orgGoal: '안전 경영 강화',
        goal: '안전 보건 경영 시스템(ISO 45001) 유지 및 고도화',
        reason: '국제 표준 기반의 안전 경영 체계를 통한 산업재해 예방 및 법적 리스크 최소화',
        keyResult: 'ISO 45001 인증 유지, 안전 지적 사항 Zero 달성',
        achievement: 'ISO 45001 갱신 심사 통과, 안전 지적 사항 0건 유지',
        evalType: '공통',
        weight: 40,
        achieveRate: 100,
        selfScore: 90,
        firstEvalScore: 90,
      },
      {
        orgGoal: '환경 규제 대응',
        goal: '환경 법규 준수 및 온실가스 배출량 감축',
        reason: '환경 규제 강화에 선제적으로 대응하여 기업 리스크 최소화 및 ESG 경영 실현',
        keyResult: '환경 법규 위반 0건, 온실가스 배출량 전년 대비 5% 감축',
        achievement: '환경 법규 위반 0건, 온실가스 4.8% 감축 달성',
        evalType: '정량',
        weight: 35,
        achieveRate: 96,
        selfScore: 85,
        firstEvalScore: 83,
      },
      {
        orgGoal: '안전 문화 정착',
        goal: '전 임직원 안전 의식 향상 교육 프로그램 운영',
        reason: '근로자의 자발적 안전 행동 유도를 위한 안전 문화 내재화 프로그램 체계 구축',
        keyResult: '안전 교육 이수율 100%, 안전 제안 건수 전년 대비 30% 증가',
        achievement: '이수율 100%, 안전 제안 38% 증가 달성',
        evalType: '정성',
        weight: 25,
        achieveRate: 110,
        selfScore: 92,
        firstEvalScore: 90,
      },
    ],
  },
  {
    id: 'e10',
    name: '이영희',
    position: '주임',
    dept: '환경안전팀',
    goals: [
      {
        orgGoal: '환경 규제 대응',
        goal: '유해화학물질 관리 체계 구축 및 법규 준수',
        reason: '화학물질관리법 강화에 따른 체계적인 유해화학물질 보관·취급 관리 시스템 필요',
        keyResult: '유해화학물질 관리 대장 100% 정비, 법규 위반 0건',
        achievement: '관리 대장 100% 정비 완료, 법규 위반 0건 유지',
        evalType: '공통',
        weight: 55,
        achieveRate: 100,
        selfScore: 88,
        firstEvalScore: 87,
      },
      {
        orgGoal: '안전 경영 강화',
        goal: '작업장 위험성 평가 실시 및 개선 조치',
        reason: '잠재적 위험 요인을 사전 발굴하여 사고 예방 및 안전한 작업 환경 조성',
        keyResult: '전 공정 위험성 평가 완료, 개선 조치 이행률 90% 이상',
        achievement: '위험성 평가 100% 완료, 개선 조치 이행률 95%',
        evalType: '정성',
        weight: 45,
        achieveRate: 106,
        selfScore: 90,
        firstEvalScore: 88,
      },
    ],
  },
];

const getAchieveRateColor = (rate: number) => {
  if (rate >= 100) return 'text-emerald-600';
  if (rate >= 80) return 'text-blue-600';
  return 'text-amber-600';
};

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-emerald-600 font-semibold';
  if (score >= 80) return 'text-blue-600 font-semibold';
  return 'text-amber-600 font-semibold';
};

export const IndividualAchievementPrintPage = () => {
  const [selectedDept, setSelectedDept] = useState('구매팀');
  const [selectedEmpId, setSelectedEmpId] = useState('e01');

  const deptEmployees = allEmployees.filter((e) => e.dept === selectedDept);
  const selectedEmployee = allEmployees.find((e) => e.id === selectedEmpId) ?? deptEmployees[0];

  const handleDeptChange = (dept: string) => {
    setSelectedDept(dept);
    const firstEmp = allEmployees.find((e) => e.dept === dept);
    if (firstEmp) setSelectedEmpId(firstEmp.id);
  };

  const totalWeight = selectedEmployee?.goals.reduce((s, g) => s + g.weight, 0) ?? 0;
  const weightedSelfScore = selectedEmployee
    ? selectedEmployee.goals.reduce((s, g) => s + (g.selfScore * g.weight) / 100, 0)
    : 0;
  const weightedFirstScore = selectedEmployee
    ? selectedEmployee.goals.reduce((s, g) => s + (g.firstEvalScore * g.weight) / 100, 0)
    : 0;

  return (
    <div className="p-8">
      {/* 페이지 헤더 */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs text-slate-400 mb-1">개인별 업적평가</p>
          <h1 className="text-2xl font-bold text-slate-900">개인별업적평가 출력</h1>
          <p className="text-sm text-slate-500 mt-1">부서별 사원의 목표 및 업적평가 결과를 조회합니다.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
          <Printer className="w-4 h-4" />
          인쇄
        </button>
      </div>

      {/* 조회 조건 */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-4">조회 조건</p>
        <div className="flex items-end gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">부서</label>
            <select
              value={selectedDept}
              onChange={(e) => handleDeptChange(e.target.value)}
              className="block px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-40"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">사원</label>
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="block px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-40"
            >
              {deptEmployees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name} ({emp.position})</option>
              ))}
            </select>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all">
            <Search className="w-4 h-4" />
            조회
          </button>
        </div>
      </div>

      {selectedEmployee && (
        <>
          {/* 사원 정보 카드 */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 mb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-slate-900">{selectedEmployee.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {selectedEmployee.position}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                    {selectedEmployee.dept}
                  </span>
                </div>
                <p className="text-sm text-slate-500">총 {selectedEmployee.goals.length}개 목표 등록</p>
              </div>
              <div className="flex items-center gap-6 pr-2">
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-1">본인 가중평균</p>
                  <p className={`text-xl font-bold ${getScoreColor(weightedSelfScore)}`}>
                    {weightedSelfScore.toFixed(1)}
                  </p>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-1">1차평가 가중평균</p>
                  <p className={`text-xl font-bold ${getScoreColor(weightedFirstScore)}`}>
                    {weightedFirstScore.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 업적평가 테이블 */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-900">업적평가 결과</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                {selectedEmployee.goals.length}건
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left text-xs font-semibold text-slate-600 px-4 py-3.5 w-[11%]">상위조직목표</th>
                    <th className="text-left text-xs font-semibold text-slate-600 px-4 py-3.5 w-[12%]">목표</th>
                    <th className="text-left text-xs font-semibold text-slate-600 px-4 py-3.5 w-[16%]">설정 사유</th>
                    <th className="text-left text-xs font-semibold text-slate-600 px-4 py-3.5 w-[16%]">핵심 결과물</th>
                    <th className="text-left text-xs font-semibold text-slate-600 px-4 py-3.5 w-[16%]">주요 실적</th>
                    <th className="text-center text-xs font-semibold text-slate-600 px-4 py-3.5 w-[7%]">평가구분</th>
                    <th className="text-center text-xs font-semibold text-slate-600 px-4 py-3.5 w-[7%]">비중(%)</th>
                    <th className="text-center text-xs font-semibold text-slate-600 px-4 py-3.5 w-[7%]">달성율(%)</th>
                    <th className="text-center text-xs font-semibold text-slate-600 px-4 py-3.5 w-[7%]">본인점수</th>
                    <th className="text-center text-xs font-semibold text-slate-600 px-4 py-3.5 w-[7%]">1차평가점수</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEmployee.goals.map((goal, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${
                        idx === selectedEmployee.goals.length - 1 ? 'border-none' : ''
                      }`}
                    >
                      <td className="px-4 py-4 align-top">
                        <p className="text-sm text-slate-700 leading-relaxed">{goal.orgGoal}</p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="text-sm text-slate-700 leading-relaxed">{goal.goal}</p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="text-sm text-slate-500 leading-relaxed">{goal.reason}</p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="text-sm text-slate-500 leading-relaxed">{goal.keyResult}</p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        <p className="text-sm text-slate-700 leading-relaxed">{goal.achievement}</p>
                      </td>
                      <td className="px-4 py-4 text-center align-top">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          goal.evalType === '정량'
                            ? 'bg-blue-100 text-blue-700'
                            : goal.evalType === '정성'
                            ? 'bg-violet-100 text-violet-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {goal.evalType}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center align-top">
                        <span className="text-sm font-semibold text-slate-700">{goal.weight}%</span>
                      </td>
                      <td className="px-4 py-4 text-center align-top">
                        <span className={`text-sm font-semibold ${getAchieveRateColor(goal.achieveRate)}`}>
                          {goal.achieveRate}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center align-top">
                        <span className={`text-sm ${getScoreColor(goal.selfScore)}`}>
                          {goal.selfScore}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center align-top">
                        <span className={`text-sm ${getScoreColor(goal.firstEvalScore)}`}>
                          {goal.firstEvalScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* 합계 행 */}
                <tfoot>
                  <tr className="bg-slate-50/80 border-t-2 border-slate-200">
                    <td colSpan={6} className="px-4 py-3.5 text-sm font-semibold text-slate-700 text-right">
                      합계 / 가중평균
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-sm font-bold ${totalWeight === 100 ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {totalWeight}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="text-sm font-bold text-slate-500">—</span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-sm font-bold ${getScoreColor(weightedSelfScore)}`}>
                        {weightedSelfScore.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`text-sm font-bold ${getScoreColor(weightedFirstScore)}`}>
                        {weightedFirstScore.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
