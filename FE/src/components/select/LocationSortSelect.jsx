import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import globalFilterStore from '../../stores/globalFilterStore';

function LocationSortSelect() {
  const { rankSort, setRankSort } = globalFilterStore();

  const sortStateChange = (event) => {
    setRankSort(event.target.value);
    console.log('별점 높으면 1, 낮으면 0', event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          정렬
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={rankSort}
          onChange={sortStateChange}
          autoWidth
          label="정렬"
        >
          <MenuItem value={1}>별점 높은 순</MenuItem>
          <MenuItem value={0}>별점 낮은 순</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default LocationSortSelect;
