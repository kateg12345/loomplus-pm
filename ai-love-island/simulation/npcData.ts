import { NPC, Strategy } from "@/types";

const maleNames = ["Liam", "Ethan", "Lucas", "Daniel", "Jack", "Tom"];
const femaleNames = ["Emma", "Sophia", "Olivia", "Ava", "Chloe", "Mia"];

const maleStrategies: Strategy[] = [
  "aim_high",      // Liam
  "loyal",         // Ethan
  "multi_dating",  // Lucas
  "cautious",      // Daniel
  "risk_taker",    // Jack
  "flexible"       // Tom
];

const femaleStrategies: Strategy[] = [
  "high_standard", // Emma
  "mysterious",    // Sophia
  "social",        // Olivia
  "open",          // Ava
  "rational",      // Chloe
  "slow_burn"      // Mia
];

function randomSocialValue(): number {
  // Generate random social value between 30-90
  return Math.floor(Math.random() * 60) + 30;
}

function getConfidence(strategy: Strategy): number {
  const confidenceMap: Record<Strategy, number> = {
    aim_high: 0.9,
    loyal: 0.6,
    multi_dating: 0.8,
    cautious: 0.3,
    risk_taker: 0.8,
    flexible: 0.5,
    high_standard: 0.8,
    mysterious: 0.7,
    social: 0.7,
    open: 0.6,
    rational: 0.6,
    slow_burn: 0.4
  };
  return confidenceMap[strategy];
}

function getSelectiveness(strategy: Strategy): number {
  const selectivenessMap: Record<Strategy, number> = {
    aim_high: 0.7,
    loyal: 0.6,
    multi_dating: 0.3,
    cautious: 0.8,
    risk_taker: 0.9,
    flexible: 0.4,
    high_standard: 0.9,
    mysterious: 0.8,
    social: 0.5,
    open: 0.4,
    rational: 0.8,
    slow_burn: 0.6
  };
  return selectivenessMap[strategy];
}

export function initializeNPCs(): NPC[] {
  const npcs: NPC[] = [];

  // Create male NPCs
  maleNames.forEach((name, index) => {
    npcs.push({
      name,
      gender: "male",
      social_value: randomSocialValue(),
      confidence: getConfidence(maleStrategies[index]),
      selectiveness: getSelectiveness(maleStrategies[index]),
      strategy: maleStrategies[index],
      datingStatus: "single",
      invitationsReceived: 0,
      successfulDates: 0,
      rejectionCount: 0
    });
  });

  // Create female NPCs
  femaleNames.forEach((name, index) => {
    npcs.push({
      name,
      gender: "female",
      social_value: randomSocialValue(),
      confidence: getConfidence(femaleStrategies[index]),
      selectiveness: getSelectiveness(femaleStrategies[index]),
      strategy: femaleStrategies[index],
      datingStatus: "single",
      invitationsReceived: 0,
      successfulDates: 0,
      rejectionCount: 0
    });
  });

  return npcs;
}
