import CryptoJS from 'crypto-js';
import { HASH_KEY_AES } from 'src/constants';

export class CommonHelper {
  static generateOTP(): string {
    return Math.floor(Math.random() * 9000 + 1000) + '';
  }

  static hashData(data: string): string {
    const hash = CryptoJS.AES.encrypt(data, HASH_KEY_AES).toString();
    return hash;
  }

  static checkHashData(hash: string): string {
    const bytes = CryptoJS.AES.decrypt(hash, HASH_KEY_AES);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  static random(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
