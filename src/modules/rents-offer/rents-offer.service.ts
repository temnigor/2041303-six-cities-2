
import { BeAnObject, DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface';
import { Component } from '../../type/component-type.js';
import CreateRentsOfferDto from './create-rents-offer.dto';
import { RentsOfferEntity } from './rents-offer.entity';
import { RentsOfferInterface } from './rents-offer.interface';
import updateRentsOfferDto from './update-rents-offer.dto';

const MAX_RENTS_OFFER = 60;

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

  public async find(rentsOfferCount:number = MAX_RENTS_OFFER): Promise<DocumentType<RentsOfferEntity, BeAnObject>[]> {
    return this.rentsOfferModel.find().slice(rentsOfferCount);
  }

  public async findOfferById(offerId: string): Promise<DocumentType<RentsOfferEntity> | null> {
    return this.rentsOfferModel.findById(offerId).exec();
  }

  public async findByFavorite():Promise<DocumentType<RentsOfferEntity>[]> {
    const query = await this.rentsOfferModel.find({favorite:true}).exec();
    this.logger.info(`find favorite offers ${query}`);
    return query;
  }

  public async findByPremium():Promise<DocumentType<RentsOfferEntity>[]> {
    const query = await this.rentsOfferModel.find({premium:true}).exec();
    this.logger.info(`find favorite offers ${query}`);
    return query;
  }

  public async updateOfferById(offerId: string, dto: updateRentsOfferDto): Promise<DocumentType<RentsOfferEntity> | null> {
    return this.rentsOfferModel.findByIdAndUpdate(offerId, dto, {new: true});
  }

  public async incComment(offerId: string): Promise<DocumentType<RentsOfferEntity, BeAnObject> | null> {
    return this.rentsOfferModel.findByIdAndUpdate(offerId, {'$inc': {commentCount:1}}).exec();
  }

  public async deleteOfferById(offerId: string): Promise<void> {
    this.rentsOfferModel.findByIdAndDelete(offerId);
  }

}
