import { NPC } from "@/types";

interface Props {
  npcs: NPC[];
}

export default function Ranking({ npcs }: Props) {
  const ranked = [...npcs]
    .sort((a, b) => {
      const scoreA = a.invitationsReceived * 2 + a.successfulDates * 3;
      const scoreB = b.invitationsReceived * 2 + b.successfulDates * 3;
      return scoreB - scoreA;
    })
    .slice(0, 8);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-yellow-600 mb-4">Most Desired 🌟</h3>
      
      <div className="space-y-2">
        {ranked.map((npc, index) => {
          const score = npc.invitationsReceived * 2 + npc.successfulDates * 3;
          return (
            <div
              key={npc.name}
              className="flex items-center p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200"
            >
              <span className="text-2xl font-bold text-yellow-600 w-8">
                {index + 1}
              </span>
              <div className="flex-1 ml-3">
                <p className="font-semibold text-gray-800">{npc.name}</p>
                <p className="text-xs text-gray-500">
                  {npc.invitationsReceived} invites • {npc.successfulDates} dates
                </p>
              </div>
              {npc.datingStatus === "dating" && (
                <span className="text-pink-500 text-sm">💕</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
