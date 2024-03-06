import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import styles from '../../styles/modals/ReviewRegistrationFriendTagModal.module.css';

function ReviewWriteFriendAdd(props) {
  const {
    임의친구이름수정,
    임의친구이름,
    임의친구생년,
    임의친구생년수정,
    임의친구들,
    임의친구들수정,
    클릭버튼,
    클릭버튼수정,
  } = props;
  return (
    <div>
      <div>
        <div className={styles.wrapper}>
          <TextField
            id="standard-basic"
            variant="outlined"
            size="small"
            placeholder="이름"
            autoComplete="off"
            sx={{
              margin: '10px',
              '& .MuiOutlinedInput-root': {
                height: '53px',
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(29, 177, 119, 0.5)',
                },
              },
            }}
            onChange={(e) => {
              임의친구이름수정(e.target.value);
              console.log(임의친구이름);
              console.log('임의 친구 추가중입니다');
            }}
            color="success"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              sx={{
                '&::-webkit-scrollbar': {
                  display: 'none', // 스크롤바를 숨깁니다.
                },
              }}
              components={['DatePicker']}
            >
              <DatePicker
                views={['year']}
                openTo="year"
                size="small"
                label="생년"
                maxDate={dayjs(dayjs().format('YYYY-MM-DD'))}
                sx={{
                  '& .MuiInputBase-root': {
                    // 입력 텍스트 스타일을 조정하는 부분입니다.
                    width: '6.5vw', // 입력 텍스트 너비를 조절합니다.
                  },
                  '& .MuiStack-root': {
                    overflow: 'hidden', // 입력 텍스트 너비를 조절합니다.
                  },
                  margin: '10px',
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
                value={임의친구생년}
                onChange={(newValue) => {
                  임의친구생년수정(newValue);
                  if (임의친구생년)
                    console.log('시작 날짜 변경됨!', 임의친구생년.$y);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <IconButton
            onClick={() => {
              if (임의친구이름 && 임의친구생년) {
                console.log('임의친구추가버튼이 클릭되었습니다!');
                console.log(임의친구이름, 임의친구생년.$y);
                const copy = [...임의친구들];
                copy.push({
                  name: 임의친구이름,
                  birthYear: String(임의친구생년.$y),
                });
                임의친구이름수정('');
                임의친구들수정(copy);
                클릭버튼수정(!클릭버튼);
              }
            }}
            sx={{
              margin: '10px',
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ReviewWriteFriendAdd;
