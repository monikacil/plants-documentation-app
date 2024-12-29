import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

const NEXT_SECRET_KEY = process.env.NEXT_SECRET_KEY as string

export const encryptData = (data: string | object) => {
  const jsonData = JSON.stringify(data);
  const encrypted = AES.encrypt(jsonData, NEXT_SECRET_KEY).toString();
  return encrypted;
}

export const decryptData = (data: string | undefined) => {
  if(!data) return
  const bytes = AES.decrypt(data, NEXT_SECRET_KEY);
  const decryptedData = bytes.toString(enc.Utf8);
  return JSON.parse(decryptedData);
}
