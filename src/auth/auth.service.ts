import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { TokenDto } from './dto/token.dto';
import { UserLoginDto } from './dto/user-login.dto';
import Bcrypt from '../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomError } from 'src/error/CustomError';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async findUser(name: string) {
    return this.userModel.findOne({ where: { name } });
  }

  async login(login: UserLoginDto) {
    const user = await this.findUser(login.username);
    if (!user) throw new CustomError(['User not found'], 404);
    const validPass = await Bcrypt.comparePassword(
      login.password,
      user.password,
    );
    if (!validPass) throw new CustomError(['Invalid password'], 400);
    const token = this.jwtService.sign({ id: user.id, name: user.name });
    return { token, username: login.username };
  }

  async createToken(tokenInfos: TokenDto) {
    const token = this.jwtService.sign(tokenInfos);
    return { token };
  }
}
