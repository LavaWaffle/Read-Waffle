import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { prisma } from "@/server/db/client";
import type { Game as game, RankingPoint as rankingPoint, Points as points, Launch as launch } from '@prisma/client';

export type Points = points & {
  launches: launch[],
}

export type Game = game & {
  markers: Points[] ;
  rankingPoints: rankingPoint[];
}

type GameContextProviderProps = {
  children: ReactNode;
}

type GameContext = {
  uniqueTournaments: string[],
  setUniqueTournaments: Dispatch<SetStateAction<string[]>>,
  currentTournament: string | null,
  setCurrentTournament: Dispatch<SetStateAction<string | null>>,
  games: Game[],
}

const GameContext = createContext({} as GameContext);

export function useGamesContext() {
  return useContext(GameContext);
}

export function GamesContextProvider({ children }: GameContextProviderProps) {
  const [uniqueTournaments, setUniqueTournaments] = useState<string[]>([]);
  const [currentTournament, setCurrentTournament] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    async function fetchGames() {
      if (currentTournament === null) return;
      const games = await prisma.game.findMany({
        where: {
          tournament: currentTournament,
        },
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          markers: {
            include: {
              launches: true
            }
          },
          rankingPoints: true,
        }
      })
      setGames(games);
    }
    fetchGames();
  }, [currentTournament])
  return (
    <GameContext.Provider value={{
      uniqueTournaments,
      setUniqueTournaments,
      currentTournament,
      setCurrentTournament,
      games,
    }}>
      {children}
    </GameContext.Provider>
  )
}