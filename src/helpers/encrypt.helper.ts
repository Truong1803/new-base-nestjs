import * as bcrypt from 'bcrypt';

export class EncryptHelper {
  static async hash(str: string, saltRounds = 10): Promise<string> {
    return await bcrypt.hash(str, saltRounds);
  }
  static async compare(str: string, hash: string): Promise<boolean> {
    return bcrypt.compare(str, hash);
  }
}
