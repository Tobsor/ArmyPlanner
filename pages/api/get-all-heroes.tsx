
import { Hero, HeroInstance } from "@prisma/client";
import prisma from "../../lib/prisma";

const mapHeroes = (heroes: Hero[], heroInstances: HeroInstance[]) => {
  return heroes.map(hero => {
    const targetHeroInstance = heroInstances.find(instance => instance.heroId === hero.id);

    if(targetHeroInstance) {
      return {
        name: hero.name,
        instantiated: true,
        heroId: hero.id,
        img: hero.img,
        heroInstanceId: targetHeroInstance.id,
        power: targetHeroInstance.power,
      }
    }

    return {
      name: hero.name,
      power: 0,
      instantiated: false,
      heroId: hero.id,
      img: hero.img,
    }
  })
}

export default async (req, res) => {
  const user = req.body ? JSON.parse(req.body).user : null;

  try {
    const heroes = await prisma.hero.findMany();
    const heroInstances = await prisma.heroInstance.findMany({
      where: {
        author: {
          name: user
        }
      }
    });

    const mappedHeroes = mapHeroes(heroes, heroInstances);
    res.status(200).json(mappedHeroes);
  } catch (err) {
    console.error(err);
    res.status(403).json({ err: "Error occured." });
  }
};