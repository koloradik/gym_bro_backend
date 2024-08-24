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
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  private extractSessionFromHeader(authHeader: string): string {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1];
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Delete()
  async delete(@Req() request: Request) {
    const authHeader = request.headers["authorization"];
    let session = this.extractSessionFromHeader(authHeader);

    return this.userService.delete(session);
  }
}
