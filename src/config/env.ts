import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env'), quiet: true });

export interface Credentials {
  readonly email: string;
  readonly password: string;
}

export class Environment {
  static readonly baseUrl: string = process.env.BASE_URL ?? 'https://app.wingify.com';
  static readonly loginPath: string = '/#/login';
  static readonly defaultTimeout: number = 30_000;

  static validCredentials(): Credentials | undefined {
    const email = process.env.WINGIFY_EMAIL?.trim();
    const password = process.env.WINGIFY_PASSWORD;
    if (!email || !password) {
      return undefined;
    }
    return { email, password };
  }
}
