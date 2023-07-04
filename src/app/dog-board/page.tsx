'use client';

import { ChangeEvent, ReactElement, useEffect } from 'react';
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
import { client } from '../common/utils';
import Navbar from '../common/navbar';
import { Dog } from '../common/types';
import DogCard from './dogCard';
import Filters from './filters';

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

export default function DogBoard(): ReactElement {
  const dogBoard = useAppSelector((state) => state.dogBoard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breedsResp = await client.get<string[]>('/dogs/breeds');
        dispatch(updateBreeds(breedsResp.data));
      } catch (err) {
        console.error(err);
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
        console.error(err);
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

  return (
    <div className="h-screen flex flex-col space-y-4">
      <Navbar />
      <Filters />
      <div className="basis-0 grow shrink overflow-auto p-2">
        {dogBoard.isLoading ? (
          <CircularProgress data-testid="spinner" />
        ) : (
          <div className="grid gap-12 grid-cols-fluid">
            {dogBoard.dogs.length ? (
              dogBoard.dogs.map((dog: Dog): ReactElement => <DogCard key={dog.id} dog={dog} />)
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
