import { DocumentType } from '@typegoose/typegoose';
import CreateRentsOfferDto from './create-rents-offer.dto.js';
import { RentsOfferEntity } from './rents-offer.entity.js';
import UpdateRentsOfferDto from './update-rents-offer.dto.js';

export interface RentsOfferInterface {
  create(dot:CreateRentsOfferDto):Promise<DocumentType<RentsOfferEntity>>;
  find():Promise<DocumentType<RentsOfferEntity>[]>;
  findOfferById(OfferId:string):Promise<DocumentType<RentsOfferEntity> | null>;
  findByFavorite():Promise<DocumentType<RentsOfferEntity>[]>;
  findByPremium ():Promise<DocumentType<RentsOfferEntity> []>;
  deleteOfferById(OfferId:string):Promise<void>;
  updateOfferById(offerId:string, dto:UpdateRentsOfferDto):Promise<DocumentType<RentsOfferEntity> | null>;
  incComment(offerId:string):Promise<DocumentType<RentsOfferEntity> | null>;
}
