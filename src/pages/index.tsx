import { useGamesContext } from "@/context/GamesContext";
import type { NextPage } from "next";

const Home: NextPage = () => {  
  const { currentGame } = useGamesContext();
  
  return (
    <>
      <h1>{currentGame ? currentGame.name : 'Select a game'}</h1>
    </>
  );
};

export default Home;
