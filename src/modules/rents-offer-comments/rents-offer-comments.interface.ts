import { RentsOfferCommentDto } from './rents-offer-comments.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { RentsOfferCommentsEntity } from './rents-offer-comments.entity.js';

export interface RentsOfferCommentsInterface {
  create (comment:RentsOfferCommentDto):Promise <DocumentType<RentsOfferCommentsEntity>>;
  findByOfferId(offerId:string): Promise<DocumentType<RentsOfferCommentsEntity> [] | []>;
  deleteByOfferId(offerId:string): Promise<number | null>;
  deleteById(commentId:string): Promise<void>;
}
