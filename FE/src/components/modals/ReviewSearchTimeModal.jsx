import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import styles from '../../styles/modals/ReviewSearchTime.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';

function ReviewsSearchTime(props) {
  const { whatIsClicked, setClicked } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          if (whatIsClicked === 4) {
            setClicked(0);
          } else {
            setClicked(4);
          }
        }}
        size="small"
        variant="contained"
        style={{
          borderRadius: '20px',
          backgroundColor:
            whatIsClicked === 4
              ? 'rgba(29, 177, 119, 0.7)'
              : '#ffffff',
          color: whatIsClicked === 4 ? '#FFFFFF' : '#555558',
          paddingTop: '0px',
          paddingBottom: '0px',
          marginLeft: '3px',
          marginRight: '3px',
        }}
      >
        날짜
        <ExpandMoreIcon sx={{ width: '10px' }} />
      </Button>
    </span>
  );
}
function TimeModal() {
  const {
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
  } = reviewFilterStore();
  return (
    <div className={styles.wrapper}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            size="small"
            label="시작 날짜"
            value={selectedStartDate}
            maxDate={dayjs(dayjs().format('YYYY-MM-DD'))}
            onChange={(newValue) => {
              setSelectedStartDate(newValue);
              console.log('시작 날짜 변경됨!', selectedStartDate.$d);
            }}
            sx={{
              width: '10vw',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(29, 177, 119, 0.5)', // 클릭되었을 때 테두리 색상
                },
              },
              '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                color: 'rgba(29, 177, 119, 0.5)', // 텍스트가 상단으로 이동할 때의 색상
              },
            }}
          />
          <DatePicker
            label="종료 날짜"
            value={selectedEndDate}
            minDate={selectedStartDate}
            maxDate={dayjs(dayjs().format('YYYY-MM-DD'))}
            onChange={(newValue) => {
              setSelectedEndDate(newValue);
              console.log('종료 날짜 변경됨!', selectedEndDate.$d);
            }}
            sx={{
              width: '10vw',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(29, 177, 119, 0.5)', // 클릭되었을 때 테두리 색상
                },
              },
              '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                color: 'rgba(29, 177, 119, 0.5)', // 텍스트가 상단으로 이동할 때의 색상
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <div className={styles.aside}>
        <span>
          {`${selectedStartDate.$y}-${selectedStartDate.$M + 1 >= 10 ? selectedStartDate.$M + 1 : `0${selectedStartDate.$M + 1}`}-${selectedStartDate.$D >= 10 ? selectedStartDate.$D : `0${selectedStartDate.$D}`}`}
        </span>
        <span>-</span>
        <span>
          {`${selectedEndDate.$y}-${selectedEndDate.$M + 1 >= 10 ? selectedEndDate.$M + 1 : `0${selectedEndDate.$M + 1}`}-${selectedEndDate.$D >= 10 ? selectedEndDate.$D : `0${selectedEndDate.$D}`}`}
        </span>
      </div>
    </div>
  );
}
export { TimeModal, ReviewsSearchTime };
