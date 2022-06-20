import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  // constructor(filePath: string) {
  //   this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  // }
  constructor() {
    const envFile =
      process.env.NODE_ENV === 'production'
        ? '.env.prod'
        : process.env.NODE_ENV === 'stage'
        ? '.env.stage'
        : '.env.dev';
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  isEnv(env: string): boolean {
    return this.nodeEnv === env;
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }
}
