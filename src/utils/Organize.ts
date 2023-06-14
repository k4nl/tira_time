interface IPlayer {
  id: number;
  captain: boolean;
  skill_level: number;
}

interface IDefault {
  average: number;
  total: number;
  total_captains: number;
}

export default class Organize {
  private default: IDefault;
  data: IPlayer[];
  sorted: IPlayer[];
  team: IDefault;

  constructor(data?: IPlayer[]) {
    this.data = data;
    this.default = {
      average: 0,
      total: 0,
      total_captains: 0,
    };
    this.team = this.constructClass();
    this.sorted = this.sort();
    return this;
  }

  private average(data: IPlayer[]) {
    if (!data) return 0;
    return (
      data.reduce((acc: number, cur: IPlayer) => acc + cur.skill_level, 0) /
      data.length
    );
  }

  private constructClass() {
    const team = { ...this.default };
    if (!this.data) return team;
    this.data.forEach((player: IPlayer) => {
      if (player.captain) {
        team.total_captains++;
      }
      team.total += player.skill_level;
    });
    team.average = Math.round(team.total / this.data.length);
    return team;
  }

  private sort() {
    if (!this.data) return [];
    return this.data.sort(
      (a: IPlayer, b: IPlayer) => b.skill_level - a.skill_level,
    );
  }

  private getCaptains(number_of_teams: number, team_max_size: number) {
    if (!this.data) return [];
    const captains = this.data.filter((player: IPlayer) => player.captain);
    const captainsLeft = number_of_teams - captains.length;
    if (captainsLeft > 0) {
      const captainsAverage = this.average(captains);
      for (let i = 0; i < captainsLeft; i++) {
        
      }
    }
  }

  public init({
    number_of_teams,
    team_max_size,
  }: {
    number_of_teams: number;
    team_max_size: number;
  }) {
    const captains = this.getCaptains();
  }
}

const initialData = [
  { id: 10, captain: false, skill_level: 83 },
  { id: 15, captain: false, skill_level: 55 },
  { id: 14, captain: false, skill_level: 36 },
  { id: 3, captain: false, skill_level: 22 },
  { id: 11, captain: false, skill_level: 12 },
  { id: 7, captain: true, skill_level: 10 },
  { id: 4, captain: false, skill_level: 75 },
  { id: 5, captain: false, skill_level: 45 },
  { id: 2, captain: false, skill_level: 33 },
  { id: 8, captain: false, skill_level: 17 },
  { id: 1, captain: true, skill_level: 100 },
  { id: 13, captain: false, skill_level: 66 },
  { id: 9, captain: false, skill_level: 39 },
  { id: 12, captain: false, skill_level: 24 },
  { id: 6, captain: false, skill_level: 12 },
];

const teams = new Organize(initialData);

console.log(teams.team, 'team');
console.log(teams.sorted, 'sorted');
