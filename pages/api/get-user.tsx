import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  console.log("getting user")
  const username = JSON.parse(req.body).username;

  const user = await prisma.user.findFirst({
    where: {
      name: username
    }
  });

  console.log(user)

  if(!user) {
    res.status(200).json({});
    return;
  }

  res.status(200).json(user);
}