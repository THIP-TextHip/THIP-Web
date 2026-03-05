# THIP (띱)

> 독서를 기록하는 가장 힙한 방법 — 커뮤니티형 독서 기록 플랫폼


---

## 주요 화면


<img width="1920" height="1080" alt="튜토리얼(1)" src="https://github.com/user-attachments/assets/83d707dd-6208-42b7-8249-2a0a3bbd1f9d" />

<img width="1920" height="1080" alt="피드(2)" src="https://github.com/user-attachments/assets/eaf15522-a35c-459a-8ebf-c416e473d4ab" />

<img width="5760" height="3240" alt="피드(3)" src="https://github.com/user-attachments/assets/6aec3a18-db90-455c-ae11-eb1626b3e701" />

<img width="1920" height="1080" alt="모임(4)" src="https://github.com/user-attachments/assets/b8bfa7eb-ce78-4071-8c79-6c951f098dec" />

<img width="1920" height="1080" alt="모임(5)" src="https://github.com/user-attachments/assets/fb74b8e2-4728-4a5e-8fb5-bb91f621a721" />


---

## 기술 스택

| 분류            | 기술                                                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| Build           | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)                                                                                                                       |
| Routing         | ![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)                                                                                             |
| Server State    | ![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=flat-square&logo=reactquery&logoColor=white)                                                                                          |
| Client State    | ![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat-square&logoColor=white)                                                                                                                           |
| Styling         | ![Emotion](https://img.shields.io/badge/Emotion-C865B9?style=flat-square&logoColor=white)                                                                                                                           |
| HTTP            | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)                                                                                                                    |
| Deploy          | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)                                                                                                                 |
| Package Manager | ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)                                                                                                                       |
---

## 프로젝트 구조

```
src/
├── api/                  # 도메인별 API 호출 함수
│   ├── auth/             # 인증 (토큰 발급)
│   ├── books/            # 도서 검색·저장
│   ├── comments/         # 댓글
│   ├── feeds/            # 피드
│   ├── images/           # 이미지 업로드
│   ├── memory/           # 추억 (그룹 기록)
│   ├── notifications/    # 알림
│   ├── recentsearch/     # 최근 검색어
│   ├── record/           # 독서 기록
│   ├── roomPosts/        # 그룹 게시글
│   ├── rooms/            # 모임(그룹)
│   └── users/            # 유저 프로필·팔로우
│
├── components/           # 재사용 컴포넌트
│   ├── common/           # 공통 UI (레이아웃, 모달, 바텀시트 등)
│   ├── creategroup/      # 그룹 생성
│   ├── createpost/       # 게시글 작성
│   ├── feed/             # 피드
│   ├── group/            # 그룹
│   ├── members/          # 멤버
│   ├── memory/           # 추억
│   ├── Mypage/           # 마이페이지
│   ├── pollwrite/        # 투표 작성
│   ├── recordwrite/      # 기록 작성
│   ├── search/           # 검색
│   └── today-words/      # 오늘의 단어
│
├── hooks/                # 커스텀 훅
├── mocks/                # 목(Mock) 데이터
├── pages/                # 페이지 컴포넌트 (라우트 단위)
│   ├── login/            # 로그인
│   ├── signup/           # 회원가입
│   ├── feed/             # 피드
│   ├── group/            # 그룹 목록·생성
│   ├── groupDetail/      # 그룹 상세
│   ├── groupMembers/     # 그룹 멤버
│   ├── groupSearch/      # 그룹 검색
│   ├── search/           # 책 검색
│   ├── searchBook/       # 책 상세·책별 모임
│   ├── memory/           # 추억
│   ├── recordwrite/      # 기록 작성
│   ├── pollwrite/        # 투표 작성
│   ├── aiwrite/          # AI 기록 작성
│   ├── today-words/      # 오늘의 단어
│   ├── mypage/           # 마이페이지
│   └── notice/           # 공지사항
│
├── stores/               # Zustand 전역 상태
│   ├── authReadyStore.ts
│   ├── commentBottomSheetStore.ts
│   ├── popupStore.ts
│   └── replyStore.ts
│
├── types/                # TypeScript 타입 정의
│   ├── book.ts / room.ts / post.ts / user.ts 등
│
└── utils/                # 유틸리티 함수
```

---

## 시작하기

### 설치 및 실행

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 코드 포맷
pnpm format
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 아래 값을 채워주세요.

```dotenv
VITE_API_BASE_URL=https://your-api-server.com
VITE_FRONTEND_URL=https://your-frontend-url.com
```

---

## 팀원 소개

<div align="center">

| **김희용** | **이지현** | **지호준** | 
| :------: |  :------: | :------: | 
| [<img src="https://github.com/user-attachments/assets/2f304cf1-0797-4763-8823-d6190004c602" height=150 width=150> <br/> @heeeeyong](https://github.com/heeeeyong) | [<img src="https://github.com/user-attachments/assets/3c796227-22d9-48bc-8286-7fe226ece0c2" height=150 width=150> <br/> @ljh130334](https://github.com/ljh130334) | [<img src="https://github.com/user-attachments/assets/1215080e-59d4-4584-812f-5ec46fb8fbd9" height=150 width=150> <br/> @ho0010](https://github.com/ho0010) | 
</div>
