import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface RentsOfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection:'rents'
  }
})

export class RentsOfferEntity extends defaultClasses.TimeStamps {

  @prop()
  public title !:string;

  @prop()
  public description !:string;

  @prop()
  public dataAbs !:Date;

  @prop()
  public city !:string;

  @prop()
  public posterImg !:string;

  @prop()
  public apartmentsImg !:string[];

  @prop()
  public premium !:boolean;

  @prop()
  public favorite !:boolean;

  @prop()
  public rating !:number;

  @prop()
  public apartmentsType !:string;

  @prop()
  public room !:number;

  @prop()
  public guest !:number;

  @prop()
  public rent !:number;

  @prop()
  public amenity !:string[];

  @prop({
    ref: UserEntity,
    default: [],
  })
  public author !:Ref<UserEntity>[];

  @prop()
  public commentCount !: number;

  @prop()
  public coordinatesAbs !:{latitude:number, longitude:number};
}

export const RentsOfferModel = getModelForClass(RentsOfferEntity);


