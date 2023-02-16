import * as crypto from 'crypto';

export function calculateHash(index: number, timestamp: number, data: string, previousHash: string): string {
  const message = `${index}${timestamp}${data}${previousHash}`;
  const hash = crypto
    .createHash('sha256')
    .update(message)
    .digest('hex');
  return hash;
}