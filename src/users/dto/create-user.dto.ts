import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "user@gmail.com", description: "email" })
  @IsString({ message: "userName must be strting" })
  @IsEmail({}, { message: "email is not correct" })
  readonly email: string;
  @ApiProperty({ example: "12345", description: "password" })
  @Length(4, 24, { message: "Length of password must be between 4 and 24" })
  readonly password: string;
}
