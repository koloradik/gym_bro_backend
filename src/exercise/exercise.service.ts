import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ExerciseDto } from "./exercise.dto";
import { DeleteExerciseDto } from "./deleteExercise.dto";

@Injectable()
export class ExerciseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ExerciseDto, session: string) {
    const traning = await this.prisma.training.findUnique({
      where: {
        id: dto.TraningId,
        Split: {
          User: {
            session: session,
          },
        },
      },
    });

    if (!traning) {
      throw new NotFoundException();
    }

    const NewExercise = await this.prisma.exercise.create({
      data: {
        times: dto.times,
        muscle_group: dto.muscle_group,
        TrainingId: dto.TraningId,
      },
    });

    return NewExercise;
  }

  async delete(dto: DeleteExerciseDto, session: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id: dto.exerciseId,
        Training: {
          Split: {
            User: { session: session },
          },
        },
      },
    });

    if (!exercise) {
      throw new NotFoundException();
    }

    const deleteExercise = await this.prisma.exercise.delete({
      where: {
        id: dto.exerciseId,
        Training: { Split: { User: { session: session } } },
      },
    });

    return { message: "Exercise was deleted" };
  }
}
