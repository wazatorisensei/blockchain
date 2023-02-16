import { IBlockProps } from "../shared/interfaces";
import { createGenesisBlock } from "./createGenesisBlock";

export function createBlockchain(data: string): IBlockProps[] {
  const genesisBlock = createGenesisBlock();
  const blockchain: IBlockProps[] = [genesisBlock];
  return blockchain;
}