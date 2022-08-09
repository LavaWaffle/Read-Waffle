import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import type { Game as game, RankingPoint as rankingPoint, Points as points, Launch as launch } from '@prisma/client';
import { trpc } from '@/utils/trpc';

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
  setGames: Dispatch<SetStateAction<Game[]>>,
  currentGame: Game | null,
  setCurrentGame: Dispatch<SetStateAction<Game | null>>,
}

const GameContext = createContext({} as GameContext);

export function useGamesContext() {
  return useContext(GameContext);
}

export function GamesContextProvider({ children }: GameContextProviderProps) {
  const [uniqueTournaments, setUniqueTournaments] = useState<string[]>([]);
  const [currentTournament, setCurrentTournament] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  return (
    <GameContext.Provider value={{
      uniqueTournaments,
      setUniqueTournaments,
      currentTournament,
      setCurrentTournament,
      games,
      setGames,
      currentGame,
      setCurrentGame,
    }}>
      {children}
    </GameContext.Provider>
  )
}