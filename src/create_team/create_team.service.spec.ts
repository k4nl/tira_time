import { Test, TestingModule } from '@nestjs/testing';
import { CreateTeamService } from './create_team.service';

describe('CreateTeamService', () => {
  let service: CreateTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTeamService],
    }).compile();

    service = module.get<CreateTeamService>(CreateTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
