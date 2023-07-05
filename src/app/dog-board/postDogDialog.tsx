import { ChangeEvent, ReactElement, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PetsIcon from '@mui/icons-material/Pets';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '@/lib/redux/hooks';
import { Input, MenuItem, SelectChangeEvent } from '@mui/material';
import { PresentToAll } from '@mui/icons-material';

interface Props {
  postDialogOpen: boolean;
  setPostDialogOpen(open: boolean): any;
}

interface DogForm {
  name: string;
  breed: string;
  age: number;
  img: string;
  zipCode: string;
}

export default function PostDogDialog({ postDialogOpen, setPostDialogOpen }: Props): ReactElement {
  const [dogForm, setDogForm] = useState<DogForm>({
    name: '',
    breed: '',
    age: 0,
    img: '',
    zipCode: '',
  });
  const { breeds } = useAppSelector((state) => state.dogBoard);
  const isZipCodeValid = !Number.isNaN(Number(dogForm.zipCode)) && dogForm.zipCode.length === 5;
  const isFormDataValid = () =>
    dogForm.name && breeds.includes(dogForm.breed) && dogForm.img && isZipCodeValid;
  const handleClose = () => {
    setPostDialogOpen(false);
  };

  const handleDogFormChange = (key: keyof DogForm, data: Partial<DogForm>) => {
    setDogForm((prevState) => ({ ...prevState, ...data }));
  };

  return (
    <div>
      <Dialog open={postDialogOpen} onClose={handleClose}>
        <DialogTitle className="flex items-center">
          <PetsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} fontSize="medium" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: 0,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            POST A DOG FOR MY SHELTER
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={dogForm.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleDogFormChange('name', { name: event.target.value });
            }}
            required
          />
          <TextField
            margin="dense"
            select
            id="breed"
            label="Breed"
            type="text"
            fullWidth
            variant="standard"
            value={dogForm.breed}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleDogFormChange('breed', { breed: event.target.value });
            }}
            required
          >
            {breeds.map((breed) => (
              <MenuItem key={breed} value={breed}>
                {breed}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="age"
            label="Age"
            type="number"
            inputProps={{ min: 0, max: 100 }}
            fullWidth
            variant="standard"
            autoComplete="on"
            value={dogForm.age}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleDogFormChange('age', { age: Number(event.target.value) });
            }}
            required
          />
          <TextField
            margin="dense"
            id="image"
            label="Image"
            type="url"
            fullWidth
            variant="standard"
            value={dogForm.img}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleDogFormChange('img', { img: event.target.value });
            }}
            required
          />
          <TextField
            margin="dense"
            id="zip-code"
            label="Zip Code"
            type="text"
            fullWidth
            variant="standard"
            value={dogForm.zipCode}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleDogFormChange('zipCode', { zipCode: event.target.value });
            }}
            error={!!dogForm.zipCode && !isZipCodeValid}
            helperText={!dogForm.zipCode || isZipCodeValid ? '' : 'Please enter valid zip code'}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => alert('API is WIP')} disabled={!isFormDataValid()}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
