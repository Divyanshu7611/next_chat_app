"use client";

import { useEffect, useState } from "react";
import { getRecentRoomsAction } from "@/app/actions/roomActions";

type Room = {
  roomId: string;
  name: string;
  joinedAt: Date;
};

export default function RecentRoomsList() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const recent = await getRecentRoomsAction();
        setRooms(recent);
      } catch (err) {
        console.error("Failed to fetch recent rooms", err);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-white mb-2">Recent Rooms</h3>
      <ul className="space-y-3">
        {rooms.map((room) => (
          <li
            key={room.roomId}
            className="bg-gray-800 text-white rounded-lg p-3"
          >
            <div className="font-medium">{room.name}</div>
            <div className="text-sm text-gray-400">ID: {room.roomId}</div>
            <div className="text-xs text-gray-500">
              Joined at: {new Date(room.joinedAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
