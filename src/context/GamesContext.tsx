import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
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
  setGames: Dispatch<SetStateAction<Game[]>>,
  currentGameId: string | null,
  setCurrentGameId: Dispatch<SetStateAction<string | null>>,
  currentGame: Game | undefined,
}

const GameContext = createContext({} as GameContext);

export function useGamesContext() {
  return useContext(GameContext);
}

export function GamesContextProvider({ children }: GameContextProviderProps) {
  const [uniqueTournaments, setUniqueTournaments] = useState<string[]>([]);
  const [currentTournament, setCurrentTournament] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [currentGame, setCurrentGame] = useState<Game | undefined>();
  
  function getCurrentGame() {
    return games.find(game => game.id === currentGameId);
  }

  useEffect(() => {
    const game = getCurrentGame();
    if (game === undefined) return;
    setCurrentGame(game);
  }, [games, currentGameId]);

  return (
    <GameContext.Provider value={{
      uniqueTournaments,
      setUniqueTournaments,
      currentTournament,
      setCurrentTournament,
      games,
      setGames,
      currentGameId,
      setCurrentGameId,
      currentGame,
    }}>
      {children}
    </GameContext.Provider>
  )
}