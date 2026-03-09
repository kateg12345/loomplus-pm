import { NPC, GossipEvent, GossipType } from "@/types";

// Store date history between NPCs
const dateHistory = new Map<string, number>();

function getDateKey(npc1: string, npc2: string): string {
  return [npc1, npc2].sort().join("-");
}

function getDateCount(npc1: string, npc2: string): number {
  const key = getDateKey(npc1, npc2);
  return dateHistory.get(key) || 0;
}

function incrementDateCount(npc1: string, npc2: string): void {
  const key = getDateKey(npc1, npc2);
  dateHistory.set(key, getDateCount(npc1, npc2) + 1);
}

export function calculateApproachProbability(
  initiator: NPC,
  target: NPC
): number {
  const gap = Math.abs(initiator.social_value - target.social_value);
  const baseProb = Math.exp(-gap / 20);
  
  // Strategy modifiers
  let modifier = 1.0;
  
  if (initiator.strategy === "aim_high" && target.social_value > initiator.social_value) {
    modifier = 1.5;
  } else if (initiator.strategy === "cautious") {
    modifier = 0.5;
  } else if (initiator.strategy === "risk_taker") {
    modifier = 1.3;
  }
  
  return Math.min(baseProb * modifier, 1.0);
}

export function calculateAcceptProbability(
  inviter: NPC,
  target: NPC
): number {
  const gap = Math.abs(inviter.social_value - target.social_value);
  const baseProb = Math.exp(-gap / 15);
  
  // If target is dating, reduce probability
  let modifier = 1.0;
  if (target.datingStatus === "dating") {
    modifier = 0.2;
  }
  
  // Strategy modifiers
  if (target.strategy === "high_standard") {
    modifier *= 0.7;
  } else if (target.strategy === "open") {
    modifier *= 1.3;
  }
  
  return Math.min(baseProb * modifier, 1.0);
}

function createGossip(
  day: number,
  type: GossipType,
  text: string
): GossipEvent {
  return {
    day,
    type,
    text,
    timestamp: Date.now()
  };
}

function generateRumorGossip(day: number, npcs: NPC[]): GossipEvent | null {
  if (Math.random() > 0.3) return null;
  
  const singles = npcs.filter(n => n.datingStatus === "single");
  if (singles.length < 2) return null;
  
  const npc1 = singles[Math.floor(Math.random() * singles.length)];
  const oppositeGender = singles.filter(n => n.gender !== npc1.gender);
  if (oppositeGender.length === 0) return null;
  
  const npc2 = oppositeGender[Math.floor(Math.random() * oppositeGender.length)];
  
  return createGossip(
    day,
    "RUMOR",
    `Rumor: ${npc1.name} might be interested in ${npc2.name}.`
  );
}

export function simulateDay(
  day: number,
  npcs: NPC[]
): { npcs: NPC[]; gossip: GossipEvent[] } {
  const newGossip: GossipEvent[] = [];
  const updatedNPCs = [...npcs];
  
  // Shuffle NPCs to randomize order
  const shuffled = [...updatedNPCs].sort(() => Math.random() - 0.5);
  
  for (const initiator of shuffled) {
    // Skip if this NPC is already in a committed relationship (strategy dependent)
    if (initiator.datingStatus === "dating" && initiator.strategy === "loyal") {
      continue;
    }
    
    // Find potential targets (opposite gender)
    const targets = updatedNPCs.filter(
      n => n.gender !== initiator.gender && n.name !== initiator.name
    );
    
    if (targets.length === 0) continue;
    
    // Choose a target
    let target: NPC | null = null;
    let attempts = 0;
    
    while (!target && attempts < 10) {
      const candidate = targets[Math.floor(Math.random() * targets.length)];
      const approachProb = calculateApproachProbability(initiator, candidate);
      
      if (Math.random() < approachProb) {
        target = candidate;
      }
      attempts++;
    }
    
    if (!target) continue;
    
    // Initiate invitation
    target.invitationsReceived++;
    
    // Calculate acceptance
    const acceptProb = calculateAcceptProbability(initiator, target);
    const accepted = Math.random() < acceptProb;
    
    if (accepted) {
      // Date success
      initiator.successfulDates++;
      target.successfulDates++;
      
      incrementDateCount(initiator.name, target.name);
      const dateCount = getDateCount(initiator.name, target.name);
      
      newGossip.push(
        createGossip(
          day,
          "DATE",
          `${initiator.name} and ${target.name} were seen having dinner.`
        )
      );
      
      // Check for relationship formation
      if (dateCount >= 2 && initiator.datingStatus === "single" && target.datingStatus === "single") {
        initiator.datingStatus = "dating";
        initiator.partner = target.name;
        target.datingStatus = "dating";
        target.partner = initiator.name;
        
        newGossip.push(
          createGossip(
            day,
            "RELATIONSHIP_START",
            `${initiator.name} and ${target.name} are now officially dating! 💕`
          )
        );
      }
    } else {
      // Rejection
      initiator.rejectionCount++;
      
      newGossip.push(
        createGossip(
          day,
          "REJECTION",
          `${target.name} rejected ${initiator.name}.`
        )
      );
    }
  }
  
  // Add random rumor
  const rumor = generateRumorGossip(day, updatedNPCs);
  if (rumor) {
    newGossip.push(rumor);
  }
  
  return { npcs: updatedNPCs, gossip: newGossip };
}

export function getRanking(npcs: NPC[]): NPC[] {
  return [...npcs].sort((a, b) => {
    const scoreA = a.invitationsReceived * 2 + a.successfulDates * 3;
    const scoreB = b.invitationsReceived * 2 + b.successfulDates * 3;
    return scoreB - scoreA;
  });
}
