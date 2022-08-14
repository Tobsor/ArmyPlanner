
import prisma from "../../lib/prisma";

export default async (req, res) => {
  const args = JSON.parse(req.body);

  try {
    await prisma.heroInstance.create({ data: args });
    
    res.status(200).json("Okay");
  } catch (err) {
    console.error(err);
    res.status(403).json({ err: "Error occured." });
  }
};