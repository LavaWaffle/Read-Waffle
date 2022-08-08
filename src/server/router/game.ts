import { createRouter } from "./context";
import { z } from "zod";

export const gameRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.game.findMany({
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
    },
  })
  .query("getUniqueTournaments", {
    async resolve ({ ctx }) {
      // TODO: This is a hacky way to get the unique tournaments.
      const tournaments =  await ctx.prisma.game.findMany({
        select: {
          tournament: true,
        }
      });
      const tournamentsList = tournaments.map(tournament => tournament.tournament);
      // return unique tournaments
      return [...new Set(tournamentsList)];
    },
  });
