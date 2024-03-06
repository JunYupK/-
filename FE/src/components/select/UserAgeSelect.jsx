import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import globalFilterStore from '../../stores/globalFilterStore';

function UserAgeSelect() {
  const { userAge, setUserAge } = globalFilterStore();

  const ageStateChange = (event) => {
    setUserAge(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          연령
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={userAge}
          onChange={ageStateChange}
          autoWidth
          label="연령"
        >
          <MenuItem value={0}>모든 연령</MenuItem>
          <MenuItem value={1}>10대</MenuItem>
          <MenuItem value={2}>20대</MenuItem>
          <MenuItem value={3}>30대</MenuItem>
          <MenuItem value={4}>40대</MenuItem>
          <MenuItem value={5}>50대</MenuItem>
          <MenuItem value={6}>60대</MenuItem>
          <MenuItem value={7}>70대</MenuItem>
          <MenuItem value={8}>80대</MenuItem>
          <MenuItem value={9}>90대</MenuItem>
          <MenuItem value={10}>100세 이상</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default UserAgeSelect;
