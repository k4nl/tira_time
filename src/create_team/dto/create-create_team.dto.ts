import { IsNumber, ArrayMinSize, Min } from 'class-validator';

export interface PlayerTeam {
  id: number;
  captain: boolean;
}

export interface PlayerTeamData {
  id: number;
  name: string;
  skill_level: number;
  captain: boolean;
}

export class CreateCreateTeamDto {
  @ArrayMinSize(2)
  players: PlayerTeam[];

  @IsNumber()
  @Min(2)
  number_of_teams: number;
}
