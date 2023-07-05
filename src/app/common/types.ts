export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zipCode: string;
  breed: string;
}

export interface HasFavourite {
  favorite: boolean;
}

export interface Location {
  zipCode: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export type SortBy = 'breed:asc' | 'breed:desc' | 'age:asc' | 'age:desc';
