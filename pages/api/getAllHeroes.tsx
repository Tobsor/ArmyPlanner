
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const user = req.body.user;
  try {
    const heroes = await prisma.hero.findMany({
      include: {
        author: {
          select: { name: true },
        },
      },
      where: {
        author: {
          name: user
        }
      }
    });
    
    res.status(200).json(JSON.parse(JSON.stringify(heroes)));
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured." });
  }
};