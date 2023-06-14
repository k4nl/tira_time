import { Test, TestingModule } from '@nestjs/testing';
import { CreateTeamController } from './create_team.controller';
import { CreateTeamService } from './create_team.service';

describe('CreateTeamController', () => {
  let controller: CreateTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateTeamController],
      providers: [CreateTeamService],
    }).compile();

    controller = module.get<CreateTeamController>(CreateTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
