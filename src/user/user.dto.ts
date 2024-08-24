import { IsOptional, IsString } from "class-validator";

export class UserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  session: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsOptional()
  Splits: [];
}
