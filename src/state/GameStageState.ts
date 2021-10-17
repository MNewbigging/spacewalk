enum LetterSpawnDelay {
  SLOW = 5000,
  MEDIUM = 3000,
  FAST = 1500,
}

export interface GameStage {
  name: string;
  letterPool: string;
  groupMin: number;
  groupMax: number;
  spawnDelay: number;
}

export class GameStageState {
  private allStages: GameStage[] = [
    {
      name: 'Vowel time',
      letterPool: 'aeiouyg',
      groupMin: 2,
      groupMax: 5,
      spawnDelay: LetterSpawnDelay.MEDIUM,
    },
    {
      name: 'Minimalist',
      letterPool: 'aeiouysbcdk',
      groupMin: 2,
      groupMax: 5,
      spawnDelay: LetterSpawnDelay.FAST,
    },
    {
      name: 'Carnival',
      letterPool: 'bcdkqrtlxz',
      groupMin: 1,
      groupMax: 5,
      spawnDelay: LetterSpawnDelay.MEDIUM,
    },
    {
      name: 'Spacetime',
      letterPool: 'aeiyhjsgr',
      groupMin: 1,
      groupMax: 3,
      spawnDelay: LetterSpawnDelay.FAST,
    },
    {
      name: 'Flurry',
      letterPool: 'yhjfpsbcdgkt',
      groupMin: 4,
      groupMax: 10,
      spawnDelay: LetterSpawnDelay.SLOW,
    },
    {
      name: 'Weirdo',
      letterPool: 'wvhjsfpgqlxz',
      groupMin: 2,
      groupMax: 6,
      spawnDelay: LetterSpawnDelay.FAST,
    },
    {
      name: 'Tonal',
      letterPool: 'aeioumnscdk',
      groupMin: 1,
      groupMax: 10,
      spawnDelay: LetterSpawnDelay.MEDIUM,
    },
  ];

  private currentStage: GameStage = {
    name: 'Tutorial',
    letterPool: 'akb',
    groupMin: 1,
    groupMax: 3,
    spawnDelay: LetterSpawnDelay.SLOW,
  };

  private spawnsBetweenStages = 8;
  private spawnsThisStage = 0;

  public countSpawn() {
    this.spawnsThisStage++;

    if (this.spawnsThisStage === this.spawnsBetweenStages) {
      this.spawnsThisStage = 0;
      // Pick a random stage to move to next
      const stages = this.allStages.filter((stage) => stage.name !== this.currentStage.name);
      this.currentStage = this.allStages[Math.floor(Math.random() * stages.length)];
    }
  }

  public getCurrentStage() {
    return this.currentStage;
  }
}
