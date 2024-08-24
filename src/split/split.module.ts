import { Module } from "@nestjs/common";
import { SplitService } from "./split.service";
import { SplitController } from "./split.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [SplitController],
  providers: [SplitService, PrismaService],
})
export class SplitModule {}
