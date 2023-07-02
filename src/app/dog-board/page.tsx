'use client';

import { ReactElement, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import {
  updateBreeds,
  updateDogs,
  updateSelectedBreeds,
  updateSelectedZipCodes,
  updateAgeMin,
  updateAgeMax,
} from '@/lib/redux/slices/dogBoardSlice';
import { client } from '../common/utils';
import Navbar from '../common/navbar';
import { Dog } from '../common/types';
import DogCard from './dogCard';

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

  const getSearchQuery = (): string => {
    const querySegments = [];
    dogBoard.selectedBreeds.forEach((breed) => {
      querySegments.push(`breeds=${breed}`);
    });
    dogBoard.selectedZipCodes.forEach((zipCode) => {
      querySegments.push(`zipCode=${zipCode}`);
    });
    querySegments.push(`ageMin=${dogBoard.ageMin}`);
    querySegments.push(`ageMax=${dogBoard.ageMax}`);
    return querySegments.join('&');
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const breedsResp = await client.get<string[]>('/dogs/breeds');
        dispatch(updateBreeds(breedsResp.data));
        const query = getSearchQuery();
        const dogSearchResp = await client.get<DogSearchResp>('/dogs/search', {
          params: { query },
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
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>Filters</div>
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
