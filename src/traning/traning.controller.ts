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
import { TraningService } from "./traning.service";
import { TraningDto } from "./traning.dto";
import { DeleteTraningDto } from "./deleteTraning.dto";

@Controller("traning")
export class TraningController {
  constructor(private readonly traningService: TraningService) {}

  private extractSessionFromHeader(authHeader: string): string {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1];
    } else {
      throw new UnauthorizedException("invalid auth header");
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Req() request: Request, @Body() dto: TraningDto) {
    const authHeader = request.headers["authorization"];
    let session: string = this.extractSessionFromHeader(authHeader);

    return this.traningService.create(dto, session);
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  async delete(@Body() dto: DeleteTraningDto, @Req() request: Request) {
    const authHeader = request.headers["authorization"];
    let session: string = this.extractSessionFromHeader(authHeader);

    return this.traningService.delete(dto, session);
  }
}
