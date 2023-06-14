import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { User } from 'src/custom_decorators/user.decorator';
import { InjectModel } from '@nestjs/sequelize';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player)
    private playerModel: typeof Player,
  ) {}

  async create(createPlayerDto: CreatePlayerDto, user: User) {
    return this.playerModel.create({
      name: createPlayerDto.name,
      skill_level: createPlayerDto.skill_level,
      user_id: user.id,
    });
  }

  async findAll(user: User) {
    return this.playerModel.findAll({
      where: { user_id: user.id },
      attributes: ['id', 'name', 'skill_level'],
    });
  }

  async getPlayers(players: number[], user: User) {
    return this.playerModel.findAll({
      where: { user_id: user.id, id: players },
      attributes: ['id', 'name', 'skill_level'],
    });
  }

  async findOne(id: number, user: User) {
    return this.playerModel.findOne({
      where: { id, user_id: user.id },
    });
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto, user: User) {
    return this.playerModel.update(updatePlayerDto, {
      where: { id, user_id: user.id },
    });
  }

  async remove(id: number, user: User) {
    return this.playerModel.destroy({ where: { id, user_id: user.id } });
  }
}
