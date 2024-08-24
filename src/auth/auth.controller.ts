import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "src/user/user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async auth(@Body() dto: UserDto) {
    return this.authService.auth(dto);
  }
}
