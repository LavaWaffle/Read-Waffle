import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

type GameContextProviderProps = {
  children: ReactNode;
}

type GameContext = {
  uniqueTournaments: string[],
  setUniqueTournaments: Dispatch<SetStateAction<string[]>>,
  currentTournament: string | null,
  setCurrentTournament: Dispatch<SetStateAction<string | null>>,
}

const GameContext = createContext({} as GameContext);

export function useGamesContext() {
  return useContext(GameContext);
}

export function GamesContextProvider({ children }: GameContextProviderProps) {
  const [uniqueTournaments, setUniqueTournaments] = useState<string[]>([]);
  const [currentTournament, setCurrentTournament] = useState<string | null>(null);
  
  return (
    <GameContext.Provider value={{
      uniqueTournaments,
      setUniqueTournaments,
      currentTournament,
      setCurrentTournament,
    }}>
      {children}
    </GameContext.Provider>
  )
}