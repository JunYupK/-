import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import globalFilterStore from '../../stores/globalFilterStore';

function UserSortSelect() {
  const { userSort, setUserSort } = globalFilterStore();

  const sortStateChange = (event) => {
    setUserSort(event.target.value);
    // console.log(event.target.value);
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
          value={userSort}
          onChange={sortStateChange}
          autoWidth
          label="정렬"
        >
          <MenuItem value={0}>팔로워 높은 순</MenuItem>
          <MenuItem value={1}>팔로워 낮은 순</MenuItem>
          <MenuItem value={2}>연령 높은 순</MenuItem>
          <MenuItem value={3}>연령 낮은 순</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default UserSortSelect;
