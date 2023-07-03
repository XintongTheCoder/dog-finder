import { ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { updateSelectedBreeds, updateSelectedZipCodes } from '@/lib/redux/slices/dogBoardSlice';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Filters() {
  const dogBoard = useAppSelector((state) => state.dogBoard);
  const [zipCodesInput, setZipCodesInput] = useState('');
  const hasInvalidZipCode = zipCodesInput
    .split(/,\s*/g)
    .some(
      (zipCode) => Number.isNaN(Number(zipCode)) || (zipCode.length > 0 && zipCode.length !== 5)
    );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!hasInvalidZipCode && zipCodesInput.length) {
      dispatch(updateSelectedZipCodes(zipCodesInput.split(/,\s*/g)));
    }
  }, [zipCodesInput, dispatch, hasInvalidZipCode]);

  return (
    <div className="flex flex-row">
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="breeds-filter-input-label">Breeds</InputLabel>
        <Select
          labelId="breeds-filter-select-label"
          id="breeds-filter"
          multiple
          value={dogBoard.selectedBreeds}
          onChange={(event: SelectChangeEvent<typeof dogBoard.breeds>) => {
            const {
              target: { value },
            } = event;
            dispatch(updateSelectedBreeds(typeof value === 'string' ? value.split(',') : value));
          }}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {dogBoard.breeds.map((breed) => (
            <MenuItem key={breed} value={breed}>
              <Checkbox checked={dogBoard.selectedBreeds.indexOf(breed) > -1} />
              <ListItemText primary={breed} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="zip-codes-filter"
          variant="outlined"
          value={zipCodesInput}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setZipCodesInput(event.target.value);
          }}
          error={hasInvalidZipCode}
          helperText={hasInvalidZipCode ? 'Invalid zip code' : ''}
        />
      </Box>
    </div>
  );
}
