import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { RentsOfferEntity } from '../rents-offer/rents-offer.entity';
import { UserEntity } from '../user/user.entity';

export interface RentsOfferCommentsEntity extends defaultClasses.Base {}

const {prop, modelOptions} = typegoose;

@modelOptions({
  schemaOptions: {
    collection: 'rentsOfferComments'
  }
})

export class RentsOfferCommentsEntity extends defaultClasses.TimeStamps {

  @prop({
    ref:RentsOfferEntity,
    required:true
  })

  public offerId?: string;

  @prop({trim: true, required: true})

  public text?: string;

  @prop({required:true})

  public rating?: number;

  @prop({
    ref:UserEntity,
    default:[]
  }
  )

  public author?: Ref<UserEntity>[];
}

export const RentsOfferCommentModel = getModelForClass(RentsOfferCommentsEntity);
