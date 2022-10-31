import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../type/component-type.js';
import { RentsOfferCommentDto } from './rents-offer-comments.dto.js';
import { RentsOfferCommentsEntity } from './rents-offer-comments.entity.js';
import { RentsOfferCommentsInterface } from './rents-offer-comments.interface.js';

@injectable()

export class RentsOfferCommentService implements RentsOfferCommentsInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger:LoggerInterface,
    @inject(Component.RentsOfferCommentModel) private rentsOfferCommentModel:types.ModelType<RentsOfferCommentsEntity>
  ) {}

  public async create(comment: RentsOfferCommentDto): Promise<DocumentType<RentsOfferCommentsEntity>> {
    const offerComment = await this.rentsOfferCommentModel.create(comment);
    return offerComment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<RentsOfferCommentsEntity>[] | []> {
    return this.rentsOfferCommentModel
      .find({offerId})
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.rentsOfferCommentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }

  public async deleteById(commentId: string): Promise<void> {
    await this.rentsOfferCommentModel.findByIdAndDelete({commentId});
    this.logger.info(`Comment ${commentId} was delete`);
  }
}
