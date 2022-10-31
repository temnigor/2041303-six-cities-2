
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../type/component-type.js';
import { SortType } from '../../type/sort-type.js';
import CreateRentsOfferDto from './create-rents-offer.dto.js';
import { RentsOfferEntity } from './rents-offer.entity.js';
import { RentsOfferInterface } from './rents-offer.interface.js';
import updateRentsOfferDto from './update-rents-offer.dto.js';

const MAX_RENTS_OFFER = 60;

@injectable()

export default class RentsOfferService implements RentsOfferInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger:LoggerInterface,
    @inject(Component.RentsOfferModel) private readonly rentsOfferModel:ModelType<RentsOfferEntity>
  ) {}

  public async create(dto: CreateRentsOfferDto): Promise<DocumentType<RentsOfferEntity>> {
    const result = await this.rentsOfferModel.create({dto});
    this.logger.info(`create Rents Offer ${dto.title}`);
    return result;
  }

  public async find(): Promise<DocumentType<RentsOfferEntity>[]> {
    return this.rentsOfferModel.aggregate(
      [
        {
          $lookup: {
            from: 'rentsOfferComments',
            let: { Id: '$_id'},
            pipeline: [
              {$match: {$exp:{ $in: [ '$$Id', '$offerId']}}}
            ],
            as: 'rentsOfferComments'
          }
        },
        { $addFields:
          { id: { $toString: '$_id'}, commentCount: { $size: '$rentsOfferComments'}, rating: {$divide:{$sum:'rentsOfferComments.rating'},  $size: '$rentsOfferComments' }}
        },
        { $unset: 'rentsOfferComments' },
        { $limit: MAX_RENTS_OFFER},
        { $sort: { offerCount: SortType.Down } }
      ]
    );
  }

  public async findOfferById(offerId: string): Promise<DocumentType<RentsOfferEntity> | null> {
    return this.rentsOfferModel.findById(offerId).populate('author').exec();
  }

  public async findByFavorite():Promise<DocumentType<RentsOfferEntity>[]> {
    const query = await this.rentsOfferModel.find({favorite:true}).populate('author').exec();
    this.logger.info(`find favorite offers ${query}`);
    return query;
  }

  public async findByPremium():Promise<DocumentType<RentsOfferEntity>[]> {
    const query = await this.rentsOfferModel.find({premium:true}).populate('author').exec();
    this.logger.info(`find favorite offers ${query}`);
    return query;
  }

  public async updateOfferById(offerId: string, dto: updateRentsOfferDto): Promise<DocumentType<RentsOfferEntity> | null> {
    return this.rentsOfferModel.findByIdAndUpdate(offerId, dto, {new: true});
  }

  public async incComment(offerId: string): Promise<DocumentType<RentsOfferEntity> | null> {
    return this.rentsOfferModel.findByIdAndUpdate(offerId, {'$inc': {commentCount:1}}).exec();
  }

  public async deleteOfferById(offerId: string): Promise<void> {
    this.rentsOfferModel.findByIdAndDelete(offerId);
  }

}
