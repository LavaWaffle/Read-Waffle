import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export const config = {
  runtime: 'experimental-edge'
}

const tournaments = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=10, stale-while-revalidate=10');
  const tournaments =  await prisma.game.findMany({
    select: {
      tournament: true,
    }
  });
  const tournamentsList = tournaments.map(tournament => tournament.tournament);
  // return unique tournaments
  const uniqueTournaments = [...new Set(tournamentsList)];
  res.status(200).json(uniqueTournaments);
};

export default tournaments;