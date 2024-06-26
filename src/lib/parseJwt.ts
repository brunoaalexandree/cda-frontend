import { Buffer } from 'buffer';

const parseJwt = (token: string) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

export default parseJwt;
