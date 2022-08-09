import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type GameContextProviderProps = {
  children: ReactNode;
}

type GameContext = {
  uniqueTournaments: string[],
  setUniqueTournaments: Dispatch<SetStateAction<string[]>>,
}

const GameContext = createContext({} as GameContext);

export function useGamesContext() {
  return useContext(GameContext);
}

export function GamesContextProvider({ children }: GameContextProviderProps) {
  const [uniqueTournaments, setUniqueTournaments] = useState<string[]>([]);
  
  return (
    <GameContext.Provider value={{
      uniqueTournaments,
      setUniqueTournaments
    }}>
      {children}
    </GameContext.Provider>
  )
}