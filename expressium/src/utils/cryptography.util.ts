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
 * CBC mode requires an initialization vector (IV) to ensure that identical plaintext blocks
 * encrypt to different ciphertext blocks, enhancing security. Each encryption operation
 * should use a unique IV for maximum security.
 * 
 * The function internally:
 * 
 * 1. Creates a cipher using the provided key and IV
 * 2. Updates the cipher with the plaintext data
 * 3. Finalizes the encryption
 * 4. Returns the resulting ciphertext as a hex string
 * 
 * @param encryptionKey - The encryption key in hex format (64 hex characters representing 32 bytes). 
 * Must be a valid hex string of exactly 64 characters (256 bits).
 * For security reasons, this should be a high-entropy value.
 * 
 * @param ivString - The initialization vector in hex format (32 hex characters representing 16 bytes).
 * Must be a valid hex string of exactly 32 characters (128 bits).
 * For maximum security, this should be a cryptographically random value unique to each encryption operation.
 * 
 * @param data - The plaintext data to encrypt. Can be any string of arbitrary length.
 * 
 * @returns Encrypted data in hex format. The result will be a hex string whose length depends on the input data length.
 * 
 * @throws If the encryptionKey or ivString parameters are not strings.
 * @throws If the encryptionKey is not a valid 64-character hex string.
 * @throws If the ivString is not a valid 32-character hex string.
 * @throws If the encryption operation fails due to invalid parameters or internal crypto errors.
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
 * The function performs the following steps:
 * 
 * 1. Creates a decipher instance using the provided key and IV
 * 2. Converts the hex-encoded encrypted data to a Buffer
 * 3. Updates the decipher with the encrypted data
 * 4. Finalizes the decryption process
 * 5. Returns the resulting plaintext as a string
 * 
 * Security note: This function does not implement any authentication mechanism to verify
 * data integrity. Consider using authenticated encryption modes like GCM for sensitive data.
 * 
 * @param encryptionKey - The encryption key in hex format (64 hex characters representing 32 bytes).
 * Must be the same key used for encryption and a valid hex string of exactly 64 characters.
 * 
 * @param ivString - The initialization vector in hex format (32 hex characters representing 16 bytes).
 * Must be the same IV used for encryption and a valid hex string of exactly 32 characters.
 * 
 * @param encryptedData - The encrypted data in hex format. This should be the output from the
 * {@link encryptToAes256Cbc} function.
 * 
 * @returns Decrypted plaintext string. The result will be identical to the original data provided to
 * {@link encryptToAes256Cbc} if the correct key and IV are used.
 * 
 * @throws If the encryptionKey, ivString, or encryptedData parameters are not strings.
 * @throws If the encryptionKey is not a valid 64-character hex string.
 * @throws If the ivString is not a valid 32-character hex string.
 * @throws If the encryptedData is not a valid hex string.
 * @throws If the decryption operation fails due to tampering, incorrect key/IV, or internal crypto errors.
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
