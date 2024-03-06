import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Slider from 'react-slick';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import GlobalFilterModal from '../modals/GlobalFilterModal';
// import NotiModal from '../modals/NotiModal';
import ProfileModal from '../modals/ProfileModal';
import LoginModal from '../modals/LoginModal';
import userStore from '../../stores/userStore';
import header from '../../styles/layouts/Header.module.css';
import imgLogo from '../../assets/images/logo.png';
import urlStore from '../../stores/urlStore';
import UserRankingModal from '../modals/UserRankingModal';
import reviewStore from '../../stores/reviewStore';
import globalFilterStore from '../../stores/globalFilterStore';
import dongsanStore from '../../stores/dongsanStore';

function Header() {
  const { API_URL } = urlStore();
  const { setShowRefreshBtn } = dongsanStore();
  const [userOrLocation, setUserOrLocation] = useState('장소');
  const url = `${API_URL}/account/rank`;
  const [accountRank, setAccountRank] = useState([]);
  const { accessToken, setLoginModalOpen } = userStore();
  const [userSearchInfos, setUserSearchInfos] = useState([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { setLocationFilterData, searchValue, setSearchValue } =
    globalFilterStore();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { loginAccount } = userStore();
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const settings = {
    pauseOnHover: false,
    dots: true,
    vertical: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  const { refresh, setRefresh, setValue, value } = reviewStore();
  const { isMyPage } = userStore();
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log('유저 순위 요청 성공:', response.data);
        setAccountRank(response.data);
        // 성공 시 필요한 작업 수행
      })
      .catch((error) => {
        console.error('유저 순위 요청 요청 실패:', error);
        // 실패 시 에러 처리
      });
    // console.log(accountRank);
  }, []);
  const modalOpen = () => setLoginModalOpen(true);

  const searchBtnClick = () => {
    if (userOrLocation === '장소') {
      setLocationFilterData([]);
      setShowRefreshBtn(true);
      navigate({
        // pathname: location.pathname,
        pathname: '/main/restaurants',
        search: `?query=${searchValue}`,
      });
    }
  };

  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      searchBtnClick();
    }
  };

  const userTab = () => {
    setUserOrLocation('유저');
    setSearchValue('');
    setValue(0);
    navigate(
      loginAccount.id !== undefined ? '/main/restaurants' : null
    );
  };

  const locationTab = () => {
    setUserOrLocation('장소');
    setSearchValue('');
    setValue(0);
    navigate(
      loginAccount.id !== undefined ? '/main/restaurants' : null
    );
  };

  const autoSearch = (e) => {
    setSearchValue(e.target.value);
    axios({
      method: 'get',
      url: `${API_URL}/account/search?query=${e.target.value}`,
    })
      .then((res) => {
        console.log('유저 검색!', res);
        setUserSearchInfos(res.data);
      })
      .catch((err) => {
        console.error('유저 검색ㅠㅠ', err);
      });
  };

  const subscribe = (userId) => {
    console.log('클릭!', userId);
    axios({
      method: 'post',
      url: `${API_URL}/subscription/${userId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log('구독 성공!', res);
      })
      .catch((err) => {
        console.error('구독 실패ㅠ', err);
      });
  };

  return (
    <div className={header.container}>
      <div className={header.headline}>
        <Link
          to={
            loginAccount.id !== undefined ? '/main/restaurants' : '/'
            // '/main/restaurants'
          }
          className={header}
          onClick={() => {
            setTimeout(() => {
              setRefresh(!refresh);
              setValue(0);
            }, 50);
            setSearchValue('');
          }}
        >
          <img
            src={imgLogo}
            alt="mainLogo"
            className={header.imgLogo}
          />
        </Link>
        <div className={header.searchBox}>
          <GlobalFilterModal />
          <div className={header.searchWrapper}>
            <SearchTwoToneIcon
              className={header.searchIcon}
              fontSize="medium"
              color="disabled"
              onClick={searchBtnClick}
            />
            {userOrLocation === '유저' ? (
              <input
                type="text"
                placeholder="사용자명"
                onKeyDown={(e) => activeEnter(e)}
                onChange={autoSearch}
                value={searchValue}
              />
            ) : (
              <input
                type="text"
                placeholder="가게명, 음식"
                onKeyDown={(e) => activeEnter(e)}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            )}
            {userOrLocation === '유저' &&
            searchValue &&
            userSearchInfos.length !== 0 ? (
              <div className={header.userResult}>
                {userSearchInfos.map((info) => (
                  <div
                    key={info.id}
                    className={header.userResultContainer}
                  >
                    <div className={header.userResultWrapper}>
                      <Link
                        to={
                          value === 0
                            ? `/main/users/${info.id}/restaurants`
                            : `/main/users/${info.id}/subscribe`
                        }
                        onClick={() => {
                          setSearchValue('');
                          setTimeout(() => {
                            setRefresh(!refresh);
                          }, 50);
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor:
                              'rgba(217, 217, 217, 0.4)',
                            padding: '3px',
                            border:
                              '1px solid rgba(217, 217, 217, 0.6)',
                          }}
                          src={`/assets/random/profile${info.picture}.png`}
                        />
                      </Link>
                      <div className={header.userResultInfo}>
                        <Link
                          to={
                            value === 0
                              ? `/main/users/${info.id}/restaurants`
                              : `/main/users/${info.id}/subscribe`
                          }
                          onClick={() => {
                            setSearchValue('');
                            setTimeout(() => {
                              setRefresh(!refresh);
                            }, 50);
                          }}
                        >
                          <h4>{info.nickname}</h4>
                        </Link>
                        <FavoriteIcon
                          sx={{ fontSize: 15, color: '#1db177' }}
                        />
                        &nbsp;&nbsp;<span>{info.follower}</span>
                      </div>
                    </div>
                    <AddCircleIcon
                      sx={{ color: '#1db177', fontSize: 32 }}
                      className={header.followBtn}
                      onClick={() => subscribe(info.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={header.none} />
            )}
          </div>
          {userOrLocation === '장소' ? (
            <div className={header.btnContainer}>
              <button
                type="button"
                className={header.activeBtn}
                onClick={locationTab}
              >
                장소
              </button>
              <button
                type="button"
                className={header.unactiveBtn}
                onClick={userTab}
              >
                유저
              </button>
            </div>
          ) : (
            <div className={header.btnContainer}>
              <button
                type="button"
                className={header.unactiveBtn}
                onClick={locationTab}
              >
                장소
              </button>
              <button
                type="button"
                className={header.activeBtn}
                onClick={userTab}
              >
                유저
              </button>
            </div>
          )}
        </div>
        <div className={header.userInfo}>
          {accessToken ? (
            <ul>
              {!isMyPage && (
                <IconButton
                  sx={{ marginRight: '1vw' }}
                  onClick={() => {
                    navigate('/main/restaurants');
                    setTimeout(() => {
                      setRefresh(!refresh);
                    }, 5);
                  }}
                >
                  <HomeIcon fontSize="large" color="disabled" />
                </IconButton>
              )}
              {/* <li>
                <NotiModal />
              </li> */}
              <li>
                <ProfileModal />
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <button
                  type="button"
                  className={header.loginBtn}
                  onClick={modalOpen}
                >
                  <Avatar sx={{ width: 20, height: 20 }} />
                  <span className={header.loginLink}>
                    로그인 및 회원가입
                  </span>
                </button>
                <LoginModal />
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className={header.userRank}>
        <Button
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          className={header.userRankLogo}
        >
          Top10
        </Button>
        {/* 화살표 아이콘 div로 감싸지 못하면 없애는게 나을거같음 */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography
            sx={{ p: 2, minHeight: '300px', minWidth: '200px' }}
          >
            <UserRankingModal
              setAnchorEl={setAnchorEl}
              accountRank={accountRank}
            />
          </Typography>
        </Popover>
        <div className={header.userRankInfo}>
          <Slider
            dots={false}
            infinite={settings.infinite}
            speed={settings.speed}
            slidesToShow={settings.slidesToShow}
            slidesToScroll={settings.slidesToScroll}
            arrows={settings.arrows}
            autoplay={settings.autoplay}
            autoplaySpeed={settings.autoplaySpeed}
            vertical={settings.vertical}
            pauseOnHover={settings.pauseOnHover}
          >
            {/* 순위 캐러셀 구현 */}
            {accountRank.map((x, index) => (
              <div key={x.id}>
                <span className={header.userRankIndex}>
                  {index + 1}
                </span>
                <span className={header.userRankName}>
                  {x.nickname}
                </span>
                <div className={header.userRankFollower}>
                  <FavoriteIcon
                    sx={{
                      color: 'rgba(29, 177, 119, 0.5)',
                      width: '1vw',
                    }}
                  />
                  <span>
                    {index === accountRank.length - 1
                      ? accountRank[0].follower
                      : accountRank[index + 1].follower}
                  </span>
                  {/* 이부분은 캐러셀이 자꾸 이전 순위를 보여줘서 배열을 조정해 줌 */}
                  <span />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Header;
