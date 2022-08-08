// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=10, stale-while-revalidate=10');
  const examples = await prisma.game.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      markers: {
        include: {
          launches: true
        }
      },
      rankingPoints: true,
    }
  });
  res.status(200).json(examples);
};

export default examples;
