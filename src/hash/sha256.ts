

export function sha256(message: any) {
  // converter a mensagem em um array de byte
  const messageBytes = new TextEncoder().encode(message);

  // inicializar os valores do hash (em big-endians ou pontagrandenses)
  let hash = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ]);

  // Inicializando as constantes da rodada (em big-endian ou pontagrandenses)
  const K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ]);

  // Pre-processamento
  const messageBits = new Array(messageBytes.length * 8);
  for (let i = 0; i < messageBytes.length; i++);

  // Retorno do hash final onde os valores são string.
  return Array.from(hash, (word) => ('00000000' + word.toString())

  // Append the bit '0' to the message to get the length in bytes
  // to a multiple of 64
  while ((messageBytes.length + 8) % 64 !== 0) {
    messageBytes.push(0x00);
  }

  // Append the message length to the message as a 64-bit big-endian integer
  const lengthBytes = new ArrayBuffer(8);
  const lengthView = new DataView(lengthBytes);
  lengthView.setBigUint64(0, BigInt(messageBitLength));
  const lengthArray = new Uint8Array(lengthBytes);
  for (let i = 0; i < lengthArray.length; i++) {
    messageBytes.push(lengthArray[i]);
  }

  // Process the message in 512-bit blocks
  for (let i = 0; i < messageBytes.length; i += 64) {
    // Create a 64-entry message schedule array
    const W = new Uint32Array(64);

    // Copy the block into the message schedule array
    for (let j = 0; j < 16; j++) {
      W[j] = (messageBytes[i + j * 4] << 24) |
        (messageBytes[i + j * 4 + 1] << 16) |
        (messageBytes[i + j * 4 + 2] << 8) |
        (messageBytes[i + j * 4 + 3]);
    }

    // Extend the first 16 words into the remaining 48 words of the message
    // schedule array
    for (let j = 16; j < 64; j++) {
      const s0 = rightRotate(W[j - 15], 7) ^ rightRotate(W[j - 15], 18) ^
        (W[j - 15] >>> 3);
      const s1 = rightRotate(W[j - 2], 17) ^ rightRotate(W[j - 2], 19) ^
        (W[j - 2] >>> 10);
      W[j] = W[j - 16] + s0 + W[j - 7] + s1;
    }

    // Initialize the working variables
    let a = hash[0];
    let b = hash[1];
    let c = hash[2];
    let d = hash[3];
    let e = hash[4];
    let f = hash[5];
    let g = hash[6];
    let h = hash[7];

    // Compress the message schedule array
    for (let j = 0; j < 64; j++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = h + S1 + ch + K[j] + W[j];
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = S0 + maj;

      h = g;
      g = f;
      f = e;
      e = d + temp1;
      d = c;
      c = b;
      b = a;
      a = temp1 + temp2;
    }

    // Update the hash values
    hash[0] += a;
    hash[1] += b;
    hash[2] += c;
    hash[3] += d;
    hash[4] += e;
    hash[5] += f;
    hash[6] += g;
    hash[7] += h;
  }

  // Convert the hash values to a hex string
  let hashString = '';
  for (let i = 0; i < hash.length; i++) {
    hashString += hash[i].toString(16).padStart(8, '0');
  }

  return hashString;
}