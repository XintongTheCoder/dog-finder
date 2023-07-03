'use client';

import { ReactElement, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { updateBreeds, updateDogs } from '@/lib/redux/slices/dogBoardSlice';
import { client } from '../common/utils';
import Navbar from '../common/navbar';
import { Dog } from '../common/types';
import DogCard from './dogCard';
import Filters from './filters';

interface DogSearchResp {
  resultIds: string[];
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
        const dogSearchResp = await client.get<DogSearchResp>('/dogs/search', {
          params: {
            breeds: dogBoard.selectedBreeds,
            zipCodes: dogBoard.selectedZipCodes,
            ageMin: dogBoard.ageMin,
            ageMax: dogBoard.ageMax,
          },
        });
        const dogsResp = await client.post<DogsResp[]>('/dogs', dogSearchResp.data.resultIds);
        const conformedDogs = dogsResp.data.map((dog) => {
          // eslint-disable-next-line camelcase
          const { zip_code, ...rest } = dog;
          // eslint-disable-next-line camelcase
          return { zipCode: zip_code, ...rest };
        });
        dispatch(updateDogs(conformedDogs));
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
    dispatch,
  ]);

  return (
    <div>
      <Navbar />
      <Filters />
      <div className="grid-cols-fluid">
        {dogBoard.dogs.length ? (
          dogBoard.dogs.map((dog: Dog): ReactElement => <DogCard key={dog.id} dog={dog} />)
        ) : (
          <div>No dogs found</div>
        )}
      </div>
    </div>
  );
}
