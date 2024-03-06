import { useState, useEffect, useCallback } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert2';
import urlStore from '../../stores/urlStore';
import content from '../../styles/foodmap/FoodMapView.module.css';
import detail from '../../styles/restaurants/RestaurantDetail.module.css';
import userStore from '../../stores/userStore';

function RestaurantDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantId = location.state.id;
  const { API_URL } = urlStore();
  // console.log(restaurantId);
  const { loginAccount } = userStore();
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isPresent, setIsPresent] = useState(0);
  const [thum, setThum] = useState('');
  const [menus, setMenus] = useState('');
  const [categories, setCategories] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const { userID } = useParams();
  const deleteMyRestaurant = useCallback(() => {
    axios({
      method: 'delete',
      url: `${API_URL}/restaurant/${loginAccount.id}/${restaurantId}`,
    })
      .then((res) => {
        console.log('가게 삭제', res);
        navigate(`/main/restaurants/${restaurantId}/detail`, {
          state: {
            id: restaurantId,
          },
        });
      })
      .catch((err) => {
        console.error('가게 삭제ㅠㅠ', err);
      });
  }, [API_URL, navigate, restaurantId]);

  const registerMyRestaurant = useCallback(() => {
    if (!loginAccount.id) {
      swal.fire({
        text: '로그인 후에 등록할 수 있습니다!',
        icon: 'warning',
        confirmButtonColor: '#1DB177',
        confirmButtonText: '확인',
      });
    } else {
      axios({
        method: 'post',
        url: `${API_URL}/restaurant/${loginAccount.id}?restaurantId=${restaurantId}`,
      })
        .then((res) => {
          console.log('내 맛집 등록', res);
          navigate(`/main/restaurants/${restaurantId}/detail`, {
            state: {
              id: restaurantId,
            },
          });
        })
        .catch((err) => {
          console.error('내 맛집 등록ㅠㅠ', err);
        });
    }
  }, [API_URL, navigate, restaurantId]);

  useEffect(() => {
    // 가게 상세 정보 가져오기
    axios({
      method: 'get',
      url: `${API_URL}/restaurant/common/v2/${restaurantId}`,
    })
      .then((res) => {
        console.log('가게 상세 정보', res);
        setAddress(res.data.address);
        setName(res.data.name);
        setPhone(res.data.phone);
        setThum(res.data.thumUrl);
        setMenus(res.data.menuInfo);
        setCategories(res.data.restaurantFoodCategories);
      })
      .catch((err) => {
        console.error('가게 상세 정보 실패ㅠㅠ', err);
      });

    // 해당 가게가 내 맛집으로 저장되어있는지?
    axios({
      method: 'get',
      url: `${API_URL}/restaurant/${loginAccount.id}/${restaurantId}`,
    })
      .then((res) => {
        console.log('내 맛집?', res);
        setIsPresent(res.data.isPresent);
      })
      .catch((err) => {
        console.error('내 맛집ㅠㅠ', err);
      });
  }, [location]);

  useEffect(() => {
    setMenuList(menus?.split(' | '));
    console.log(menuList);
  }, [menus]);

  return (
    <div className={content.hiddenSpace}>
      <CloseIcon
        onClick={() => {
          // 로그인한 사용자라면 바로 navigate 함수를 호출합니다.
          navigate(
            userID === undefined
              ? '/main/restaurants'
              : `/main/users/${userID}/restaurants`
          );
        }}
        sx={{
          position: 'absolute',
          right: '1vw',
          top: '2vh',
          width: '18px',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      />
      <div className={detail.container}>
        <div className={detail.wrapper}>
          <div className={detail.storeName}>{name}</div>
          {isPresent === 1 ? (
            <StarRoundedIcon
              className={detail.btn}
              sx={{ color: '#1DB177' }}
              onClick={deleteMyRestaurant}
            />
          ) : (
            <StarOutlineRoundedIcon
              className={detail.btn}
              sx={{ color: '#1DB177' }}
              onClick={registerMyRestaurant}
            />
          )}
        </div>
        <div className={detail.category}>
          <ul>
            {categories.map((category, i) =>
              i < categories.length - 1 ? (
                <li key={category.name}>
                  {category.name}
                  <span style={{ margin: '0 3px' }}>|</span>
                </li>
              ) : (
                <li key={category.name}>{category.name}</li>
              )
            )}
          </ul>
        </div>
        <div className={detail.thumNail}>
          <img src={thum} alt="가게 썸네일" />
        </div>
        <div className={detail.address}>🏠 {address}</div>
        <div className={detail.phone}>📞 {phone}</div>
        <div className={detail.menu}>
          <table>
            <caption className={detail.menuTitle}>메뉴</caption>
            <tbody>
              {menuList?.map((menu) => (
                <tr key={menu} className={detail.menuBody}>
                  {/* <td>{menu}</td> */}
                  <td>
                    {menu &&
                      menu?.match(/^(.*?)(\d[\d,]*)$/)[1]?.trim()}
                  </td>
                  <td>
                    {menu &&
                      menu?.match(/^(.*?)(\d[\d,]*)$/)[2]?.trim()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;
