export type Gender = "male" | "female";
export type DatingStatus = "single" | "dating";
export type Strategy = 
  | "aim_high"
  | "loyal"
  | "multi_dating"
  | "cautious"
  | "risk_taker"
  | "flexible"
  | "high_standard"
  | "mysterious"
  | "social"
  | "open"
  | "rational"
  | "slow_burn";

export interface NPC {
  name: string;
  gender: Gender;
  social_value: number;
  confidence: number;
  selectiveness: number;
  strategy: Strategy;
  datingStatus: DatingStatus;
  partner?: string;
  invitationsReceived: number;
  successfulDates: number;
  rejectionCount: number;
}

export type GossipType = 
  | "APPROACH"
  | "INVITATION"
  | "REJECTION"
  | "DATE"
  | "RELATIONSHIP_START"
  | "RUMOR";

export interface GossipEvent {
  day: number;
  type: GossipType;
  text: string;
  timestamp: number;
}

export interface GameState {
  day: number;
  npcs: NPC[];
  gossip: GossipEvent[];
  isGameOver: boolean;
}
