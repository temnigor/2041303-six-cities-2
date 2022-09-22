const randomValue = (max:number, min = 0):number => Math.floor((Math.random()*(max-min))+min);
const randomEndCount = <T> (item:T[], startCount:number, endCount:number) => {
  if(endCount === 0){
    endCount = randomValue(item.length-2, startCount);
    randomEndCount(item, startCount, endCount);
  }
  return endCount;
};

export const getRandomArrayData = <T> (item:T[]):T =>{
  const result = randomValue(item.length-1);
  return item[result];
};

export const getRandomArrayPiece = <T>(item:T[]):T[] => {
  const startCount = randomValue(item.length-2);
  const endCount = randomValue(item.length-2, startCount);

  return item.slice(startCount, randomEndCount(item, startCount, endCount));
};

