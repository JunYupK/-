import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import useGetRegion from '../../hooks/useGetRegion';
import globalFilterStore from '../../stores/globalFilterStore';
import locationBox from '../../styles/select/LocationSelect.module.css';

function LocationSelect() {
  const { location, setLocation } = globalFilterStore();

  const getRegion = useGetRegion();
  console.log(getRegion?.data);

  const defaultProps = {
    options: getRegion?.data,
    getOptionLabel: (option) => {
      let address = '';

      if (option.city !== '0') {
        address += `${option.city} `;
      }

      if (option.county !== '0') {
        address += `${option.county} `;
      }
      if (option.district !== '0') {
        address += option.district;
      }

      return address;
    },
    key: (option) => option.id,
  };

  const handleAutocompleteChange = (e, selectedOption) => {
    setLocation(selectedOption?.id);
    console.log('event 값', e);
    console.log('로케이션', location);
    console.log('선택한 옵션의 키 값:', selectedOption);
  };

  return (
    <div className={locationBox.wrapper}>
      <Autocomplete
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...defaultProps}
        id="auto-complete"
        autoComplete
        includeInputInList
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="지역(선택필수)"
            variant="standard"
          />
        )}
      />
    </div>
  );
}

export default LocationSelect;
