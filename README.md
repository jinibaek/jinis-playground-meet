모임날짜 정하는 프로그램

여러 사용자가 동시에 접속하여  
각자 가능한 날짜를 선택하고  
가장 많이 겹치는 날짜를 확인할 수 있는 실시간 캘린더 웹앱입니다.

---

Tech Stack
- Next.js (App Router)
- Firebase Firestore
- Tailwind CSS
- Vercel Deploy

---

Features

사용자 시스템
- 닉네임 기반 간단 로그인
- localStorage로 세션 유지

캘린더 기능 (2026.7월만 제공) 
- 1~31일 날짜 선택
- 선택 / 해제 토글

실시간 동기화
- Firebase Firestore 저장
- onSnapshot으로 다른 사용자 선택 즉시 반영

유저별 데이터
- users 컬렉션에 개별 날짜 저장
- 날짜별 선택 인원 및 닉네임 표시

통계 기능
- 날짜별 선택 인원 수 집계
- 가장 많이 선택된 날짜 확인 가능

---

핵심 구조
- users/{nickname}
  - nickname
  - dates: [1, 5, 12, ...]

- 전체 유저 데이터 실시간 조회 → 날짜별 필터링

---

Deployment
- Vercel 자동 배포
- GitHub 연동 CI/CD

---

프로젝트 목적
친구 / 지인 모임 날짜를 빠르게 조율하기 위한  
실시간 협업 캘린더 서비스

---

Author
Jini
