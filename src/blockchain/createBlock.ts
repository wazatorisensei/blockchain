import { SHA256 } from 'crypto-js';
import { IBlockProps } from './../shared/interfaces/index';

export const createBlock = (index: number, data: string, previousHash: string): IBlockProps => {
  const timestamp = Date.now();
  const hash = SHA256(index.toString() + timestamp.toString() + data + previousHash).toString();
  return {
    index,
    timestamp,
    data,
    previousHash,
    hash
  };
};