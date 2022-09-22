const randomValue = (max:number, min = 0):number => Math.floor((Math.random()*(max-min))+min);

export const getRandomArrayData = <T> (item:T[]):T =>{
  const result = randomValue(item.length-1);
  return item[result];
};

export const getRandomArrayPiece = <T>(item:T[]):T[] => {
  const startCount = randomValue(item.length-1);
  const endCount = randomValue(item.length-1, startCount);
  return item.slice(startCount, endCount);
};

