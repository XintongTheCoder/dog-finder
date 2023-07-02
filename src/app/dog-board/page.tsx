'use client';

import { ReactElement, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { updateBreeds, updateDogs } from '@/lib/redux/slices/dogBoardSlice';
import { client } from '../common/utils';
import Navbar from '../common/navbar';
import { Dog } from '../common/types';
import DogCard from './dogCard';

export default function DogBoard(): ReactElement {
  const breeds = useAppSelector((state) => state.dogBoard.breeds);
  const dogs = useAppSelector((state) => state.dogBoard.dogs);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(100);
  const dispatch = useAppDispatch();

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

  const getSearchQuery = (): string => {
    let query = '';
    const breedsQueryArr = selectedBreeds.map((breed) => `breeds=${breed}`);
    query += breedsQueryArr.join('&');
    const zipCodeQueryArr = selectedZipCodes.map((zipCode) => `zipCode=${zipCode}`);
    query += `&${zipCodeQueryArr.join('&')}`;
    query += `&ageMin=${ageMin}`;
    query += `&ageMax=${ageMax}`;
    return query;
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
        {dogs.length ? (
          dogs.map((dog: Dog): ReactElement => <DogCard key={dog.id} dog={dog} />)
        ) : (
          <div>No dogs found</div>
        )}
      </div>
    </div>
  );
}
