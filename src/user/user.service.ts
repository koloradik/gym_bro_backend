import { Injectable } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: UserDto) {
    const userWithSameName = await this.prisma.user.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (userWithSameName) {
      return { error: "This name is already taken" };
    }

    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: dto.password,
      },
    });

    return newUser;
  }

  async delete(session: string) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        session: session,
      },
    });

    return { message: "User was deleted" };
  }
}
