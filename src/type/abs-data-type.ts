import { User } from './user-data-type.js';

export type AbsData = {
  title:string,
  description:string,
  dataAbs:Date,
  city:string,
  posterImg:string,
  apartmentsImg:string[],
  premium:boolean,
  favorite:boolean,
  rating:number,
  apartmentsType:string,
  room:number,
  guest:number,
  rent:number,
  amenity:string[],
  author:User,
  commentCount: number,
  coordinatesAbs:{latitude:number, longitude:number},
}
