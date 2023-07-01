export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zipCode: string;
  breed: string;
}

export interface Location {
  zipCode: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}
