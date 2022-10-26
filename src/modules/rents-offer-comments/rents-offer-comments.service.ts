import { DocumentType, types } from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import { inject, injectable } from "inversify";
import { LoggerInterface } from "../../common/logger/logger.interface";
import { Component } from "../../type/component-type";
import { RentsOfferCommentDto } from "./rents-offer-comments.dto";
import { RentsOfferCommentsEntity } from "./rents-offer-comments.entity";
import { RentsOfferCommentsInterface } from "./rents-offer-comments.interface";

@injectable

export class RentsOfferCommentService implements RentsOfferCommentsInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger:LoggerInterface
    @inject(Component.RentsOfferCommentModel) private rentsOfferCommentModel:types.ModelType<RentsOfferCommentsEntity>
    ) {}

    public async create(comment: RentsOfferCommentDto): Promise<DocumentType<RentsOfferCommentsEntity>> {
     const offerComment = await this.rentsOfferCommentModel.create(comment)
    return offerComment.populate('userId');
    }
}
