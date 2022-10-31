import { AbsData } from '../../type/abs-data-type.js';

export const offerTsvToArray = (rawData:string) => {

  if(!rawData){
    return [];
  }

  return rawData.split('\n').filter((raw) => raw.trim() !== '').map((line) => line.split('\t'))
    .map(([title,
      description,
      dataAbs,
      city,
      posterImg,
      apartmentsImg,
      premium,
      favorite,
      apartmentsType,
      room,
      guest,
      rent,
      amenity,
      author,
      coordinatesAbs
    ]) => {
      const [parallel, length] = coordinatesAbs.split(',');
      const [firstLastName, email, userType, avatarImg,] = author.split(',');
      const [name,  surname] = firstLastName.split(' ');
      return({
        title,
        description,
        dataAbs: new Date(dataAbs),
        city,
        posterImg,
        apartmentsImg:apartmentsImg.split(','),
        premium: Boolean(+premium.replace(/\D+/g,'')),
        favorite: Boolean(+favorite.replace(/\D+/g,'')),
        apartmentsType,
        room:+room.replace(/\D+/g,''),
        guest:+guest.replace(/\D+/g,''),
        rent:+rent.replace(/\D+/g,''),
        amenity:amenity.split(',').filter((space)=> space.trim() !== ''),
        author:{name:name, surname:surname, email:email, userType:Boolean(userType), avatarImg:avatarImg},
        coordinatesAbs:{latitude:+parallel.replace('latitude:','') ,longitude:+length.replace('longitude:','')}
      }as AbsData );
    });
};

