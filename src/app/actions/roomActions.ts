"use server";

import { prisma } from "@/lib/prisma";
import { getAuth } from "firebase/auth";
import { cookies } from "next/headers";

// This would validate Firebase JWT stored in cookies
async function getCurrentUser() {
  const token = (await cookies()).get("__session")?.value;
  if (!token) return null;

  const decoded = await getAuth().verifySessionCookie(token, true);
  const user = await prisma.user.upsert({
    where: { email: decoded.email! },
    update: {},
    create: {
      email: decoded.email!,
      name: decoded.name,
    },
  });
  return user;
}

// Create Room
export async function createRoomAction(name: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const room = await prisma.room.create({
    data: {
      name,
      isGroup: true,
      users: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  return room;
}

// Join Room
export async function joinRoomAction(roomId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) throw new Error("Room not found");

  await prisma.roomUser.upsert({
    where: {
      userId_roomId: {
        userId: user.id,
        roomId: room.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      roomId: room.id,
    },
  });

  return room;
}

// get reccent connections
// app/actions/roomActions.ts

export async function getRecentRoomsAction() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const rooms = await prisma.roomUser.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      joinedAt: "desc",
    },
    include: {
      room: true,
    },
    take: 10, // or whatever number you prefer
  });

  return rooms.map((roomUser) => ({
    roomId: roomUser.room.id,
    name: roomUser.room.name,
    joinedAt: roomUser.joinedAt,
  }));
}
