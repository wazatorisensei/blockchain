import { IBlockProps } from "../shared/interfaces";

export function createGenesisBlock(): IBlockProps {
  return {
    data: 'Genesis Block',
    hash: '0',
    index: 0,
    timestamp: Date.now(),
    previousHash: '0',
  };
};