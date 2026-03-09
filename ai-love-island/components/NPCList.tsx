import { NPC } from "@/types";
import { useState } from "react";

interface Props {
  npcs: NPC[];
  isGameOver: boolean;
}

export default function NPCList({ npcs, isGameOver }: Props) {
  const [selected, setSelected] = useState<NPC | null>(null);
  
  const males = npcs.filter(n => n.gender === "male");
  const females = npcs.filter(n => n.gender === "female");
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-purple-600 mb-4">City Residents 👥</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-blue-600 mb-2">Men</h4>
          <div className="space-y-2">
            {males.map((npc) => (
              <button
                key={npc.name}
                onClick={() => setSelected(npc)}
                className="w-full text-left p-3 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{npc.name}</span>
                  {npc.datingStatus === "dating" && (
                    <span className="text-sm text-pink-500">💕 {npc.partner}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-pink-600 mb-2">Women</h4>
          <div className="space-y-2">
            {females.map((npc) => (
              <button
                key={npc.name}
                onClick={() => setSelected(npc)}
                className="w-full text-left p-3 rounded-lg border-2 border-pink-200 hover:border-pink-400 hover:bg-pink-50 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{npc.name}</span>
                  {npc.datingStatus === "dating" && (
                    <span className="text-sm text-pink-500">💕 {npc.partner}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {selected && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
          <h4 className="text-lg font-bold text-purple-700 mb-2">{selected.name}</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Gender:</strong> {selected.gender}</p>
            <p><strong>Status:</strong> {selected.datingStatus}</p>
            {selected.partner && <p><strong>Partner:</strong> {selected.partner}</p>}
            <p><strong>Strategy:</strong> {selected.strategy}</p>
            {isGameOver && (
              <p className="text-purple-700 font-bold mt-2">
                Social Value: {selected.social_value}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
