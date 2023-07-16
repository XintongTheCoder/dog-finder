import { ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import {
  updateAgeMax,
  updateAgeMin,
  updateSelectedBreeds,
  updateSelectedZipCodes,
  updateSortBy,
} from '@/lib/redux/slices/dogBoardSlice';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SortBy } from '../common/types';

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

const SORTOPTIONS: SortBy[] = ['breed:asc', 'breed:desc', 'age:asc', 'age:desc'];

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
    if (!hasInvalidZipCode) {
      dispatch(updateSelectedZipCodes(zipCodesInput.length ? zipCodesInput.split(/,\s*/g) : []));
    }
  }, [zipCodesInput, dispatch, hasInvalidZipCode]);

  return (
    <div className="flex flex-row">
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, minWidth: '10ch' } }}
        noValidate
        autoComplete="off"
      >
        <FormControl sx={{ m: 1, width: { xs: 180, md: 300 } }}>
          <InputLabel id="breeds-filter-label">Breeds</InputLabel>
          <Select
            id="breeds-filter"
            labelId="breeds-filter-label"
            data-testid="breeds-filter"
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
            {dogBoard.breeds.map((breed, index) => (
              <MenuItem key={breed} value={breed}>
                <Checkbox checked={dogBoard.selectedBreeds.indexOf(breed) > -1} />
                <ListItemText primary={breed} data-testid={`breed-${index}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="zip-codes"
          data-testid="zip-codes-filter"
          label="Zip Codes"
          variant="outlined"
          placeholder="separated by ,"
          value={zipCodesInput}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setZipCodesInput(event.target.value);
          }}
          error={hasInvalidZipCode}
          helperText={hasInvalidZipCode ? 'Invalid zip code' : ''}
        />
        <TextField
          id="age-min"
          label="Age Min"
          type="number"
          inputProps={{ min: 0, max: 100 }}
          value={dogBoard.ageMin}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateAgeMin(Math.round(Number(event.target.value))));
          }}
        />
        <TextField
          id="age-max"
          label="Age Max"
          type="number"
          inputProps={{ min: 0, max: 100 }}
          value={dogBoard.ageMax}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch(updateAgeMax(Math.round(Number(event.target.value))));
          }}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            id="sort-by"
            labelId="sort-by-label"
            data-testid="sort-by"
            value={dogBoard.sortBy}
            onChange={(event: SelectChangeEvent<SortBy>) => {
              const {
                target: { value },
              } = event;
              dispatch(updateSortBy(value as SortBy));
            }}
          >
            <MenuItem value={SORTOPTIONS[0]} selected>
              breed: a-z
            </MenuItem>
            <MenuItem value={SORTOPTIONS[1]} data-testid="breed-desc">
              breed: z-a
            </MenuItem>
            <MenuItem value={SORTOPTIONS[2]}>age: ↑</MenuItem>
            <MenuItem value={SORTOPTIONS[3]}>age: ↓</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
