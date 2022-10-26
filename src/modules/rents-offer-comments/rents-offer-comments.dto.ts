import { User } from '../../type/user-data-type.js';

export class RentsOfferCommentDto {
  public offerId!: string;
  public text!: string;
  public rating!: number;
  public author!: User;
}
