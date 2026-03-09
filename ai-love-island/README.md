# AI Love Island - Social Simulation Demo

An interactive web demo where you observe 12 AI NPCs navigate a dating market.

## Features

- **12 NPCs** (6 men + 6 women) with unique personalities
- **Gossip Feed** - Observe all social events
- **Social Value System** - Hidden values affect matching
- **Dating Simulation** - NPCs approach, date, and form relationships
- **Ranking System** - See who's most desired
- **30-Day Simulation** - Game reveals all values at the end

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Local state management (no database)

## Getting Started

### Install dependencies:
```bash
npm install
```

### Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Game Mechanics

### NPC Behavior
- Each day, NPCs attempt to invite someone of the opposite gender
- Approach probability based on social value similarity
- Accept probability affected by value gap and personality

### Strategies
- **aim_high** - Pursues high-value partners
- **loyal** - Stays with one person
- **multi_dating** - Dates multiple people
- **cautious** - Careful in choices
- **risk_taker** - Takes chances
- And more...

### Gossip Types
- **Rejection** - Someone got turned down
- **Date** - Two people went out
- **Relationship** - Official couple formed
- **Rumor** - Speculation about interest

## Gameplay

1. Click **"Next Day"** to advance simulation
2. Observe the **Gossip Feed** for events
3. Check **NPC List** for relationship status
4. View **Ranking** to see who's most popular
5. After Day 30, all social values are revealed

## Project Structure

```
/app              - Next.js app router
  page.tsx        - Main game page
  layout.tsx      - Root layout
  globals.css     - Global styles
/components       - React components
  GossipFeed.tsx  - Main gossip display
  NPCList.tsx     - NPC profiles
  Ranking.tsx     - Popularity ranking
/simulation       - Game logic
  engine.ts       - Simulation algorithms
  npcData.ts      - NPC initialization
/types            - TypeScript definitions
  index.ts        - All type definitions
```

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
