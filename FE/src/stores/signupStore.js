import { create } from 'zustand';

const signupStore = create((set) => ({
  nickname: '',
  setNickname: (value) => set({ nickname: value }),
  gender: '',
  setGender: (value) => set({ gender: value }),
  age: '',
  setAge: (value) => set({ age: value }),
  regionInterest: 0,
  setRegionInterest: (value) => set({ regionInterest: value }),
  spicyLevel: 0,
  setSpicyLevel: (value) => set({ spicyLevel: value }),
  allergy: [],
  setAllergy: (value) => set({ allergy: value }),
  passed: false,
  setPassed: (value) => set({ passed: value }),
  profile: '',
  setProfile: (value) => set({ profile: value }),
  // regionTotal: [
  //   {
  //     regionName: '서울특별시 강남구 역삼동',
  //   },
  // ],
  // setRegionTotal: (value) => set({ regionTotal: value }),
}));

export default signupStore;
