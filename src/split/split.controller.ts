import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { SplitService } from "./split.service";
import { SplitDto } from "./split.dto";
import { DeleteSplitDto } from "./deleteSplit.dto";

@Controller("split")
export class SplitController {
  constructor(private readonly splitService: SplitService) {}

  private extractSessionFromHeader(authHeader: string): string {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1];
    } else {
      throw new UnauthorizedException("invalid auth header");
    }
  }

  @Get()
  handleRequest(@Req() request: Request): any {
    const authHeader = request.headers["authorization"];
    let session = this.extractSessionFromHeader(authHeader);

    return this.splitService.getUsersSplits(session);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: SplitDto, @Req() request: Request) {
    const authHeader = request.headers["authorization"];
    let session = this.extractSessionFromHeader(authHeader);

    return this.splitService.create(dto, session);
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  async delete(@Body() dto: DeleteSplitDto, @Req() request: Request) {
    const authHeader = request.headers["authorization"];
    let session = this.extractSessionFromHeader(authHeader);

    return this.splitService.delete(dto, session);
  }
}
