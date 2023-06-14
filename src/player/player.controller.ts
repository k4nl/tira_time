import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ErrorException } from 'src/error/error.exception';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser, User } from 'src/custom_decorators/user.decorator';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
    @GetUser() user: User,
  ) {
    try {
      return this.playerService.create(createPlayerDto, user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@GetUser() user: User) {
    try {
      return this.playerService.findAll(user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    try {
      return this.playerService.findOne(+id, user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
    @GetUser() user: User,
  ) {
    try {
      return this.playerService.update(+id, updatePlayerDto, user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: User) {
    try {
      return this.playerService.remove(+id, user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
