import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { SplitModule } from "./split/split.module";
import { TraningModule } from './traning/traning.module';
import { ExerciseModule } from './exercise/exercise.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, SplitModule, TraningModule, ExerciseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
