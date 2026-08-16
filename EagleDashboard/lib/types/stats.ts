export interface Stats {
  _id: string;
  ProjectComplete: number;
  HappyClient: number;
  ClientSatisfaction: number;
  Experience: number;
  Support: string;
}

// Payload used when creating/updating stats
export interface StatsInput {
  ProjectComplete: number;
  HappyClient: number;
  ClientSatisfaction: number;
  Experience: number;
  Support: string;
}

