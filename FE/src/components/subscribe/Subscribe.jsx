import { Outlet } from 'react-router-dom';
import SubscribeSearch from './SubscribeSearch';
import FollowingTab from './FollowingTab';
// import Following from './Following';
// import Follower from './Follower';
import styles from '../../styles/subscribe/Subscribe.module.css';

function Subscribe() {
  return (
    <div>
      <SubscribeSearch />
      <FollowingTab />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
      {/* <Routes>
        <Route index path="/followings" element={<Following />} />
        <Route path="/followers" element={<Follower />} />
      </Routes> */}
    </div>
  );
}

export default Subscribe;
