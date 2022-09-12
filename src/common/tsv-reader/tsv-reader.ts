import { readFileSync } from 'fs';
import { AbsData } from '../../type/abs-data-type.js';
import { FileReaderInterface } from '../file-reader/file-reader.interface.js';

export default class TSVReader implements FileReaderInterface  {

  private rawData = '';

  constructor (public fileName: string) {}

  public read() {
    this.rawData = readFileSync(this.fileName, {encoding: 'utf-8'});
  }

  public toArray ():AbsData[] {

    if(!this.rawData){
      return [];
    }

    return this.rawData.split('\n').filter((raw) => raw.trim() !== '').map((line) => line.split('\t'))
      .map(([title,
        description,
        dataAbs,
        City,
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
        coordinatesAbs
      ]) => {
        const [parallel, length] = coordinatesAbs.split(',');
        const [name, email, avatarImg,] = author.split(',').map((element)=>element.replace(' ',''));
        return({
          title,
          description,
          dataAbs: new Date(dataAbs),
          City,
          posterImg,
          apartmentsImg:apartmentsImg.split(','),
          premium: Boolean(+premium.replace(/\D+/g,'')),
          favorite: Boolean(+favorite.replace(/\D+/g,'')),
          rating:+rating.replace(/\D+/g,''),
          apartmentsType,
          room:+room.replace(/\D+/g,''),
          guest:+guest.replace(/\D+/g,''),
          rent:+rent.replace(/\D+/g,''),
          amenity:amenity.split(',').filter((space)=> space.trim() !== ''),
          author:{name:name, email:email, avatarImg:avatarImg},
          commentCount:+commentCount.replace(/\D+/g,''),
          coordinatesAbs:{latitude:+parallel.replace('latitude:','') ,longitude:+length.replace('longitude:','')}
        });
      });
  }
}
