export interface IToken {
  accessToken: string;
  expires: number;
  refreshToken: string;
}

export interface ITokenGenerate {
  token: string;
  expires: number;
}
