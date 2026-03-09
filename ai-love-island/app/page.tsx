"use client";

import { useState, useEffect } from "react";
import { GameState } from "@/types";
import { initializeNPCs } from "@/simulation/npcData";
import { simulateDay } from "@/simulation/engine";
import GossipFeed from "@/components/GossipFeed";
import NPCList from "@/components/NPCList";
import Ranking from "@/components/Ranking";

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  
  // Initialize game
  useEffect(() => {
    const npcs = initializeNPCs();
    setGameState({
      day: 1,
      npcs,
      gossip: [],
      isGameOver: false
    });
  }, []);
  
  const handleNextDay = () => {
    if (!gameState || gameState.isGameOver) return;
    
    const newDay = gameState.day + 1;
    const { npcs: updatedNPCs, gossip: newGossip } = simulateDay(newDay, gameState.npcs);
    
    setGameState({
      day: newDay,
      npcs: updatedNPCs,
      gossip: [...gameState.gossip, ...newGossip],
      isGameOver: newDay >= 30
    });
  };
  
  const handleRestart = () => {
    const npcs = initializeNPCs();
    setGameState({
      day: 1,
      npcs,
      gossip: [],
      isGameOver: false
    });
  };
  
  if (!gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">
            🏝️ AI Love Island
          </h1>
          <p className="text-xl text-purple-100">
            Observe the City's Dating Drama
          </p>
          {gameState.isGameOver && (
            <button
              onClick={handleRestart}
              className="mt-4 bg-white text-purple-600 font-bold py-2 px-6 rounded-lg hover:bg-purple-100 transition-all"
            >
              Restart Game
            </button>
          )}
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Gossip Feed */}
          <div className="lg:col-span-2">
            <GossipFeed
              day={gameState.day}
              gossip={gameState.gossip}
              onNextDay={handleNextDay}
              isGameOver={gameState.isGameOver}
            />
          </div>
          
          {/* Right: NPC List and Ranking */}
          <div className="space-y-6">
            <Ranking npcs={gameState.npcs} />
            <NPCList npcs={gameState.npcs} isGameOver={gameState.isGameOver} />
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-white text-sm opacity-75">
          <p>MVP Demo • Built with Next.js + TypeScript + Tailwind</p>
        </div>
      </div>
    </div>
  );
}
