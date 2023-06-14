import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { CreateTeamService } from './create_team.service';
import { CreateCreateTeamDto } from './dto/create-create_team.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ErrorException } from 'src/error/error.exception';
import { GetUser } from 'src/custom_decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('create-team')
export class CreateTeamController {
  constructor(private readonly createTeamService: CreateTeamService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(200)
  async create(
    @Body() createCreateTeamDto: CreateCreateTeamDto,
    @GetUser() user: User,
  ) {
    try {
      return this.createTeamService.organizeTeams(createCreateTeamDto, user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
