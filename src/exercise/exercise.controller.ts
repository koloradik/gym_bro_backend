import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ExerciseService } from "./exercise.service";
import { ExerciseDto } from "./exercise.dto";
import { DeleteExerciseDto } from "./deleteExercise.dto";

@Controller("exercise")
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  private extractSessionFromHeader(authHeader: string): string {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1];
    } else {
      throw new UnauthorizedException("invalid auth header");
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: ExerciseDto, @Req() request: Request) {
    const authHeader = request.headers["authorization"];
    let session = this.extractSessionFromHeader(authHeader);

    return this.exerciseService.create(dto, session);
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  async delete(@Body() dto: DeleteExerciseDto, @Req() request: Request) {
    const authHeader = request.headers["authorization"];
    let session = this.extractSessionFromHeader(authHeader);

    return this.exerciseService.delete(dto, session);
  }
}
