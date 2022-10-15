import crypto from 'crypto';

export const createSHA256 = (line:string, salt:string):string => {
  const shaHarsher = crypto.createHmac('sha256', salt);
  return shaHarsher.update(line).digest('hex');
};
