import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsString, MinLength, Min, Max } from 'class-validator';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @IsString()
  @MinLength(3)
  readonly name: string;

  @Min(0)
  @Max(100)
  readonly skillLevel: number;
}
