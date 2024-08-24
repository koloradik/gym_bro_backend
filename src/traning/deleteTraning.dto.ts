import { IsNumber } from "class-validator";

export class DeleteTraningDto {
  @IsNumber()
  traningId: number;
}
