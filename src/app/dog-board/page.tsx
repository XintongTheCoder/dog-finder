'use client';

import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import {
  updateBreeds,
  updateDogs,
  updateIsLoading,
  updateFrom,
  updateTotalDogs,
} from '@/lib/redux/slices/dogBoardSlice';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import { client } from '../common/utils';
import Navbar from '../common/navbar';
import { Dog, HasFavourite } from '../common/types';
import DogCard from './dogCard';
import Filters from './filters';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import { shallowEqual } from 'react-redux';
import PostDogDialog from './postDogDialog';

interface DogSearchResp {
  resultIds: string[];
  total: number;
}

interface DogsResp {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogMatchResp {
  match: string;
}

export default function DogBoard(): ReactElement {
  const dogBoard = useAppSelector((state) => state.dogBoard);
  const user = useAppSelector((state) => state.user);
  const dogs = useAppSelector(
    (state): Array<Dog & HasFavourite> => {
      const favouriteSet = new Set<string>(state.dogBoard.favoriteDogIds);
      return state.dogBoard.dogs.map((dog) => ({ favorite: favouriteSet.has(dog.id), ...dog }));
    },
    (selected1, selected2) => {
      if (selected1.length !== selected2.length) {
        return false;
      }
      for (let i = 0; i < selected1.length; i++) {
        if (!shallowEqual(selected1[i], selected2[i])) {
          return false;
        }
      }
      return true;
    }
  );
  const [matchedDog, setMatchedDog] = useState<Dog>({
    id: '',
    img: '',
    name: '',
    age: 0,
    zipCode: '',
    breed: '',
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [matchDialogOpen, setMatchDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedsResp = await client.get<string[]>('/dogs/breeds');
        dispatch(updateBreeds(breedsResp.data));
      } catch (err) {
        throw new Error('Something went wrong');
      }
    };
    fetchBreeds();
  }, [dispatch]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        dispatch(updateIsLoading(true));
        const dogSearchResp = await client.get<DogSearchResp>('/dogs/search', {
          params: {
            breeds: dogBoard.selectedBreeds,
            zipCodes: dogBoard.selectedZipCodes,
            ageMin: dogBoard.ageMin,
            ageMax: dogBoard.ageMax,
            sort: dogBoard.sortBy,
            from: dogBoard.from,
            size: dogBoard.pageSize,
          },
        });
        dispatch(updateTotalDogs(dogSearchResp.data.total));
        const dogsResp = await client.post<DogsResp[]>('/dogs', dogSearchResp.data.resultIds);
        const conformedDogs = dogsResp.data.map((dog) => {
          // eslint-disable-next-line camelcase
          const { zip_code, ...rest } = dog;
          // eslint-disable-next-line camelcase
          return { zipCode: zip_code, ...rest };
        });
        dispatch(updateDogs(conformedDogs));
        dispatch(updateIsLoading(false));
      } catch (err) {
        throw new Error('Something went wrong');
      }
    };
    fetchDogs();
  }, [
    dogBoard.selectedBreeds,
    dogBoard.selectedZipCodes,
    dogBoard.ageMin,
    dogBoard.ageMax,
    dogBoard.sortBy,
    dogBoard.from,
    dogBoard.pageSize,
    dispatch,
  ]);

  useEffect(() => {
    if (!user.isLoggedIn) {
      router.push('/');
    }
  }, [router, user.isLoggedIn]);

  const handleDialogClose = () => {
    setMatchDialogOpen(false);
  };

  return (
    <div className="h-screen flex flex-col space-y-4">
      <Navbar setPostDialogOpen={setPostDialogOpen} />
      <Filters />
      <Button
        variant="outlined"
        onClick={async () => {
          const dogMatchResp = await client.post<DogMatchResp>(
            '/dogs/match',
            dogBoard.favoriteDogIds
          );

          if (dogMatchResp.status === 200) {
            const dogsResp = await client.post('/dogs', [dogMatchResp.data.match]);
            setMatchedDog(dogsResp.data[0]);
            setMatchDialogOpen(true);
          } else {
            throw new Error('Something went wrong');
          }
        }}
      >
        Find a match
      </Button>
      {postDialogOpen && (
        <PostDogDialog postDialogOpen={postDialogOpen} setPostDialogOpen={setPostDialogOpen} />
      )}
      <Dialog
        open={matchDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="dog-match-dialog-title"
        aria-describedby="dog-match-dialog-description"
      >
        <DialogTitle id="dog-match-dialog-title">Your match is</DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={matchedDog.name} />
            <CardMedia component="img" height="194" image={matchedDog.img} alt="dog image" />
            <CardContent>
              <ListItem key="breed" component="div">
                <ListItemText primary={`breed: ${matchedDog.breed}`} />
              </ListItem>
              <ListItem key="age" component="div">
                <ListItemText primary={`age: ${matchedDog.age}`} />
              </ListItem>
              <ListItem key="zip" component="div">
                <ListItemText primary={`zip code: ${matchedDog.zipCode}`} />
              </ListItem>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Repick</Button>
          <Button onClick={handleDialogClose} autoFocus>
            Take him/her home
          </Button>
        </DialogActions>
      </Dialog>
      <div className="basis-0 grow shrink overflow-auto p-2">
        {dogBoard.isLoading ? (
          <CircularProgress data-testid="spinner" />
        ) : (
          <div className="grid gap-12 grid-cols-fluid">
            {dogs.length ? (
              dogs.map((dog): ReactElement => <DogCard key={dog.id} dog={dog} />)
            ) : (
              <div>No dogs found</div>
            )}
          </div>
        )}
      </div>
      <Pagination
        count={Math.ceil(dogBoard.totalDogs / dogBoard.pageSize)}
        color="primary"
        showFirstButton
        showLastButton
        page={dogBoard.from / dogBoard.pageSize + 1}
        onChange={(event: ChangeEvent<unknown>, page: number) => {
          dispatch(updateFrom((page - 1) * dogBoard.pageSize));
        }}
      />
    </div>
  );
}
