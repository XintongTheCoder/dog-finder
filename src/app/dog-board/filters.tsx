import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { updateSelectedBreeds, updateSelectedZipCodes } from '@/lib/redux/slices/dogBoardSlice';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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
  const dispatch = useAppDispatch();

  const handleBreedsChange = (event: SelectChangeEvent<typeof dogBoard.breeds>) => {
    const {
      target: { value },
    } = event;
    dispatch(updateSelectedBreeds(typeof value === 'string' ? value.split(',') : value));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={dogBoard.selectedBreeds}
          onChange={handleBreedsChange}
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
    </div>
  );
}
