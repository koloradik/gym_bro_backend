import { IsNumber } from "class-validator";

export class DeleteExerciseDto {
  @IsNumber()
  exerciseId: number;
}
