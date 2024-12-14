export interface Demographics {
  age: number;
  gender: string;
  location: string;
  occupation: string;
  income: string;
  education: string;
}

export interface Psychographics {
  interests: string[];
  values: string[];
  lifestyle: string;
  personality: string;
  socialMediaUsage: string[];
}

export interface GoalsAndPainPoints {
  goals: string[];
  painPoints: string[];
  challenges: string[];
  motivations: string[];
}

export interface Persona {
  id: string;
  name: string;
  avatar?: string;
  demographics: Demographics;
  psychographics: Psychographics;
  goalsAndPainPoints: GoalsAndPainPoints;
  createdAt: string;
  updatedAt: string;
}

export type PersonaFormData = Omit<Persona, 'id' | 'createdAt' | 'updatedAt'>;
