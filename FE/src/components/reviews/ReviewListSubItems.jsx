import {
  List,
  Avatar,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import fail from '../../assets/images/reviews/fail.png';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewListSubItems.module.css';
import userStore from '../../stores/userStore';

function ReviewListSubItems(props) {
  const { myReviewStore } = reviewStore();
  const { isMyPage } = userStore();
  const { id } = props;
  const { userID } = useParams();
  const navigate = useNavigate();
  const filteredSubItems = myReviewStore.filter(
    (x) => x.id === Number(id)
  );
  const [selectedListItem, setSelectedListItem] = useState();
  return (
    <div>
      <div className={styles.btn}>
        {isMyPage && (
          <Button
            type="submit"
            variant="text"
            onClick={(e) => {
              e.stopPropagation();
              navigate('write');
            }}
            sx={{
              color: 'rgba(55,55,55,0.7)',
              '&:hover': {
                backgroundColor: 'transparent', // 배경색을 투명하게 설정
              },
            }}
          >
            <EditIcon />
            기록하기
          </Button>
        )}
      </div>
      {filteredSubItems?.length > 0 ? (
        <div>
          <List>
            {filteredSubItems?.map((x, i) => (
              <ListItem
                key={[filteredSubItems[i].리뷰id]}
                className={`${styles.container} ${x.리뷰id === selectedListItem ? styles.selected : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(x.리뷰id, '번 상세페이지 클릭했음!');
                  navigate(`reviews/${x.리뷰id}`);
                  setSelectedListItem(x.리뷰id);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt="사진"
                    src={`/assets/random/profile${x.같이간친구[0]?.picture}.png`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={null}
                  secondary={
                    <Typography component="div">
                      <span className={styles.content}>
                        <span>
                          {x.내용.length > 10
                            ? `${x.내용.substring(0, 10)}...`
                            : x.내용}
                        </span>
                        <span>
                          {dayjs(x.방문한날짜).format('YYYY-MM-DD')}
                        </span>
                      </span>
                      <span className={styles.info}>
                        {x.같이간친구?.map((z, zI) =>
                          zI < x.같이간친구.length - 1 ? (
                            <span key={z.nickname}>
                              {z.nickname}
                              <span style={{ margin: '0 2px' }}>
                                |
                              </span>
                            </span>
                          ) : (
                            <span key={z.nickname}>{z.nickname}</span>
                          )
                        )}
                        {x.같이간친구.length > 0 &&
                          x.임의친구들.length > 0 && <span> | </span>}
                        {x.임의친구들?.map((y, yI) =>
                          yI < x.임의친구들.length - 1 ? (
                            <span key={y.name}>{y.name} | </span>
                          ) : (
                            <span key={y.name}>{y.name}</span>
                          )
                        )}
                      </span>
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          <div className={styles.btn}>
            {/* <IconButton> */}
            <ArrowDropUpIcon
              onClick={(e) => {
                e.stopPropagation();
                if (isMyPage) {
                  navigate('/main/restaurants');
                } else {
                  navigate(`/main/users/${userID}/restaurants`);
                }
              }}
              sx={{
                color: 'rgba(55,55,55,0.7)',
              }}
            />
            {/* </IconButton> */}
          </div>
        </div>
      ) : (
        <div className={styles.btn}>
          <img src={fail} alt="" width={75} />
        </div>
      )}
    </div>
  );
}

export default ReviewListSubItems;
