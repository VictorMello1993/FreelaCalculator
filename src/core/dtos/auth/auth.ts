import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export namespace AuthInputModel {
  export class Body {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
  }
}
