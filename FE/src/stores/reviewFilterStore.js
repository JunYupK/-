import { create } from 'zustand';
import dayjs from 'dayjs';

const reviewFilterStore = create((set) => ({
  searchKeyWord: '',
  setSearchKeyWord: (value) => set({ searchKeyWord: value }),
  setUserFriend: (value) => set({ userFriend: value }),
  selectedFriend: [],
  setSelectedFriend: (value) => set({ selectedFriend: value }),
  계정없는친구선택: [],
  계정없는친구선택수정: (value) => set({ 계정없는친구선택: value }),
  selectedFriendID: [],
  setSelectedFriendID: (value) => set({ selectedFriendID: value }),
  계정없는친구ID선택: [],
  계정없는친구ID선택수정: (value) =>
    set({ 계정없는친구ID선택: value }),
  selectedStartDate: dayjs(dayjs('2024-01-01').format('YYYY-MM-DD')),
  setSelectedStartDate: (value) => set({ selectedStartDate: value }),
  selectedEndDate: dayjs(dayjs().format('YYYY-MM-DD')),
  setSelectedEndDate: (value) => set({ selectedEndDate: value }),
  businessTypesCategory: [
    { title: '족발' },
    { title: '보쌈' },
    { title: '돈까스' },
    { title: '회' },
    { title: '일식' },
    { title: '고기' },
    { title: '구이' },
    { title: '피자' },
    { title: '찜' },
    { title: '탕' },
    { title: '찌개' },
    { title: '양식' },
    { title: '중식' },
    { title: '아시안' },
    { title: '치킨,닭강정' },
    { title: '백반' },
    { title: '죽' },
    { title: '국수' },
    { title: '버거' },
    { title: '분식' },
    { title: '카페' },
    { title: '디저트' },
  ],
  setBusinessTypesCategory: (value) =>
    set({ selectedEndDate: value }),
  selectedBusinessTypes: [],
  setSelectedBusinessTypes: (value) =>
    set({ selectedBusinessTypes: value }),
  setUserLocation: (value) => set({ userLocation: value }),
  selectedUserLocation: '',
  setSelectedUserLocation: (value) =>
    set({ selectedUserLocation: value }),
  selectedUserLocationID: undefined,
  setSelectedUserLocationID: (value) =>
    set({ selectedUserLocationID: value }),
}));

export default reviewFilterStore;
