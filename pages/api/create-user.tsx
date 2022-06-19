import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const data = JSON.parse(req.body);

  const newUser = await prisma.user.create({
    data
  });

  res.status(200).json(newUser);
}