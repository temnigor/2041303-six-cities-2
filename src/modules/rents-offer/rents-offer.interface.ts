import { DocumentType } from '@typegoose/typegoose';
import CreateRentsOfferDto from './create-rents-offer.dto';
import { RentsOfferEntity } from './rents-offer.entity';

export interface RentsOfferInterface {
  create(dot:CreateRentsOfferDto):Promise<DocumentType<RentsOfferEntity>>;
  findOfferById(categoryId:string):Promise<DocumentType<RentsOfferEntity> | null>;
  findByFavorite():Promise<DocumentType<RentsOfferEntity>[]>;
  findByPremium ():Promise<DocumentType<RentsOfferEntity> []>;
  findCategoryName(categoryName:string):Promise<DocumentType<RentsOfferEntity> | null>;
  findByCategoryNameOrCreate(categoryName:string, dto:CreateRentsOfferDto):Promise<DocumentType<RentsOfferEntity>>;
}
