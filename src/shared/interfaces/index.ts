
export interface IBlockProps {
  data: string;
  hash: string;
  index: number;
  timestamp: number;
  previousHash: string;
}

export interface IBlockchainProps {
  blockchain: IBlockProps[];
}

export interface IFormBlockchain {
  onAddBlock: (data: string) => void;
}