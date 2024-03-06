import { Button, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../styles/modals/ReviewSearchBusinessTypes.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';

function ReviewsSearchBusinessTypes(props) {
  const { whatIsClicked, setClicked } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          if (whatIsClicked === 2) {
            setClicked(0);
          } else {
            setClicked(2);
          }
        }}
        size="small"
        variant="contained"
        style={{
          borderRadius: '20px',
          backgroundColor:
            whatIsClicked === 2
              ? 'rgba(29, 177, 119, 0.7)'
              : '#ffffff',
          color: whatIsClicked === 2 ? '#FFFFFF' : '#555558',
          paddingTop: '0px',
          paddingBottom: '0px',
          marginLeft: '3px',
          marginRight: '3px',
        }}
      >
        업종
        <ExpandMoreIcon sx={{ width: '10px' }} />
      </Button>
    </span>
  );
}

function StoreModal() {
  const {
    selectedBusinessTypes,
    businessTypesCategory,
    setSelectedBusinessTypes,
  } = reviewFilterStore();
  const handleAutocompleteChange = (event, selectedOptions) => {
    // 선택된 항목을 setSelectedFriend 함수의 인자로 전달
    setSelectedBusinessTypes(
      selectedOptions.map((option) => option.title)
    );
  };
  return (
    <div className={styles.wrapper}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={businessTypesCategory}
        getOptionLabel={(option) => option.title}
        onChange={handleAutocompleteChange}
        sx={{
          width: '300px',
          '& .MuiInputBase-root': {
            padding: '1px',
            paddingTop: '4px',
            // borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
            borderRadius: '0',
            '&:hover': {
              // borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
            },
            fontSize: '14px',
            color: 'rgba(29, 177, 119)',
            // border: '1px dashed red',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiInput-root::after': {
            borderBottom: '2px solid rgba(29, 177, 119, 0.5)',
          },
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="업종을 선택해주세요"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    style={{ color: 'rgba(217, 217, 217)' }}
                  />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: {
                fontSize: '14px',
                color: 'rgba(217, 217, 217)',
                paddingLeft: '0px',
              },
            }}
          />
        )}
      />
      {selectedBusinessTypes !== '' &&
      selectedBusinessTypes !== null ? (
        <div className={styles.aside}>
          {selectedBusinessTypes.join(' | ')}
        </div>
      ) : null}
      <Button
        type="submit"
        onClick={() => {
          setSelectedBusinessTypes([]);
        }}
        sx={{
          color: 'black',
          backgroundColor: 'rgba(217, 217, 217, 0.4)',
        }}
      >
        초기화
      </Button>
    </div>
  );
}

export { StoreModal, ReviewsSearchBusinessTypes };
