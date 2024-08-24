import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserDto } from "src/user/user.dto";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async auth(dto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password === dto.password) {
      const newUser = await this.prisma.user.update({
        where: {
          name: dto.name,
        },
        data: {
          session: uuidv4(),
        },
      });
      return { user: newUser };
    }

    throw new BadRequestException();
  }
}
