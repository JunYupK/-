import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
// import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import dongsan from '../../styles/modals/DongsanModal.module.css';
import dongsanStore from '../../stores/dongsanStore';
import urlStore from '../../stores/urlStore';
import userStore from '../../stores/userStore';
import globalFilterStore from '../../stores/globalFilterStore';

function DongsanModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    dongsanUsers,
    setDongsanUsers,
    // toggleDongsanUsersFilter,
    showRefreshBtn,
    setShowRefreshBtn,
  } = dongsanStore();
  const { API_URL } = urlStore();
  const { loginAccount } = userStore();
  const [spicyLevel, setSpicyLevel] = useState(0);
  const [bannedFoodList, setBannedFoodList] = useState([]);
  const [spicyWord, setSpicyWord] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [bannedFood, setBannedFood] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const { setSearchValue, setLocationFilterData } =
    globalFilterStore();

  const dongsanStatic = () => {
    console.log('동산 상태 분석!', dongsanUsers);
    setIsHidden(true);

    const comparedAccountIds = [];

    for (let i = 0; i < dongsanUsers.length; i += 1) {
      comparedAccountIds.push(dongsanUsers[i].id);
    }

    axios({
      method: 'post',
      url: `${API_URL}/comparison/statistics/${loginAccount.id}`,
      data: {
        comparedAccountIds,
      },
    })
      .then((res) => {
        console.log('동산 통계!', res);
        setSpicyLevel(res.data.spicyLevel);
        setBannedFoodList(res.data.bannedFoodList);
      })
      .catch((err) => {
        console.error('동산 통계ㅠㅠ', err);
      });
  };

  useEffect(() => {
    if (spicyLevel === 1) {
      setSpicyWord('신라면도 먹을 수 없어요');
    } else if (spicyLevel === 2) {
      setSpicyWord('신라면까지 먹을 수 있어요');
    } else if (spicyLevel === 3) {
      setSpicyWord('불닭볶음면까지 먹을 수 있어요');
    }

    if (bannedFoodList.length === 0) {
      setBannedFood('이 모임에서 못 먹는 음식은 없어요');
    } else {
      setBannedFood(
        `이 모임은 ${bannedFoodList.join()}(을/를) 못 먹어요`
      );
    }
  }, [spicyLevel, bannedFoodList]);

  useEffect(() => {
    const dongsanList = JSON.parse(
      localStorage.getItem('DONGSAN_LIST')
    );

    // 사용자 정보 받아오기
    const fetchUserData = async () => {
      const modalList = [];
      try {
        for (let i = 0; i < dongsanList.length; i += 1) {
          console.log('동산 상태', dongsanList[i]);
          // eslint-disable-next-line no-await-in-loop
          const response = await axios.get(
            `${API_URL}/account/${dongsanList[i].comparedAccountId}`
          );
          console.log('동산 모달의 유저정보', response);

          // eslint-disable-next-line max-depth
          if (dongsanList[i].isHidden === 1) {
            modalList.push({
              id: dongsanList[i].comparedAccountId,
              nickname: response.data.nickname,
              picture: response.data.picture,
              filter: false,
            });
          } else {
            modalList.push({
              id: dongsanList[i].comparedAccountId,
              nickname: response.data.nickname,
              picture: response.data.picture,
              filter: true,
            });
          }
          console.log('동산 유저 상태', dongsanUsers);
        }
        return modalList;
      } catch (error) {
        console.error('유저 정보 받아오기 오류', error);
        return [];
      }
    };

    fetchUserData().then((modalList) => setDongsanUsers(modalList));
  }, [location]);

  const storageRemove = (index) => {
    const storage = JSON.parse(localStorage.getItem('DONGSAN_LIST'));
    storage.splice(index, 1);
    localStorage.setItem('DONGSAN_LIST', JSON.stringify(storage));
  };
  console.log(dongsanUsers, '현재 동산 상태');
  console.log('showTooltip 상태', showTooltip);

  const refreshBtnClick = () => {
    setShowRefreshBtn(false);
    setSearchValue('');
    setLocationFilterData([]);
    navigate('/main/restaurants');
    const temp = [...dongsanUsers];
    setDongsanUsers(temp);
  };

  return (
    <div>
      {isHidden ? (
        <div className={dongsan.staticBox}>
          <CloseIcon
            onClick={() => {
              setIsHidden(false);
            }}
            sx={{
              position: 'absolute',
              right: '5px',
              top: '2px',
              width: '18px',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
          <p>이 모임은 {spicyWord}</p>
          <p>{bannedFood}</p>
        </div>
      ) : (
        <div className={dongsan.none} />
      )}
      {loginAccount.id !== undefined && (
        <div className={dongsan.box}>
          <div className={dongsan.title}>
            {showRefreshBtn && (
              <div
                className={dongsan.refreshBtn}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <RefreshIcon onClick={() => refreshBtnClick()} />
                {showTooltip && (
                  <div className={dongsan.tooltip}>
                    동산 유저의 맛집으로 돌아가고 싶으면 클릭하세요
                  </div>
                )}
              </div>
            )}
            <span>동산</span>
            <button
              type="button"
              className={dongsan.staticBtn}
              onClick={() => {
                dongsanStatic();
              }}
            >
              분석
            </button>
            <button
              type="button"
              onClick={() => {
                setDongsanUsers([
                  {
                    id: loginAccount.id,
                    nickname: loginAccount.nickname,
                    picture: loginAccount.picture,
                    filter: true,
                  }, // 로그인 기능 구현 되면 로그인 유저의 nickname, followers, id 가져오기
                ]);
                localStorage.setItem(
                  'DONGSAN_LIST',
                  JSON.stringify([
                    {
                      comparedAccountId: loginAccount.id,
                      isHidden: 0,
                    },
                  ])
                );
              }}
            >
              모두 비우기
            </button>
          </div>
          <hr className={dongsan.line} />
          <div className={dongsan.content}>
            {dongsanUsers.map((dongsanUser, index) => (
              <div key={dongsanUser.nickname}>
                <div className={dongsan.profile}>
                  {/* {dongsanUser.filter ? (
                  <VisibilityIcon
                    onClick={() => {
                      toggleDongsanUsersFilter(index);
                    }}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => {
                      toggleDongsanUsersFilter(index);
                    }}
                  />
                )} */}

                  <img
                    src={
                      index === 0
                        ? `/assets/random/profile${loginAccount.picture}.png`
                        : `/assets/random/profile${dongsanUser.picture}.png`
                    }
                    alt="유저 아바타"
                    className={dongsan.avatar}
                  />

                  {/* <Avatar
                  sx={{ width: 24, height: 24 }}
                  className={dongsan.avatar}
                /> */}
                  <span>{dongsanUser.nickname}</span>
                  {/* <div className={dongsan.colorCheck} /> */}
                  <DoDisturbOnOutlinedIcon
                    color={index !== 0 ? 'error' : 'success'}
                    className={dongsan.cancel}
                    onClick={() => {
                      console.log(dongsanUsers, '현재동산상태');
                      const copy = [...dongsanUsers];
                      if (index === 0) {
                        console.log('자기자신은 삭제할 수 없습니다.');
                      } else {
                        setDongsanUsers(
                          copy.filter(
                            (x) => x.nickname !== dongsanUser.nickname
                          )
                        );
                        storageRemove(index);
                      }
                    }}
                  />
                </div>
                <hr className={dongsan.line} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DongsanModal;
