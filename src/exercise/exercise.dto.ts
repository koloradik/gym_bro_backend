import { IsNumber, IsOptional, IsString } from "class-validator";

export class ExerciseDto {
  @IsOptional()
  id: number;

  @IsString()
  muscle_group: string;

  @IsNumber()
  times: number;

  @IsNumber()
  TraningId: number;
}
