import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CustomError } from 'src/error/CustomError';
import { AuthService } from 'src/auth/auth.service';
import Bcrypt from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      where: { name: createUserDto.name },
    });
    if (user) throw new CustomError(['User already exists'], 400);
    const hashedPassword = await Bcrypt.hashPassword(createUserDto.password);
    const newUser = await this.userModel.create({
      name: createUserDto.name,
      password: hashedPassword,
    });
    const { token } = await this.authService.createToken({
      id: newUser.id,
      name: newUser.name,
    });
    return { token, username: createUserDto.name };
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new CustomError(['User not found'], 404);
    return { username: user.name };
  }

  async findAll() {
    const users = await this.userModel.findAll();
    return users;
  }
}
