"use client";
import { useState } from "react";

export default function CreateRoomModal({ onClose, onCreate }: any) {
  const [roomName, setRoomName] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-zinc-900 text-white p-6 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Create Room</h2>
        <input
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none mb-4"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-zinc-700 px-4 py-2 rounded hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (roomName.trim()) {
                const roomId = crypto.randomUUID().slice(0, 8);
                onCreate(roomName, roomId);
              }
            }}
            className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
