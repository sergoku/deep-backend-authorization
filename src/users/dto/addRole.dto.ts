import { IsNumber, IsString } from "class-validator";

export class addRoleDto {
  @IsString({ message: "have to be string" })
  readonly value: string;
  @IsNumber({}, { message: "have to be number" })
  readonly userId: number;
}
