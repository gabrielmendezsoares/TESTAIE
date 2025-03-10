import crypto from 'crypto';

/**
 * @describe Encrypts plaintext data using AES-256-CBC algorithm.
 * 
 * @description This function implements the Advanced Encryption Standard (AES) with a 256-bit key
 * in Cipher Block Chaining (CBC) mode to securely encrypt sensitive data. The input
 * plaintext is transformed into an encrypted hex string that can only be decrypted
 * with the same key and initialization vector.
 * 
 * @param encryptionKey - The encryption key in hex format (64 hex characters representing 32 bytes). Must be a valid hex string of exactly 64 characters.
 * @param ivString - The initialization vector in hex format (32 hex characters representing 16 bytes). Must be a valid hex string of exactly 32 characters.
 * @param data - The plaintext data to encrypt.
 * 
 * @returns Encrypted data in hex format.
 * 
 * @throws If the encryption key or IV are invalid or if encryption fails.
 * 
 * @example
 * const encryptionKey = '0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';
 * const ivString = '0123456789ABCDEF0123456789ABCDEF';
 * const data = 'Hello, World!';
 * const encryptedData = encryptToAes256Cbc(encryptionKey, ivString, data);
 */
export const encryptToAes256CbcUtil = (
  encryptionKey: string,
  ivString: string,
  data: string
): string => {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(encryptionKey, 'hex'),
    Buffer.from(ivString, 'hex')
  );
  
  return Buffer.concat(
    [
      cipher.update(data),
      cipher.final()
    ]
  ).toString('hex');
};

/**
 * @describe Decrypts data that was encrypted using AES-256-CBC algorithm.
 * 
 * @description This function reverses the encryption performed by {@link encryptToAes256Cbc}, transforming
 * the encrypted hex string back into the original plaintext. The same encryption key
 * and initialization vector used for encryption must be provided for successful decryption.
 * 
 * @param encryptionKey - The encryption key in hex format (64 hex characters representing 32 bytes). Must be the same key used for encryption.
 * @param ivString - The initialization vector in hex format (32 hex characters representing 16 bytes). Must be the same IV used for encryption.
 * @param encryptedData - The encrypted data in hex format. 
 * 
 * @returns Decrypted plaintext string.
 * 
 * @throws If the encryption key or IV are invalid, if the encrypted data is malformed, or if decryption fails for any other reason (e.g., data tampering).
 * 
 * @example
 * const encryptionKey = '0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';
 * const ivString = '0123456789ABCDEF0123456789ABCDEF';
 * const encryptedData = '0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';
 * const decryptedData = decryptFromAes256Cbc(encryptionKey, ivString, encryptedData);
 */
export const decryptFromAes256CbcUtil = (
  encryptionKey: string, 
  ivString: string, 
  encryptedData: string
): string => {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(encryptionKey, 'hex'),
    Buffer.from(ivString, 'hex')
  );
  
  return Buffer.concat(
    [
      decipher.update(Buffer.from(encryptedData, 'hex')),
      decipher.final()
    ]
  ).toString();
};
