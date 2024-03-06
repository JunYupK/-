import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import Swal from 'sweetalert2';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewRegistration.module.css';
import content from '../../styles/foodmap/FoodMapView.module.css';
import ReviewRegistrationFriendTagModal from '../modals/ReviewRegistrationFriendTagModal';
import urlStore from '../../stores/urlStore';
import userStore from '../../stores/userStore';
import angel from '../../assets/images/reviews/angel.png';

function ReviewRegistration() {
  const { loginAccount } = userStore();
  // const [가게이름, 가게이름수정] = useState('');
  const [친절도, 친절도수정] = useState(0);
  const [맛, 맛수정] = useState(0);
  const [내용, 내용수정] = useState('');
  const [같이간친구, 같이간친구수정] = useState([]);
  const [임의친구이름, 임의친구이름수정] = useState('');
  const [임의친구생년, 임의친구생년수정] = useState(
    dayjs(dayjs().format('YYYY-MM-DD'))
  );
  const [방문날짜, 방문날짜수정] = useState(
    dayjs(dayjs().format('YYYY-MM-DD'))
  );
  console.log(loginAccount);
  const [임의친구들, 임의친구들수정] = useState([]);
  const [선택한계정친구들, 선택한계정친구들수정] = useState([]);
  const [전체친구, 전체친구수정] = useState([]);
  const { setRefresh, refresh } = reviewStore();
  const { API_URL } = urlStore();
  useEffect(
    () => () => {
      console.log('기록페이지 언마운트 됨!'); // Axios 요청을 보내서 리뷰 리스트를 갱신할 예정입니다 (useEffect 안에 적는 코드들은 어려운 연산 / 서버에서 데이터 가져오는 작업),
      // 따라서 Dependency에 []를 넣고 unmount 됐을때 한번만 처리할 예정입니다
      임의친구들수정([]);
    },
    []
  );
  const { restaurantStore } = reviewStore();
  const { restaurantID } = useParams();
  const [레스토랑아이디, 레스토랑아이디수정] = useState();
  useEffect(() => {
    // useparams에 restaurantID가 있을 경우에 레스토랑 아이디를 할당함
    if (restaurantID !== undefined) {
      레스토랑아이디수정(restaurantID);
    }
  });
  const [클릭버튼, 클릭버튼수정] = useState(false);
  const navigate = useNavigate();
  const handleAutocompleteChange = (event, selectedOptions) => {
    // 선택된 항목을 setSelectedFriend 함수의 인자로 전달
    console.log(selectedOptions);
    같이간친구수정(
      selectedOptions?.map((option) => ({
        name: option.title,
        picture: option.picture,
      }))
    );
    선택한계정친구들수정(
      selectedOptions?.map((option) => ({
        id: option.id,
      }))
    );
    console.log(같이간친구);
  };
  const filteredShop = restaurantStore.find(
    (x) => x.id === Number(레스토랑아이디)
  );

  const restaurants = restaurantStore.map((x) => ({
    label: x.가게이름,
  }));
  // console.log(레스토랑아이디, '레스토랑ID임!');
  useEffect(() => {
    axios //
      .get(`${API_URL}/subscription/${loginAccount.id}`) // 1에서 로그인한 아이디로 수정
      .then((response) => {
        console.log('팔로워 요청 성공:', response.data);
        전체친구수정(
          response.data?.map((x) => ({
            title: x.nickname,
            id: x.id,
            picture: x.picture,
          }))
        );
        // 성공 시 필요한 작업 수행
      })
      .catch((error) => {
        console.error('팔로워 요청 실패:', error);
        // 실패 시 에러 처리
      });
  }, []);
  // const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => _${letter.toLowerCase()});
  return (
    <div>
      <div className={content.hiddenSpace}>
        <div className={styles.container}>
          <div>
            <div className={styles.header}>
              {restaurantID == null ? (
                <Autocomplete
                  disablePortal
                  disableClearable
                  id="combo-box-demo"
                  options={restaurants.map((option) => option.label)}
                  onChange={(e, name) => {
                    const autoCompletedShop = restaurantStore.find(
                      (x) => x.가게이름 === name
                    );
                    레스토랑아이디수정(autoCompletedShop.id);
                    console.log(
                      레스토랑아이디,
                      '오토컴플릿에서 선택해서 기록하려고함!, params가 null임!'
                    );
                  }}
                  sx={{
                    width: 'auto',
                    height: 50,
                    marginTop: '2vh',
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                          borderColor: 'rgba(29, 177, 119, 0.5)', // 클릭되었을 때 테두리 색상
                        },
                    },
                    '& .MuiInputLabel-outlined.MuiInputLabel-shrink':
                      {
                        color: 'rgba(29, 177, 119, 0.5)', // 텍스트가 상단으로 이동할 때의 색상
                      },
                  }}
                  renderInput={(params) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <TextField {...params} label="가게이름" />
                  )}
                />
              ) : (
                <div>{filteredShop?.가게이름}</div>
              )}

              <CloseIcon
                onClick={() => {
                  navigate('/main/restaurants');
                }}
                sx={{
                  position: 'absolute',
                  right: '1vw',
                  top: '2vh',
                  width: '18px',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              />
            </div>
            <hr />
            <div className={styles.rating}>
              {/* <div>
              <img src={employee} alt="" width={50} />
            </div> */}
              <div>
                <Typography
                  component="legend"
                  sx={{ color: 'rgba(55,55,55,0.7)' }}
                >
                  친절
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={친절도}
                  onChange={(event, newValue) => {
                    친절도수정(Number(newValue));
                    console.log('친절도 선택되었습니다!');
                    console.log(친절도);
                  }}
                  sx={{ color: 'rgba(29, 177, 119, 0.7)' }}
                />
              </div>
            </div>
            <div className={styles.rating}>
              {/* <img src={tongue} alt="" width={50} /> */}
              <div>
                <Typography
                  component="legend"
                  sx={{ color: 'rgba(55,55,55,0.7)' }}
                >
                  맛
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={맛}
                  onChange={(event, newValue) => {
                    맛수정(Number(newValue));
                    console.log('맛 선택되었습니다!');
                    console.log(맛);
                  }}
                  sx={{ color: 'rgba(29, 177, 119, 0.7)' }}
                />
              </div>
            </div>
            {맛 > 4 && 친절도 > 4 && (
              <div className={styles.angel}>
                <img src={angel} alt="" width={100} />
              </div>
            )}
            <TextField
              id="outlined-multiline-static"
              label=""
              multiline
              rows={20}
              fullWidth
              className={styles.textFieldStyle}
              placeholder="당신의 이야기를 남기세요...."
              onChange={(e) => {
                내용수정(e.target.value);
                console.log(내용);
                console.log('내용 수정 했습니다!');
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(29, 177, 119, 0.5)',
                  }, // 텍스트필드 색상 바꾸는 CSS
                },
                '& input::placeholder': {
                  textAlign: 'center',
                  marginRight: '30px',
                },
              }}
            />
            <hr />
            <Typography
              component="legend"
              sx={{ color: 'rgba(55,55,55,0.7)' }}
            >
              같이 방문한 친구
            </Typography>
            <div className={styles.friend}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={전체친구}
                getOptionLabel={(option) => option.title}
                size="small"
                filterSelectedOptions
                onChange={handleAutocompleteChange}
                sx={{
                  width: 300,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: 'rgba(29, 177, 119, 0.5)', // 클릭되었을 때 테두리 색상
                      },
                  },
                  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                    color: 'rgba(29, 177, 119, 0.5)', // 텍스트가 상단으로 이동할 때의 색상
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    label="검색"
                    placeholder=""
                    sx={{
                      textAlign: 'center',
                      display: 'block',
                    }}
                  />
                )}
              />
              <Button
                type="button"
                variant="contained"
                size="small"
                sx={{ width: '100px' }}
                onClick={() => {
                  클릭버튼수정(!클릭버튼);
                }}
                style={{
                  backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
                  color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
                  fontSize: '0.5rem', // 버튼의 글자 크기를 조절
                  borderRadius: '5px',
                  marginLeft: '30px',
                  maxHeight: '30px',
                }}
              >
                계정없는친구
              </Button>
              <img src="" alt="" />
            </div>
            <div>
              {같이간친구.map((x) => (
                <div className={styles.content}>
                  <Avatar
                    alt="Remy Sharp"
                    src={`/assets/random/profile${x.picture}.png`}
                    sx={{
                      backgroundColor: 'rgba(29, 177, 119, 0.3)',
                    }}
                  />
                  <p className={styles.item}>{x.name}</p>
                  <hr />
                </div>
              ))}
            </div>
            {클릭버튼 ? (
              <ReviewRegistrationFriendTagModal
                임의친구이름={임의친구이름}
                임의친구이름수정={임의친구이름수정}
                임의친구생년={임의친구생년}
                임의친구생년수정={임의친구생년수정}
                임의친구들={임의친구들}
                임의친구들수정={임의친구들수정}
                클릭버튼={클릭버튼}
                클릭버튼수정={클릭버튼수정}
              />
            ) : null}
            <hr />
            <Typography
              component="legend"
              sx={{ color: 'rgba(55,55,55,0.7)' }}
            >
              계정 없는 친구 태그
            </Typography>
            <div className={styles.tag}>
              {임의친구들.map((x, i) => (
                <div key={x[i]}>
                  <span className={styles.item}>{x.name}</span>
                  <span>/</span>
                  <span>{x.birthYear}</span>
                  <IconButton
                    onClick={() => {
                      const 수정된임의친구들 = 임의친구들.filter(
                        (y) => y.name !== x.name
                      );
                      임의친구들수정(수정된임의친구들);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              ))}
            </div>
            <hr />
            <Typography
              component="legend"
              sx={{ color: 'rgba(55,55,55,0.7)' }}
            >
              방문한 날짜
            </Typography>
            <div className={styles.date}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    size="small"
                    label="방문 날짜"
                    value={방문날짜}
                    maxDate={dayjs(dayjs().format('YYYY-MM-DD'))}
                    onChange={(newValue) => {
                      방문날짜수정(newValue);
                      console.log('방문 날짜 변경됨!', 방문날짜.$d);
                    }}
                    sx={{
                      margin: '10px',
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            borderColor: 'rgba(29, 177, 119, 0.5)', // 클릭되었을 때 테두리 색상
                          },
                      },
                      '& .MuiInputLabel-outlined.MuiInputLabel-shrink':
                        {
                          color: 'rgba(29, 177, 119, 0.5)', // 텍스트가 상단으로 이동할 때의 색상
                        },
                      '& .MuiButtonBase-root-MuiPickersDay-root': {
                        backgroundColor: 'green', // 선택된 날짜의 동그라미 색상
                        color: 'white', // 선택된 날짜의 텍스트 색상
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <hr />
            <Button
              type="button"
              variant="contained"
              size="large"
              sx={{ width: '100px' }}
              onClick={() => {
                console.log(
                  `${방문날짜.$y}-${방문날짜.$M + 1 >= 10 ? 방문날짜.$M + 1 : `0${방문날짜.$M + 1}`}-${방문날짜.$D >= 10 ? 방문날짜.$D : `0${방문날짜.$D}`}`
                );
                const requestData = {
                  kindnessRating: 친절도,
                  tasteRating: 맛,
                  content: 내용,
                  visitDate: `${방문날짜.$y}-${방문날짜.$M + 1 >= 10 ? 방문날짜.$M + 1 : `0${방문날짜.$M + 1}`}-${방문날짜.$D >= 10 ? 방문날짜.$D : `0${방문날짜.$D}`}`,
                  restaurantId: Number(레스토랑아이디),
                  accountReviews: 선택한계정친구들,
                  reviewPersonTags: 임의친구들,
                };
                console.log('리뷰 전송하는 ID임!', 레스토랑아이디);
                console.log('방문날짜 어떻게 될까!', 방문날짜);
                setTimeout(() => {
                  setRefresh(!refresh);
                }, 5);
                navigate(`/main/restaurants/${레스토랑아이디}`);
                const url = `${API_URL}/review/${loginAccount.id}`;
                axios
                  .post(url, requestData)
                  .then((response) => {
                    console.log('요청 성공:', response.data);
                    // 성공 시 필요한 작업 수행
                    Swal.fire({
                      title: '저장 완료!',
                      text: '데이터가 성공적으로 저장되었습니다.',
                      icon: 'success',
                      confirmButtonText: '확인',
                      confirmButtonColor: '#1db177',
                    });
                  })
                  .catch((error) => {
                    console.error('요청 실패:', error);
                    // 실패 시 에러 처리
                    Swal.fire({
                      title: '저장 실패!',
                      text: '데이터 저장에 실패하였습니다.',
                      icon: 'error',
                      confirmButtonText: '확인',
                      confirmButtonColor: '#1db177',
                    });
                  });
              }}
              style={{
                backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
                color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
                fontSize: '1rem', // 버튼의 글자 크기를 조절
                padding: '5px 30px', // 버튼의 내부 여백을 조절
                borderRadius: '20px',
              }}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewRegistration;
