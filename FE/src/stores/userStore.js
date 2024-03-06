import { create } from 'zustand';

const userStore = create((set) => ({
  accessToken: '',
  setAccessToken: (value) => set({ accessToken: value }),
  loginModalOpen: false,
  setLoginModalOpen: (value) => set({ loginModalOpen: value }),
  isMyPage: true,
  setIsMyPage: (value) => set({ isMyPage: value }),
  isLogin: false,
  setIsLogin: (value) => set({ isLogin: value }),
  currentPageID: undefined,
  setCurrentPageID: (value) => set({ currentPageID: value }),
  loginAccount: {},
  setLoginAccount: (value) => set({ loginAccount: value }),
  followingUsers: [],
  setFollowingUsers: (value) => set({ followingUsers: value }),
}));

export default userStore;
