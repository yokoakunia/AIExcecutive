
export enum Axis {
  OPENNESS = 'Apertura al Cambio',
  INFLUENCE = 'Influencia en el Equipo',
  CURIOSITY = 'Curiosidad Tecnológica',
  ADOPTION = 'Adopción Temprana'
}

export interface Question {
  id: number;
  text: string;
  axis: Axis;
  description: string;
}

export interface AxisScore {
  axis: Axis;
  score: number;
  maxScore: number;
}

export interface AssessmentResult {
  totalScore: number; // 0-100
  axisScores: AxisScore[];
  category: Category;
  timestamp: number;
}

export interface Category {
  name: string;
  range: [number, number];
  description: string;
  actionPlan: string;
  color: string;
  icon: string;
}
