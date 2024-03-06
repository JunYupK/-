import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import styles from '../../styles/modals/UserRankingModal.module.css';
import reviewStore from '../../stores/reviewStore';

function UserRankingModal(props) {
  const { refresh, setRefresh, value } = reviewStore();
  const { accountRank, setAnchorEl } = props;
  return (
    <div className={styles.wrapper}>
      {accountRank.map((x, i) => (
        <div key={x.id}>
          <div className={styles.content}>
            <div>
              <span className={styles.rank}>{i + 1}.</span>
              <Link
                to={
                  value === 0
                    ? `/main/users/${x.id}/restaurants`
                    : `/main/users/${x.id}/subscribe`
                }
                onClick={() => {
                  setAnchorEl(null);
                  setTimeout(() => {
                    setRefresh(!refresh);
                  }, 50);
                }}
                style={{ textDecoration: 'none' }}
              >
                <span className={styles.name}>{x.nickname}</span>
              </Link>
            </div>
            <span className={styles.follower}>
              <FavoriteIcon
                sx={{
                  color: 'rgba(29, 177, 119, 0.5)',
                  width: '1vw',
                }}
              />
              {x.follower}
            </span>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserRankingModal;
