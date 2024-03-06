import axios from 'axios';
import { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../../styles/start/StartView.module.css';
import urlStore from '../../stores/urlStore';

function StartFooter() {
  const { API_URL } = urlStore();
  const url = `${API_URL}/account/rank`;
  const [accountRank, setAccountRank] = useState([]);
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log('요청 성공:', response.data);
        setAccountRank(response.data);
        // 성공 시 필요한 작업 수행
      })
      .catch((error) => {
        console.error('요청 실패:', error);
        // 실패 시 에러 처리
      });
    console.log(accountRank);
  }, []);
  return (
    <div className={styles.footer}>
      <div className={styles.topText}>Top 10</div>
      <div className={styles.topBox}>
        {accountRank.map((account, index) => (
          <div className={styles.topArticle} key={account.nickname}>
            <div className={styles.topRank}>{index + 1}</div>
            {/* <div className={styles.topContent}> */}
            <div>
              <Link to={`/main/users/${account.id}/restaurants`}>
                <Avatar
                  className={styles.topProfile}
                  src={`/assets/random/profile${account.picture}.png`}
                />
              </Link>
            </div>
            <div className={styles.topNickname}>
              {account.nickname}
            </div>
            <div className={styles.topFollower}>
              ❤ {account.follower}
            </div>
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StartFooter;
