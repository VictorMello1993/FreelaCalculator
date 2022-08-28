import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export namespace AuthRequestDTO {
  export class Body {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
  }

  export class Headers {
    authorization: string;
  }
}
