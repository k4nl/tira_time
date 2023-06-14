import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCreateTeamDto,
  PlayerTeamData,
} from './dto/create-create_team.dto';
import { PlayerService } from 'src/player/player.service';
import { User } from 'src/user/entities/user.entity';
import { PlayerFound } from 'src/player/dto/player-found.dto';
import { CustomError } from 'src/error/CustomError';

@Injectable()
export class CreateTeamService {
  constructor(@Inject(PlayerService) private playerService: PlayerService) {}

  verifyIfSomePlayerIsMissing(found: PlayerFound) {
    if (!found) {
      throw new CustomError(['Some player is missing'], 400);
    }
  }

  transformPlayerData(player: any, captain: boolean) {
    return { ...player.dataValues, captain };
  }

  findPlayer(players: PlayerFound[], p: { id: number; captain: boolean }) {
    const found = players.find((player) => player.id === p.id);
    this.verifyIfSomePlayerIsMissing(found);
    return this.transformPlayerData(found, p.captain);
  }

  playersAverageTarget(players: PlayerTeamData[]) {
    return (
      players.reduce((acc, player) => acc + player.skill_level, 0) /
      players.length
    );
  }

  handlePlayersData(data: CreateCreateTeamDto, playersFound: PlayerFound[]) {
    return data.players.map((player) => {
      return this.findPlayer(playersFound, player);
    });
  }

  sortPlayers(data: PlayerTeamData[]) {
    return data.sort((a, b) => b.skill_level - a.skill_level);
  }

  filterCapitains(players: PlayerTeamData[]) {
    const filterd = { captains: [], nonCaptains: [] };
    for (let i = 0; i < players.length; i++) {
      if (players[i].captain) {
        filterd.captains.push(players[i]);
      } else {
        filterd.nonCaptains.push(players[i]);
      }
    }
    return filterd;
  }

  handleCaptains(players: PlayerTeamData[]) {
    const { captains, nonCaptains } = this.filterCapitains(players);
    return {
      captains: this.sortPlayers(captains),
      nonCaptains: this.sortPlayers(nonCaptains),
    };
  }

  organize({
    captains,
    nonCaptains,
    number_of_teams,
  }: {
    captains: PlayerTeamData[];
    nonCaptains: PlayerTeamData[];
    number_of_teams: number;
  }) {
    const totalPlayers = nonCaptains.length;

    let currentTeamIndex = 0;
    let currentPlayerIndex = 0;
    const teams = Array.from({ length: number_of_teams }, () => ({
      players: [],
      totalSkill: 0,
    }));

    while (currentPlayerIndex < totalPlayers) {
      const currentPlayer = nonCaptains[currentPlayerIndex];
      const currentPlayerSkill = currentPlayer.skill_level;

      const currentTeam = teams[currentTeamIndex];
      currentTeam.players.push(currentPlayer);
      currentTeam.totalSkill += currentPlayerSkill;

      currentPlayerIndex++;
      currentTeamIndex = (currentTeamIndex + 1) % number_of_teams;
    }

    captains.forEach((captain) => {
      const leastSkilledTeam = teams.sort(
        (a, b) => a.totalSkill - b.totalSkill,
      )[0];
      leastSkilledTeam.players.unshift(captain);
      leastSkilledTeam.totalSkill += captain.skill_level;
    });

    return teams.map((team, index) => ({
      team: index + 1,
      players: team.players,
      total_skill: team.totalSkill,
    }));
  }

  async getPlayers(data: CreateCreateTeamDto, user: User) {
    const playersId: number[] = data.players.map((player) => player.id);
    const playersFound = await this.playerService.getPlayers(playersId, user);
    const playersData = this.handlePlayersData(data, playersFound);
    return playersData;
  }

  async organizeTeams(data: CreateCreateTeamDto, user: User) {
    const playersData = await this.getPlayers(data, user);
    const { captains, nonCaptains } = this.handleCaptains(playersData);
    return this.organize({
      captains,
      nonCaptains,
      number_of_teams: data.number_of_teams,
    });
  }
}
