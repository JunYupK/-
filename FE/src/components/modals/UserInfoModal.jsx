import { IconButton, Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import styles from '../../styles/modals/UserInfoModal.module.css';
import urlStore from '../../stores/urlStore';
import userStore from '../../stores/userStore';

function UserInfoModal() {
  const { API_URL } = urlStore();
  const { userID } = useParams();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState();
  const { accessToken, loginAccount } = userStore();
  const [followButtonClick, setFollowButtonClick] =
    useState(undefined);
  useEffect(() => {
    const url = `${API_URL}/account/${userID}`;
    axios
      .get(url)
      .then((response) => {
        console.log('요청 성공:', response.data);
        setUserInfo(response.data);
        // 성공 시 필요한 작업 수행
      })
      .catch((error) => {
        console.error('요청 실패:', error);
        // 실패 시 에러 처리
      });
  }, [location, followButtonClick]);
  useEffect(() => {
    axios({
      method: 'get',
      url: `${API_URL}/subscription/${loginAccount.id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.data.find((x) => x.id === Number(userID))) {
          setFollowButtonClick(true);
        } else {
          setFollowButtonClick(false);
        }
        console.log(response.data, '구독버튼 눌렀습니다');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);
  return (
    <div>
      {followButtonClick !== undefined && (
        <div className={styles.box}>
          <div className={styles.avatar}>
            <Avatar
              sx={{ width: '100px', height: '100px' }}
              src={`/assets/random/profile${userInfo?.picture}.png`}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.nickname}>
              {userInfo?.nickname}
            </div>
            <div className={styles.follower}>
              <FavoriteIcon
                sx={{
                  color: 'rgba(29, 177, 119, 0.5)',
                  width: '1vw',
                }}
              />
              {userInfo?.follower}
            </div>
            <div>
              {!followButtonClick ? (
                <IconButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    console.log('팔로우 하는 기능 만들어야함');
                    if (Number(userID) === Number(loginAccount.id)) {
                      Swal.fire({
                        icon: 'error',
                        title: '오류',
                        text: '나 자신을 팔로우할 수 없습니다!',
                        confirmButtonColor: '#1db177',
                      });
                      return;
                    }
                    axios({
                      method: 'post',
                      url: `${API_URL}/subscription/${userID}`,
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                      },
                    })
                      .then((response) => {
                        console.log('요청 성공:', response.data);
                        setFollowButtonClick(!followButtonClick);
                        // 성공 시 필요한 작업 수행
                      })
                      .catch((error) => {
                        console.error('요청 실패:', error);
                        // 실패 시 에러 처리
                      });
                  }}
                  style={{
                    backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
                    color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
                    fontSize: '15px', // 버튼의 글자 크기를 조절
                    padding: '2px 20px', // 버튼의 내부 여백을 조절
                    borderRadius: '40px',
                  }}
                  className={styles.footer}
                >
                  팔로우
                </IconButton>
              ) : (
                <IconButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    console.log('팔로우 하는 기능 만들어야함');
                    axios({
                      method: 'delete',
                      url: `${API_URL}/subscription/${userID}`,
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                      },
                    })
                      .then((response) => {
                        console.log('요청 성공:', response.data);
                        setFollowButtonClick(!followButtonClick);
                      })
                      .catch((error) => {
                        console.error('요청 실패:', error);
                        // 실패 시 에러 처리
                      });
                  }}
                  style={{
                    backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
                    color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
                    fontSize: '15px', // 버튼의 글자 크기를 조절
                    padding: '2px 20px', // 버튼의 내부 여백을 조절
                    borderRadius: '40px',
                  }}
                  className={styles.footer}
                >
                  언팔로우
                </IconButton>
              )}
            </div>
          </div>
        </div>
      )}
      {loginAccount.id === undefined && (
        <div className={styles.box}>
          <div className={styles.avatar}>
            <Avatar
              sx={{ width: '100px', height: '100px' }}
              src={`/assets/random/profile${userInfo?.picture}.png`}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.nickname}>
              {userInfo?.nickname}
            </div>
            <div className={styles.follower}>
              <FavoriteIcon
                sx={{
                  color: 'rgba(29, 177, 119, 0.5)',
                  width: '1vw',
                }}
              />
              {userInfo?.follower}
            </div>
            <div>
              <IconButton
                type="button"
                variant="contained"
                style={{
                  backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
                  color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
                  fontSize: '15px', // 버튼의 글자 크기를 조절
                  padding: '2px 20px', // 버튼의 내부 여백을 조절
                  borderRadius: '40px',
                }}
                onClick={() => {
                  Swal.fire({
                    icon: 'warning',
                    title: '로그인이 필요합니다',
                    confirmButtonText: '확인',
                    confirmButtonColor: '#1db177',
                    customClass: {
                      confirmButton: 'custom-confirm-button',
                    },
                  });
                }}
                className={styles.footer}
              >
                팔로우
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfoModal;
