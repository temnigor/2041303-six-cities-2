
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { inject } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface';
import { Component } from '../../type/component-type.ts';
import CreateRentsOfferDto from './create-rents-offer.dto';
import { RentsOfferEntity } from './rents-offer.entity';
import { RentsOfferInterface } from './rents-offer.interface';

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

  public async findOfferById(categoryId: string): Promise<DocumentType<RentsOfferEntity> | null> {
    return this.rentsOfferModel.findById(categoryId).exec();
  }

  public async findCategoryName(categoryName: string): Promise<DocumentType<RentsOfferEntity> | null> {
    return this.rentsOfferModel.findOne({categoryName}).exec();
  }

  public async findByCategoryNameOrCreate(categoryName: string, dto: CreateRentsOfferDto): Promise<DocumentType<RentsOfferEntity>> {
    const existedCategory = await this.findCategoryName(categoryName);

    if (existedCategory) {
      return existedCategory;
    }

    return this.rentsOfferModel.create(dto);
  }


}
