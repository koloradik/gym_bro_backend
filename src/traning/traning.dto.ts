import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class TraningDto {
  @IsOptional()
  id: number;

  @IsNumber()
  date: number;

  @IsString()
  muscle_group: string;

  @IsNumber()
  time_to_rest: number;

  @IsOptional()
  exercises: [];

  @IsNumber()
  SplitId: number;
}
