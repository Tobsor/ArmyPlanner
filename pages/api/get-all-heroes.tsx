
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const user = req.body ? JSON.parse(req.body).user : null;

  try {
    let filter = {};

    if(user) {
      filter = {
        where: {
          author: {
            name: user
          }
        }
      }
    };

    const heroes = await prisma.hero.findMany({
      include: {
        author: {
          select: { name: true },
        },
      },
      ...filter,
    });
    
    res.status(200).json(JSON.parse(JSON.stringify(heroes)));
  } catch (err) {
    console.error(err);
    res.status(403).json({ err: "Error occured." });
  }
};