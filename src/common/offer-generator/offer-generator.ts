import { MockData } from '../../type/mock-data-type.js';
import { getRandomArrayData, getRandomArrayPiece } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor (private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomArrayData<string>(this.mockData.title);
    const description =  getRandomArrayData<string>(this.mockData.description);
    const dataAbs = new Date(getRandomArrayData<string>(this.mockData.dataAbs));
    const city = getRandomArrayData<string>(this.mockData.city);
    const posterImg = getRandomArrayData<string>(this.mockData.posterImg);
    const apartmentsImg = getRandomArrayData<string[]>(this.mockData.apartmentsImg);
    const premium = getRandomArrayData<number>(this.mockData.premium);
    const favorite = getRandomArrayData<number>(this.mockData.favorite);
    const rating = getRandomArrayData<number>(this.mockData.rating);
    const apartmentsType = getRandomArrayData<string>(this.mockData.apartmentsType);
    const room = getRandomArrayData<number>(this.mockData.room);
    const guest = getRandomArrayData<number>(this.mockData.guest);
    const rent = getRandomArrayData<number>(this.mockData.rent);
    const amenity = getRandomArrayPiece<string>(this.mockData.amenity);
    const author = getRandomArrayData<string>(this.mockData.author);
    const commentCount =  getRandomArrayData<number>(this.mockData.commentCount);
    const coordinatesAbs = getRandomArrayData<string>(this.mockData.coordinatesAbs);

    return  [
      title,
      description,
      dataAbs,
      city,
      posterImg,
      apartmentsImg,
      premium,
      favorite,
      rating,
      apartmentsType,
      room,
      guest,
      rent,
      amenity,
      author,
      commentCount,
      coordinatesAbs,
    ].join('\t');
  }

}
