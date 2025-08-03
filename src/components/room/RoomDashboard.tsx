"use client";
import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import JoinRoomModal from "./JoinRoomModal";
import { toast } from "sonner";

export default function RoomDashboard() {
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  const handleRoomCreate = (name: string, id: string) => {
    toast.success(`Room "${name}" created! ID: ${id}`);
    setShowCreate(false);
    // You can redirect to /rooms/[id] or call an API here
  };

  const handleRoomJoin = (id: string) => {
    toast.success(`Joined Room: ${id}`);
    setShowJoin(false);
    // Navigate to room or validate room existence
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6 tracking-tight">NextChat Rooms</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => setShowCreate(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg text-lg shadow-md transition-all"
        >
          ➕ Create Room
        </button>

        <button
          onClick={() => setShowJoin(true)}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg text-lg shadow-md transition-all"
        >
          🔑 Join Room
        </button>
      </div>

      {showCreate && (
        <CreateRoomModal
          onClose={() => setShowCreate(false)}
          onCreate={handleRoomCreate}
        />
      )}
      {showJoin && (
        <JoinRoomModal
          onClose={() => setShowJoin(false)}
          onJoin={handleRoomJoin}
        />
      )}
    </div>
  );
}
