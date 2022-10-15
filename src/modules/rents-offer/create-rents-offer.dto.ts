import { User } from '../../type/user-data-type.js';

export default class CreateRentsOfferDto {
  public title!: string;
  public description!: string;
  public dataAbs!: Date;
  public city!: string;
  public posterImg!: string;
  public apartmentsImg!: string[];
  public premium!: boolean;
  public favorite!: boolean;
  public rating!: number;
  public apartmentsType!: string;
  public room!: number;
  public guest!: number;
  public rent!: number;
  public amenity!: string[];
  public author!:User;
  public commentCount!:  number;
  public coordinatesAbs!: {latitude:number, longitude:number};
}
