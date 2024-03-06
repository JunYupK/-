import { Link } from 'react-router-dom';
import MyDongsanIconOn from '../../assets/images/sidebar/foodwhite.png';
import MyDongsanIconOff from '../../assets/images/sidebar/foodblack.png';
import FollowerIconOff from '../../assets/images/sidebar/heartblack.png';
import FollowerIconOn from '../../assets/images/sidebar/heartwhite.png';
import styles from '../../styles/foodmap/SideBar.module.css';
import reviewStore from '../../stores/reviewStore';

function SideBar() {
  const { value, setValue } = reviewStore();

  const reviewChange = () => {
    setValue(0);
  };

  const followerChange = () => {
    setValue(1);
  };

  return (
    <div>
      {value === 0 ? (
        <div>
          <div>
            <div className={styles.box}>
              <Link
                to="restaurants"
                onClick={reviewChange}
                style={{
                  textDecoration: 'none',
                }}
              >
                <img
                  src={MyDongsanIconOn}
                  alt="My동산 아이콘"
                  width={35}
                  style={{ position: 'relative', top: '5px' }}
                />
                <div
                  style={{
                    color: 'white',
                    fontSize: '14px',
                  }}
                >
                  My동산
                </div>
              </Link>
            </div>
            <div>
              <div className={styles.box2}>
                <Link
                  to="subscribe"
                  onClick={followerChange}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <div>
                    <img
                      src={FollowerIconOff}
                      alt="My동산 아이콘"
                      width={30}
                      style={{ position: 'relative', top: '10px' }}
                    />
                    <div
                      style={{
                        color: '#555558',
                        fontSize: '14px',
                        position: 'relative',
                        bottom: '-4px',
                      }}
                    >
                      팔로워
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className={styles.box2}>
              <Link
                to="restaurants"
                onClick={reviewChange}
                style={{
                  textDecoration: 'none',
                }}
              >
                <img
                  src={MyDongsanIconOff}
                  alt="My동산 아이콘"
                  width={35}
                  style={{ position: 'relative', top: '5px' }}
                />
                <div style={{ color: '#555558', fontSize: '14px' }}>
                  My동산
                </div>
              </Link>
            </div>
            <div>
              <div className={styles.box}>
                <Link
                  to="subscribe"
                  onClick={followerChange}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <div>
                    <img
                      src={FollowerIconOn}
                      alt="My동산 아이콘"
                      width={30}
                      style={{ position: 'relative', top: '10px' }}
                    />
                    <div
                      style={{
                        color: 'white',
                        fontSize: '14px',
                        position: 'relative',
                        bottom: '-4px',
                      }}
                    >
                      팔로워
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
