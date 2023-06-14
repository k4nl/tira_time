import { IsString, Min, Max, MinLength } from 'class-validator';
export class CreatePlayerDto {
  @IsString()
  @MinLength(3)
  readonly name: string;

  @Min(0)
  @Max(100)
  readonly skill_level: number;
}
