import { hash, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { TokenModel } from "../types/TokenModel";

export async function generateToken(...payload: string[]): Promise<TokenModel> {
  const [id, ...rest] = payload;

  const JWT_EXPIRES_IN = "1h";

  return {
    type: "Bearer",
    token: sign({ rest }, process.env.SECRET_KEY, {
      subject: id,
      expiresIn: JWT_EXPIRES_IN,
    }),
  };
}

export async function generateHash(password: string): Promise<string> {
  const hashedPassword = await hash(password, 10);
  return hashSync(password, hashedPassword);
}
