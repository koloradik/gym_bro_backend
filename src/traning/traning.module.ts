import { Module } from "@nestjs/common";
import { TraningService } from "./traning.service";
import { TraningController } from "./traning.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [TraningController],
  providers: [TraningService, PrismaService],
})
export class TraningModule {}
