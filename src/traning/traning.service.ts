import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { DeleteTraningDto } from "./deleteTraning.dto";
import { TraningDto } from "./traning.dto";

@Injectable()
export class TraningService {
  constructor(private prisma: PrismaService) {}

  async create(dto: TraningDto, session: string) {
    const split = await this.prisma.split.findUnique({
      where: {
        id: dto.SplitId,
        User: {
          session: session,
        },
      },
    });

    if (!split) {
      throw new NotFoundException();
    }

    const newTraning = await this.prisma.training.create({
      data: {
        muscle_group: dto.muscle_group,
        date: dto.date,
        time_to_rest: dto.time_to_rest,
        SplitId: dto.SplitId,
      },
    });

    return newTraning;
  }

  async delete(dto: DeleteTraningDto, session: string) {
    const traning = await this.prisma.training.findUnique({
      where: {
        id: dto.traningId,
        Split: {
          User: { session: session },
        },
      },
    });

    if (!traning) {
      throw new NotFoundException();
    }

    const deletedTraning = await this.prisma.training.delete({
      where: {
        id: dto.traningId,
        Split: {
          User: { session: session },
        },
      },
    });

    return { message: "Traning was deleted" };
  }
}
