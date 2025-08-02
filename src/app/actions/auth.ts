"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function handleFirebaseLogin(userData: {
  name: string;
  email: string;
  image: string;
}) {
  const { name, email, image } = userData;

  if (!email) return { success: false };

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name,
        email,
        image,
      },
    });
  }

  (await cookies()).set("user", email, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return { success: true };
}
