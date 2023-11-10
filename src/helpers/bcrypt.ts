import * as bcrypt from 'bcrypt';
export class BcryptHelper {
  private static saltRounds = 10;
  public static async hashPassword(password: string) {
    return await bcrypt.hash(password, this.saltRounds);
  }
  public static async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
