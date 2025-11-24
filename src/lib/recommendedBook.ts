export type Book = {
  id: string | number;
  title: string;
  author: string;
  description: string;
  image: string;
};

export const recommendedBooks: Book[] = [
  {
    id: "8996991341",
    title: "미움받을 용기",
    author: "기시미 이치로",
    description: "용기와 자기수용에 대한 철학적인 대화 형식의 책입니다.",
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038%3Ftimestamp%3D20230128141840",
  },
  {
    id: "8972756199",
    title: "나미야 잡화점의 기적",
    author: "히가시노 게이고",
    description: "시간을 초월한 편지 상담을 통해 서로를 치유해 가는 이야기.",
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1006628%3Ftimestamp%3D20230412144545",
  },
  {
    id: "8936434268",
    title: "아몬드",
    author: "손원평",
    description:
      "감정을 느끼지 못하는 소년이 세상과 관계 맺는 과정을 그린 소설.",
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F532619%3Ftimestamp%3D20231124191358",
  },
  {
    id: "1193790654",
    title: "해리 포터와 마법사의 돌",
    author: "J.K. 롤링",
    description: "마법 세계로 초대하는 해리 포터 시리즈의 첫 번째 이야기.",
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6812119%3Ftimestamp%3D20250425204447",
  },
];

export const popularBooks: Book[] = [
  {
    id: "1161571183",
    title: "불편한 편의점",
    author: "김호연",
    description: "동네 편의점을 배경으로 한 따뜻한 사람 이야기.",
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5643183%3Ftimestamp%3D20251121143223",
  },
  {
    id: "1165341905",
    title: "달러구트 꿈 백화점",
    author: "이미예",
    description: "사람들의 '꿈'을 파는 백화점에서 벌어지는 이야기.",
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5416922%3Ftimestamp%3D20251119142120",
  },
  {
    id: "1168340519",
    title: "파친코",
    author: "이민진",
    description: "재일 조선인 가족의 여러 세대를 따라가는 서사.",
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6117506%3Ftimestamp%3D20250828141606",
  },
  {
    id: "8998441012",
    title: "모순",
    author: "양귀자",
    description: "인생은 살아가면서 탐구하는 것! 모순에 대한 성찰.",
    image:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1500252%3Ftimestamp%3D20250610112831",
  },
];
