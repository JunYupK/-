import {
  Routes,
  Route,
  useNavigate,
  useParams,
  // useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Header from '../components/layouts/Header';
import SideBar from '../components/foodmap/SideBar';
import FoodMap from '../components/foodmap/FoodMap';
import Reviews from '../components/reviews/Review';
import Subscribe from '../components/subscribe/Subscribe';
import contents from '../styles/foodmap/FoodMapView.module.css';
import ReviewRegistration from '../components/reviews/ReviewRegistration';
import ReviewDetail from '../components/reviews/ReviewDetail';
import ReviewUpdate from '../components/reviews/ReviewUpdate';
import DongsanModal from '../components/modals/DongsanModal';
import Following from '../components/subscribe/Following';
import Follower from '../components/subscribe/Follower';
import RestaurantDetail from '../components/restaurants/RestaurantDetail';
import UserInfoModal from '../components/modals/UserInfoModal';
import OtherUserDongsanModal from '../components/modals/OtherUserDongsanModal';
import userStore from '../stores/userStore';
import urlStore from '../stores/urlStore';
import dongsanStore from '../stores/dongsanStore';
import reviewStore from '../stores/reviewStore';

function FoodMapView() {
  const { API_URL } = urlStore();
  const navigate = useNavigate();
  // const location = useLocation();
  const {
    setIsMyPage,
    // setCurrentPageID,
    setLoginAccount,
    isMyPage,
    // accessToken,
    setAccessToken,
    // loginAccount,
    // setIsLogin,
  } = userStore();
  const { setDongsanUsers, dongsanUsers } = dongsanStore();
  const { refresh, setRefresh } = reviewStore();
  const { userID } = useParams();
  // const loginID = loginAccount.id;

  useEffect(() => {
    // console.log('로그인아이디', loginID);
    const url = `${API_URL}/account`;
    setAccessToken(localStorage.getItem('ACCESS_TOKEN'));
    axios({
      method: 'get',
      url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        'Content-Type': 'application/json',
      },
    })
      // { id: 17, nickname: '나', follower: 513, filter: true },
      .then((response) => {
        console.log('요청 성공:', response.data);
        setLoginAccount(response.data);
        setTimeout(() => {
          setRefresh(!refresh);
        }, 50);
        setDongsanUsers([
          {
            id: response.data.id,
            nickname: response.data.nickname,
            filter: true,
          },
        ]);
        console.log(dongsanUsers, '나를 동산에 추가했음');
        // 성공 시 필요한 작업 수행
      })
      .catch((error) => {
        console.error('요청 실패:', error);
        // 실패 시 에러 처리
      });
    if (userID !== undefined) {
      // setCurrentPageID(userID);
      setIsMyPage(false); // 리스트목록갱신
    } else {
      // setCurrentPageID(loginID); // 로그인한아이디 입력
      setIsMyPage(true);
    }
    // if (loginID !== undefined) {
    //   setIsLogin(true);
    //   console.log(loginID, '로그인 함!');
    // } else {
    //   setIsLogin(false);
    //   console.log(loginID, '로그인 안함!');
    // }
  }, [navigate]);

  return (
    <div className={contents.container}>
      <header className={contents.header}>
        <Header />
      </header>
      <main className={contents.wrapper}>
        <SideBar />
        <Routes>
          <Route path="/restaurants/*" element={<Reviews />} />
          <Route path="/subscribe" element={<Subscribe />}>
            <Route index element={<Following />} />
            <Route path="followings" element={<Following />} />
            <Route path="followers" element={<Follower />} />
          </Route>
        </Routes>
        <div>
          <Routes>
            <Route
              path="/restaurants/:restaurantID/detail"
              element={<RestaurantDetail />}
            />
            <Route
              path="/restaurants/write"
              element={<ReviewRegistration />}
            />
            <Route
              path="/restaurants/:restaurantID/write"
              element={<ReviewRegistration />}
            />
            <Route
              path="/restaurants/:restaurantID/reviews/:reviewID"
              element={<ReviewDetail />}
            />
            <Route
              path="/restaurants/:restaurantID/reviews/:reviewID/update"
              element={<ReviewUpdate />}
            />
          </Routes>
          <FoodMap />
          {isMyPage && <DongsanModal />}
          {!isMyPage && <UserInfoModal />}
          {!isMyPage && <OtherUserDongsanModal />}
        </div>
      </main>
    </div>
  );
}

export default FoodMapView;
