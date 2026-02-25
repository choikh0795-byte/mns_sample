import { Construction } from 'lucide-react';

const pageLabels: Record<string, { title: string; section: string; desc: string }> = {
  'goal-setting': { section: '팀 업적 관리', title: '목표 설정 (OKR)', desc: '팀별 OKR을 설정하고 진행 상황을 관리합니다.' },
  'achievement-entry': { section: '팀 업적 관리', title: '업적 등록/수정', desc: '팀 구성원의 업적을 등록하고 수정합니다.' },
  'progress-monitoring': { section: '팀 업적 관리', title: '진행현황 모니터링', desc: '실시간 업적 달성 현황을 모니터링합니다.' },
  'eval-progress': { section: '개인별 업적평가', title: '평가 진행', desc: '현재 진행 중인 평가를 관리합니다.' },
  'eval-results': { section: '개인별 업적평가', title: '평가 결과 조회', desc: '완료된 평가 결과를 조회하고 분석합니다.' },
  'feedback-mgmt': { section: '개인별 업적평가', title: '피드백 관리', desc: '평가에 대한 피드백을 관리합니다.' },
  'competency-criteria': { section: '역량평가', title: '역량 기준 관리', desc: '조직의 역량 평가 기준과 항목을 관리합니다.' },
  'competency-progress': { section: '역량평가', title: '역량평가 진행', desc: '현재 진행 중인 역량평가를 관리합니다.' },
  'competency-analysis': { section: '역량평가', title: '결과 분석', desc: '역량평가 결과를 분석하고 리포트를 생성합니다.' },
  'survey-mgmt': { section: '조직문화개선', title: '설문 관리', desc: '조직문화 진단 설문을 생성하고 관리합니다.' },
  'culture-analysis': { section: '조직문화개선', title: '결과 분석', desc: '설문 결과를 분석하고 인사이트를 도출합니다.' },
  'action-plan': { section: '조직문화개선', title: '개선 액션 플랜', desc: '조직문화 개선을 위한 액션 플랜을 수립합니다.' },
  'eval-report': { section: '종합평가', title: '평가 보고서', desc: '종합 평가 보고서를 생성하고 내보냅니다.' },
  'annual-summary': { section: '종합평가', title: '연간 평가 요약', desc: '연간 평가 결과를 요약하여 확인합니다.' },
  'score-status': { section: '종합평가', title: '종합 점수 현황', desc: '전체 임직원의 종합 점수 현황을 확인합니다.' },
};

interface PlaceholderPageProps {
  menuId: string;
}

export const PlaceholderPage = ({ menuId }: PlaceholderPageProps) => {
  const info = pageLabels[menuId] ?? { section: '메뉴', title: '페이지', desc: '준비 중인 페이지입니다.' };

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-xs text-slate-400 mb-1">{info.section}</p>
        <h1 className="text-2xl font-bold text-slate-900">{info.title}</h1>
        <p className="text-sm text-slate-500 mt-1">{info.desc}</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-lg font-bold text-slate-700 mb-2">{info.title}</h2>
        <p className="text-sm text-slate-500 max-w-sm">
          이 화면은 현재 개발 중입니다. 프로토타입에서는 주요 화면만 구현되어 있습니다.
        </p>
        <div className="mt-6 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl">
          개발 예정
        </div>
      </div>
    </div>
  );
};
