import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";
import handleApiParameter from "@/utils/handleApiParameter";

const specificGames = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=10, stale-while-revalidate=10');
  const examples = await prisma.game.findMany({
    where: {
      tournament: {
        equals: handleApiParameter(req.query.tournament),
      }
    },
    orderBy: {
      createdAt: "asc",
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

export default specificGames;