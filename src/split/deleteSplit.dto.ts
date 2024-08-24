import { IsNumber } from "class-validator";

export class DeleteSplitDto {
  @IsNumber()
  splitId: number;
}
