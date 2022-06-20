import prisma from "../../lib/prisma";

export default async (req, res) => {
  const username = JSON.parse(req.body).username;

  const user = await prisma.user.findFirst({
    where: {
      name: username
    }
  });

  if(!user) {
    res.status(200).json({});
    return;
  }

  res.status(200).json(user);
}