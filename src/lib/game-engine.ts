export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  points: number;
  legalCorrect: boolean;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  image?: string;
  choices: Choice[];
  legalExplanation?: string;
}

export class GameEngine {
  private score: number = 0;
  private path: string[] = [];
  private legalMistakes: number = 0;
  private userChoices: Record<string, string> = {};

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('legalQuestProgress');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          this.score = data.score || 0;
          this.path = data.path || [];
          this.legalMistakes = data.legalMistakes || 0;
          this.userChoices = data.userChoices || {};
        } catch (error) {
          console.error('Error parsing saved progress:', error);
          this.resetGame();
        }
      }
    }
  }

  makeChoice(choice: Choice, sceneId: string) {
    this.score += choice.points;
    this.path.push(sceneId);
    this.userChoices[sceneId] = choice.id;

    if (!choice.legalCorrect) {
      this.legalMistakes++;
    }

    this.saveProgress();
    return choice.nextSceneId;
  }

  getScore() {
    return this.score;
  }

  getCorrectAnswersCount(scenes: Scene[]) {
    let correctCount = 0;
    Object.entries(this.userChoices).forEach(([sceneId, choiceId]) => {
      const scene = scenes.find(s => s.id === sceneId);
      if (scene) {
        const choice = scene.choices.find(c => c.id === choiceId);
        if (choice && choice.legalCorrect) {
          correctCount++;
        }
      }
    });
    return correctCount;
  }

  getTotalAnswersCount() {
    return Object.keys(this.userChoices).length;
  }

  getLegalMistakes() {
    return this.legalMistakes;
  }

  getPath() {
    return this.path;
  }

  getUserChoices() {
    return this.userChoices;
  }

  private saveProgress() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('legalQuestProgress', JSON.stringify({
        score: this.score,
        path: this.path,
        legalMistakes: this.legalMistakes,
        userChoices: this.userChoices,
        timestamp: Date.now()
      }));
    }
  }

  resetGame() {
    this.score = 0;
    this.path = [];
    this.legalMistakes = 0;
    this.userChoices = {};
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('legalQuestProgress');
    }
  }
}