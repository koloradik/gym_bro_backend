import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class SplitDto {
  @IsOptional()
  id: number;

  @IsString()
  split_name: string;

  @IsOptional()
  status: boolean;

  @IsString()
  visibility: "public" | "private";

  @IsOptional()
  tranings: [];
}
