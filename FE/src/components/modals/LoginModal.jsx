import { Button, Modal, Box } from '@mui/material';
// import { Route, Routes } from 'react-router-dom';
import styles from '../../styles/start/StartView.module.css';
import imgLogo from '../../assets/images/logo.png';
import kakaoLogo from '../../assets/images/login/kakao.png';
import userStore from '../../stores/userStore';
import urlStore from '../../stores/urlStore';
// import Redirect from '../accounts/Redirect';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid rgba(29, 177, 119, 0.7)',
  boxShadow: 20,
  p: 4,
  borderRadius: '10px',
};

function LoginModal() {
  const { loginModalOpen, setLoginModalOpen } = userStore();
  const { KAKAO_URL } = urlStore();

  const handleClose = () => setLoginModalOpen(false);
  // 카카오 로그인(테스트)
  // const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  // const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // 이게 원래꺼
  const frontendUrl = `${window.location.protocol}//${window.location.host}`;
  const KAKAO_AUTH_URL = `${KAKAO_URL}/auth/authorize/kakao?redirect_url=${frontendUrl}`;

  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Modal
      open={loginModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.loginBox} sx={style}>
        <div className={styles.loginText}>LOGIN</div>
        <img
          src={imgLogo}
          alt="mainLogo"
          className={styles.loginLogo}
        />
        <div className={styles.loginMinitext}>
          장소를 소장하다, 나의 맛집 기록
        </div>
        <Button
          onClick={loginHandler}
          sx={{
            width: '300px',
            height: '50px',
            margin: '10px',
            boxShadow: '1px 1px 2px 0px gray',
            backgroundColor: 'rgba(250, 227, 0, 0.5)',
            color: 'black',
            ':hover': {
              backgroundColor: 'rgba(250, 227, 0, 0.7)',
              // color: 'rgba(250, 227, 0, 0.8)',
            },
          }}
        >
          <img
            src={kakaoLogo}
            alt="kakaoLogo"
            className={styles.kakaoLogo}
          />
          카카오 계정으로 로그인하기
        </Button>
      </Box>
      {/* <Routes>
        
      </Routes> */}
    </Modal>
  );
}

export default LoginModal;
