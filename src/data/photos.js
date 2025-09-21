// src/data/photos.js
const photos = [
    {
        id: 1,
        title: "새로운 프로젝트 시작 안내",
        desc: "안녕하세요. 새로운 프로젝트를 시작하게 되어 안내드립니다.",
        author: "관리자",
        date: "2024-01-15",
        views: 245,
        img: "/educ1_1.jpg",
    },
    {
        id: 2,
        title: "디자인 가이드라인 업데이트",
        desc: "디자인 시스템이 업데이트되었습니다.",
        author: "디자인팀",
        date: "2024-01-14",
        views: 189,
        img: "/educ1_2.jpg",
    },
    {
        id: 3,
        title: "개발팀 회의록",
        desc: "이번 주 개발팀 회의 내용입니다.",
        author: "개발팀",
        date: "2024-01-13",
        views: 156,
        img: "/educ8_1.jpg",
    },
    {
        id: 4,
        title: "마케팅 전략 발표",
        desc: "2024년 마케팅 전략 발표 자료 공유.",
        author: "마케팅팀",
        date: "2024-01-12",
        views: 200,
        img: "/eduu3_1.jpg",
    },
    {
        id: 5,
        title: "사용자 피드백 분석 결과",
        desc: "지난 분기 사용자 피드백을 분석했습니다.",
        author: "UX팀",
        date: "2024-01-11",
        views: 178,
        img: "/eduu3_2.jpg",
    },
    {
        id: 6,
        title: "보안 업데이트 공지",
        desc: "시스템 보안 업데이트가 예정되어 있습니다.",
        author: "보안팀",
        date: "2024-01-10",
        views: 134,
        img: "/images/photo6.jpg",
    },
    // ✅ 샘플 데이터 15개 더 생성해서 총 21개 유지
    ...Array.from({ length: 15 }, (_, i) => ({
        id: i + 7,
        title: `샘플 게시글 ${i + 7}`,
        desc: `이것은 샘플 게시글 ${i + 7}의 내용입니다.`,
        author: "테스트팀",
        date: `2024-01-${String(9 - i).padStart(2, "0")}`, // 날짜 역순
        views: 100 + i * 5,
        img: `/images/photo${(i % 6) + 1}.jpg`, // 사진 반복
    })),
];

export default photos;
