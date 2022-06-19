
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const prepareArgs = (heroes, authorId: string) => {
  return heroes.map(hero => ({
    ...hero,
    authorId,
    img: hero.img?.path,
    identifier: undefined
  }));
}

export default async (req, res) => {
  const { heroes, authorId } = JSON.parse(req.body);

  const args = prepareArgs(heroes, authorId);

  try {
    await prisma.hero.createMany({ data: args });
    
    res.status(200).json("Okay");
  } catch (err) {
    console.error(err);
    res.status(403).json({ err: "Error occured." });
  }
};