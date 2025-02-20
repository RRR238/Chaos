import bcrypt from 'bcryptjs';
import jwt, { SignOptions, VerifyErrors, JwtPayload } from 'jsonwebtoken';

export class Security {
  private saltRounds: number;
  private jwtSecret: string;
  private jwtIssuer: string;
  private jwtAudience: string;
  private jwtAlgorithm: jwt.Algorithm;
  private expiresIn: number;

  constructor(
    saltRounds: number = 10,
    jwtSecret: string = 'SuperSecretKey',
    jwtIssuer: string = 'ChaosBackend',
    jwtAudience: string = 'http://127.0.0.1:5000',
    jwtAlgorithm: jwt.Algorithm = 'HS256',
    expiresIn: number= 180
  ) {
    this.saltRounds = saltRounds;
    this.jwtSecret = jwtSecret;
    this.jwtIssuer = jwtIssuer;
    this.jwtAudience = jwtAudience;
    this.jwtAlgorithm = jwtAlgorithm;
    this.expiresIn = expiresIn;
  }


  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }


  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  
  createJwtToken(payload: object): string {
    const signOptions: SignOptions = {
      expiresIn: this.expiresIn,
      issuer: this.jwtIssuer,
      audience: this.jwtAudience,
      algorithm: this.jwtAlgorithm
    };

    return jwt.sign(payload, this.jwtSecret, signOptions);
  }

  
  validateJwtToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, this.jwtSecret, {
        issuer: this.jwtIssuer,
        audience: this.jwtAudience,
        algorithms: [this.jwtAlgorithm]
      }) as JwtPayload;

      return decoded;
    } catch (error) {
      console.error('JWT validation error:', (error as VerifyErrors).message);
      return null;
    }
  }
}
