import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import StartView from './views/StartView';
import FoodMapView from './views/FoodMapView';
import SignupView from './views/SignupView';
import EditProfileView from './views/EditProfileView';
import SocialLogin from './components/accounts/SocialLogin';
// import KakaoLogin from './components/accounts/KakaoLogin';

const theme = createTheme({
  typography: {
    fontFamily: 'KoPubWorld-Dotum-Medium',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* 로그인 했을 때는 이 레이아웃으로 */}
        <Route path="/main/*" element={<FoodMapView />} />
        {/* 다른사람 페이지는 이 레이아웃으로 */}
        <Route
          path="/main/users/:userID/*"
          element={<FoodMapView />}
        />
        {/* 로그인 하지않았을 때는 이 레이아웃으로 */}
        <Route path="*" element={<StartView />} />
        {/* <Route path="/oauth2/kakao" element={<KakaoLogin />} /> */}
        <Route path="/sociallogin" element={<SocialLogin />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/editprofile" element={<EditProfileView />} />
      </Routes>
    </ThemeProvider>
  );
}
export default App;
