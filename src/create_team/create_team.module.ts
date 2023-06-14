import { Module } from '@nestjs/common';
import { CreateTeamService } from './create_team.service';
import { CreateTeamController } from './create_team.controller';
import { UserModule } from 'src/user/user.module';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [UserModule, PlayerModule],
  controllers: [CreateTeamController],
  providers: [CreateTeamService],
})
export class CreateTeamModule {}
