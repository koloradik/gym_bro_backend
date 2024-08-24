import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SplitDto } from "./split.dto";
import { DeleteSplitDto } from "./deleteSplit.dto";

@Injectable()
export class SplitService {
  constructor(private prisma: PrismaService) {}

  async create(dto: SplitDto, session: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        session: session,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const editOthersSplits = await this.prisma.split.updateMany({
      where: {
        User: {
          session: session,
        },
      },
      data: {
        status: false,
      },
    });

    const newSplit = await this.prisma.split.create({
      data: {
        split_name: dto.split_name,
        visibility: dto.visibility,
        User: { connect: { session: session } },
      },
    });

    return newSplit;
  }

  async getUsersSplits(session: string) {
    const splits = await this.prisma.split.findMany({
      where: {
        User: { session: session },
      },
      include: {
        Trainings: { include: { Exercises: true } },
      },
    });

    if (splits.length === 0) {
      throw new NotFoundException();
    }

    return splits;
  }

  async delete(dto: DeleteSplitDto, session: string) {
    const split = await this.prisma.split.findUnique({
      where: {
        id: dto.splitId,
        User: { session: session },
      },
    });

    if (!split) {
      throw new NotFoundException();
    }

    const deletedSplit = await this.prisma.split.delete({
      where: {
        id: dto.splitId,
        User: { session: session },
      },
    });

    return { message: "Split was deleted" };
  }
}
