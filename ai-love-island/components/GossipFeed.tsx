import { GossipEvent } from "@/types";

interface Props {
  day: number;
  gossip: GossipEvent[];
  onNextDay: () => void;
  isGameOver: boolean;
}

export default function GossipFeed({ day, gossip, onNextDay, isGameOver }: Props) {
  const todayGossip = gossip.filter(g => g.day === day);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-pink-600">City Gossip Feed 💬</h2>
        <p className="text-2xl font-semibold text-gray-700 mt-2">Day {day}</p>
        {isGameOver && (
          <div className="mt-2 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
            <p className="text-lg font-bold text-yellow-800">Game Over! 🎉</p>
            <p className="text-sm text-yellow-700">Check the NPC List to see everyone's social values!</p>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {todayGossip.length === 0 ? (
          <p className="text-gray-400 italic">No gossip today...</p>
        ) : (
          todayGossip.map((g, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border-l-4 ${
                g.type === "REJECTION"
                  ? "bg-red-50 border-red-400"
                  : g.type === "DATE"
                  ? "bg-green-50 border-green-400"
                  : g.type === "RELATIONSHIP_START"
                  ? "bg-pink-50 border-pink-400"
                  : g.type === "RUMOR"
                  ? "bg-purple-50 border-purple-400"
                  : "bg-blue-50 border-blue-400"
              }`}
            >
              <p className="text-gray-800">{g.text}</p>
            </div>
          ))
        )}
      </div>
      
      {!isGameOver && (
        <button
          onClick={onNextDay}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-md"
        >
          Next Day →
        </button>
      )}
    </div>
  );
}
