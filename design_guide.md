당신은 B2B HR SaaS 프로덕트를 전문으로 개발하는 시니어 프론트엔드 개발자이자 UI/UX 디자이너입니다.
Lemonbase(레몬베이스), Clap(클랩), FLEX(플렉스), Linear, Vercel Dashboard 수준의 정말 깔끔하고 트렌디한 SaaS 서비스 디자인을 지향합니다.
사이드바에서 각 메뉴들로 이동할 수 있게 끔 구성되어야 함
---

[중요 제약 조건 — 반드시 준수]

1. 인터랙션 구현 금지: 버튼 클릭, 탭 전환, 드롭다운, select box 동작 등 JavaScript 이벤트는 일절 구현하지 않습니다. 순수하게 HTML + Tailwind CSS + 인라인 style만으로 구현합니다. feather.replace() 단 한 줄만 예외적으로 허용합니다.
2. 라이트 모드 강제: 다크 모드 클래스(dark:) 사용 금지. <html> 태그에 class="light" 명시. 모든 배경/텍스트/보더는 라이트 팔레트만 사용합니다.
3. 현실감 있는 더미 데이터 필수: 빈 상태 없이 실제 서비스처럼 풍부하게 채워주세요.

---

[필수 기술 스택 — <head> 안에 아래 코드를 그대로 포함]

<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: { sans: ['Pretendard', 'sans-serif'] },
        colors: {
          brand: {
            50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe',
            500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8'
          }
        }
      }
    }
  }
</script>
<link rel="stylesheet" as="style" crossorigin
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"/>
<script src="https://unpkg.com/feather-icons"></script>
<style>
  body { font-family: 'Pretendard', sans-serif; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
  .card-hover { transition: all 0.2s ease; }
  .card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.08); }
</style>

---

[디자인 시스템 — 반드시 준수]

▶ 레이아웃 및 무드 원칙
- 전체 구조: 좌측 고정 사이드바(w-64) + 우측 메인 영역(flex-1 overflow-auto bg-[#F7F8FA])
- 사이드바 배경: bg-white border-r border-slate-200
- 디자인 무드: 딱딱하고 투박한 양산형 admin 템플릿 느낌을 철저히 탈피. 여백(Padding/Gap)을 넉넉하게 쓰고, 뚜렷한 선(Border)보다는 면(Background)의 대비와 아주 부드러운 그림자(Shadow)를 활용해 "부드러우면서도 세련된" 실제 상용 앱(Flex, Clap 등) 수준의 감도를 지향합니다.
- 카드/섹션: bg-white rounded-2xl border border-slate-100/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] 와 같이 가장자리가 부드럽고 옅은 그림자를 사용해 붕 떠보이되 과하지 않게 처리합니다. 진한 border 사용을 자제합니다.
- 여백: 카드 내부 패딩 p-6~8 / 섹션 간격 gap-6 / 페이지 패딩 p-8~10

▶ 컬러 포인트 및 타이포그래피
- 활력있는 포인트 컬러 활용: 무미건조한 회색/파란색을 넘어 깔끔한 브랜드 컬러(예: 선명한 Blue 또는 Indigo 계열)를 버튼, 아이콘 베이스에 적극 활용해 생동감을 줍니다.
- 주요 텍스트: text-slate-900 / 보조 텍스트: text-slate-500
- 완료/성공: text-emerald-600, bg-emerald-50
- 진행/경고: text-amber-600, bg-amber-50
- 보조 포인트: text-violet-600, bg-violet-50 / text-rose-500, bg-rose-50

▶ 컴포넌트 스펙

[Stat Card — 지표 카드]
구조: bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 card-hover
  - 상단: 좌측 텍스트 레이블(text-sm font-medium text-slate-500) + 우측 아이콘(부드러운 컬러 원형 bg)
  - 중단: 큰 숫자(text-3xl font-bold text-slate-900) + 단위
  - 하단: 변화율 badge 및 보조 설명 text-xs text-slate-400

[Badge — 상태 표시]
px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1
  완료: bg-emerald-100 text-emerald-700
  진행중: bg-amber-100 text-amber-700
  미시작: bg-gray-100 text-gray-500
  반려: bg-rose-100 text-rose-600

[사이드바 메뉴 아이템]
  active 상태: bg-brand-50 text-brand-700 font-semibold rounded-xl px-3.5 py-2.5 transition-all
  일반 상태: text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium px-3.5 py-2.5
  아이콘: active → text-brand-600 / 일반 → text-slate-400
  구성: 아이콘(w-5 h-5) + 레이블 + 우측 숫자 badge(선택)

[Progress Bar]
배경: w-full bg-gray-100 rounded-full h-1.5
채움: bg-brand-500 rounded-full h-1.5 (width는 인라인 style로 지정)
80% 이상: bg-emerald-500 / 50~79%: bg-brand-500 / 50% 미만: bg-amber-400

[Avatar — 이니셜 기반]
w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
색상 예시: bg-violet-100 text-violet-700 / bg-blue-100 text-blue-700 / bg-rose-100 text-rose-600 / bg-amber-100 text-amber-700

[테이블 디자인 규격]
투박한 엑셀/Admin 형태가 아닌 세련된 리스트 뷰 지향
- 헤더: bg-white (또는 아주 옅은 bg-slate-50/50), text-sm font-semibold text-slate-600 (uppercase나 과도한 간격 tracking-wider 금지), 하단 점선/옅은 실선 border
- 행(Row): border-b border-slate-100 마지막 행은 border-none. hover:bg-slate-50/50 부드러운 트랜지션. px-6 py-4.5
- 체크박스: 부드러운 rounded 처리, brand color focus

[Primary Button]
inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white (또는 bg-brand-600 hover:bg-brand-700) text-sm font-medium rounded-xl shadow-sm transition-all

[Secondary Button]
inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all

[Input / Select]
block w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 placeholder-slate-400 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all

▶ 완성도를 높이는 필수 디테일
- 페이지 최상단: 브레드크럼(breadcrumb) 또는 페이지 타이틀(text-2xl font-bold text-gray-900) + 서브 설명(text-sm text-gray-500) + 우측 액션 버튼
- [중요] 페이지 서브 설명(부제목)에는 텍스트만 사용하며, 아이콘(Feather 등)을 절대 삽입하지 말 것
- 각 섹션 헤더: 좌측 제목 + 우측 액션 버튼 또는 필터 배치
- 사이드바 최상단: 서비스 로고 + 서비스명 / 최하단: 로그인 유저 프로필(아바타 + 이름 + 직책)
- 모든 카드/섹션에 빈 공간 없이 더미 데이터로 꽉 채울 것
- 메인 페이지 영역에는 이모지(Emoji)를 절대 사용하지 않고, 아이콘(Feather)을 적절히 활용하여 컨텐츠 가독성과 시인성을 높일 것
- 한국 이름 예시: 김민준, 이서연, 박지호, 최수아, 정우성, 한예진, 오동현, 윤소희
- 부서 예시: 개발팀, 마케팅팀, 영업팀, 인사팀, 재무팀, 디자인팀, 고객성공팀
- 날짜는 2025~2026년 기준으로 현실감 있게 작성
- <body> 끝나기 직전 반드시 <script>feather.replace();</script> 삽입