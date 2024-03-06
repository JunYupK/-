import { create } from 'zustand';

const urlStore = create(() => ({
  // API_URL: 'http://localhost:4000', // 로컬 개발환경
  // KAKAO_URL: 'http://localhost:4000',
  API_URL: 'https://i10a209.p.ssafy.io/api', // 젠킨스 환경
  KAKAO_URL: 'https://i10a209.p.ssafy.io:4000',
}));

export default urlStore;
