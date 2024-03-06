import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import globalFilterStore from '../../stores/globalFilterStore';

function LocationMenuSelect() {
  const { restaurantMenu, choisedMenu, setChoisedMenu } =
    globalFilterStore();

  const handleAutocompleteChange = (event, selectedOptions) => {
    // 선택된 항목을 setSelectedFriend 함수의 인자로 전달
    setChoisedMenu(selectedOptions.map((option) => option.title));
    console.log('메뉴 선택!', choisedMenu);
  };

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={restaurantMenu}
        getOptionLabel={(option) => option.title}
        size="small"
        filterSelectedOptions
        onChange={handleAutocompleteChange}
        sx={{
          width: 300,
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'green', // 클릭되었을 때 테두리 색상
            },
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            color: 'green', // 텍스트가 상단으로 이동할 때의 색상
          },
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="업종"
            placeholder=""
            sx={{
              textAlign: 'center',
              display: 'block',
            }}
          />
        )}
      />
    </div>
  );
}

export default LocationMenuSelect;
