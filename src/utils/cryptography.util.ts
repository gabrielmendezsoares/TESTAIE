import crypto from 'crypto';

/**
 * ## encryptToAes256Cbc
 * 
 * Encrypts plaintext data using AES-256-CBC algorithm.
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
 */
export const encryptToAes256Cbc = (
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
 * ## decryptFromAes256Cbc
 * 
 * Decrypts data that was encrypted using AES-256-CBC algorithm.
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
 */
export const decryptFromAes256Cbc = (
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
