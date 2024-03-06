import { TextField, InputAdornment, IconButton } from '@mui/material';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
// import axios from 'axios';
import {
  ReviewsSearchTogether,
  TogetherModal,
} from '../modals/ReviewSearchTogetherModal';
import {
  ReviewsSearchBusinessTypes,
  StoreModal,
} from '../modals/ReviewSearchBusinessTypesModal';
import {
  ReviewsSearchLocation,
  LocationModal,
} from '../modals/ReviewSearchLocationModal';
import {
  TimeModal,
  ReviewsSearchTime,
} from '../modals/ReviewSearchTimeModal';
import styles from '../../styles/reviews/ReviewSearch.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';
// import userStore from '../../stores/userStore';
// import urlStore from '../../stores/urlStore';

function ReviewsSearch() {
  // const { API_URL } = urlStore();
  // const { loginAccount } = userStore();
  const [whatIsClicked, setClicked] = useState(0);
  const { setSearchKeyWord, searchKeyWord } = reviewFilterStore();
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('엔터버튼 눌렀음!');
      console.log(searchKeyWord);
    }
  };
  return (
    <div className={styles.wrapper}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="가게 이름으로 리뷰 검색"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 30,
            backgroundColor: '#f4f2f2',
            color: '#b9b9b9',
            marginBottom: '20px',
            height: '40px',
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(29, 177, 119, 0.5)',
            },
          },
          '& input::placeholder': {
            textAlign: 'center',
            marginRight: '30px',
          },
        }}
        onKeyPress={handleKeyPress}
        onChange={(e) => {
          setSearchKeyWord(e.target.value);
        }}
        InputProps={{
          autoComplete: 'off',
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  console.log(searchKeyWord);
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <br />
      <div className={styles.footer}>
        <ReviewsSearchTogether
          whatIsClicked={whatIsClicked}
          setClicked={setClicked}
        />
        <ReviewsSearchBusinessTypes
          whatIsClicked={whatIsClicked}
          setClicked={setClicked}
        />
        <ReviewsSearchLocation
          whatIsClicked={whatIsClicked}
          setClicked={setClicked}
        />
        <ReviewsSearchTime
          whatIsClicked={whatIsClicked}
          setClicked={setClicked}
        />
      </div>
      {whatIsClicked === 1 ? (
        <TogetherModal whatIsClicked={whatIsClicked} />
      ) : null}
      {whatIsClicked === 2 ? <StoreModal /> : null}
      {whatIsClicked === 3 ? <LocationModal /> : null}
      {whatIsClicked === 4 ? <TimeModal /> : null}
    </div>
  );
}

export default ReviewsSearch;
