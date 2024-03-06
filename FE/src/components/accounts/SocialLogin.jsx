import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert2';
import axios from 'axios';
import userStore from '../../stores/userStore';
import urlStore from '../../stores/urlStore';

function SocialLogin() {
  const { API_URL } = urlStore();
  const { setAccessToken, setLoginAccount } = userStore();
  const navigate = useNavigate();
  const location = useLocation();
  const getUrlParameter = (name) => {
    const { search } = location;
    const params = new URLSearchParams(search);
    return params.get(name);
  };
  const token = getUrlParameter('token');
  const Toast = swal.mixin({
    toast: true,
    position: 'center-center',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', swal.stopTimer);
      toast.addEventListener('mouseleave', swal.resumeTimer);
    },
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const url = `${API_URL}/account`;
        const response = await axios({
          method: 'get',
          url,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('사용자 데이터 요청 성공:', response.data);
        setLoginAccount(response.data);
        return response.data; // 사용자 데이터 반환
      } catch (error) {
        console.error('사용자 데이터 요청 실패:', error);
        throw error;
      }
    };

    // DB에 저장한 동산 상태 받아오기
    const getDongsanData = async (userId) => {
      try {
        const dongsanStatusRes = await axios.get(
          `${API_URL}/comparison/${userId}`
        );
        console.log('동산 상태!', dongsanStatusRes);

        if (dongsanStatusRes.data.comparisonList.length === 0) {
          dongsanStatusRes.data.comparisonList.push({
            comparedAccountId: userId,
            isHidden: 0,
          });
        } else if (
          dongsanStatusRes.data.comparisonList[0]
            .comparedAccountId !== userId
        ) {
          dongsanStatusRes.data.comparisonList.unshift({
            comparedAccountId: userId,
            isHidden: 0,
          });
        }

        localStorage.setItem(
          'DONGSAN_LIST',
          JSON.stringify(dongsanStatusRes.data.comparisonList)
        );
      } catch (err) {
        console.error('동산 상태ㅠㅠ', err);
      }
    };

    const fetchData = async () => {
      try {
        const userData = await getUserData(); // 사용자 데이터 받아오기
        // token 있고, 회원가입 한번도 하지 않았다면 -> 회원가입
        if (token && !userData.passed) {
          console.log('token/passed:', token, userData.passed);
          setAccessToken(token); // 토큰 설정
          console.log('토큰 로컬스토리지에 저장함!');
          localStorage.setItem('ACCESS_TOKEN', token);
          navigate('/signup', { state: location });
          Toast.fire({
            icon: 'success',
            title: `반갑습니다😊\n 회원가입 페이지로 이동합니다.`,
          });
        } else if (token && userData.passed) {
          setAccessToken(token); // 토큰 설정
          localStorage.setItem('ACCESS_TOKEN', token);
          console.log(
            '토큰 및 isPassed 확인:',
            token,
            userData.passed
          );
          navigate('/main/restaurants', { state: location }); // '/main/restaurants'로 수정
        }
        return userData;
      } catch (error) {
        console.error('사용자 데이터 요청 실패:', error);
        navigate('/');
        return error;
      }
    };

    fetchData().then((userData) => getDongsanData(userData.id));
  }, [API_URL, navigate, token, location, Toast]);

  return null;
}

export default SocialLogin;
