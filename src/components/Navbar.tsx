import { Navbar as MNavbar, Select } from '@mantine/core';
import { useGamesContext } from '@/context/GamesContext';
import { trpc } from '@/utils/trpc';
import { useEffect } from 'react';

type props = {
  opened: boolean
}

const Navbar: React.FC<props> = (props) => {
  const { setUniqueTournaments, uniqueTournaments, currentTournament, setCurrentTournament, setGames, games, currentGameId, setCurrentGameId } = useGamesContext();
  
  // get unique tournaments
  const { data: tournamentData } = trpc.useQuery(["game.getUniqueTournaments"], { refetchOnWindowFocus: false});
  // every time the unique tournaments change, update the state
  useEffect(() => {
    if (tournamentData) {
      console.log(tournamentData)
      setUniqueTournaments(tournamentData);
    }
  }, [tournamentData])

  // get games for the current tournament
  const { refetch } = trpc.useQuery([
    'game.getSpecificGames', 
    { tournament: currentTournament },
  ], { 
    // don't call on first render
    enabled: false, 
    refetchOnWindowFocus: false
  });

  // every time currentTournament changes, refetch the games
  useEffect(() => {
    if (currentTournament === null) return;
    refetch().then(({ data }) => {
      if (data === undefined) return;
      if (data === "Tournament is required") {
        console.log(data);
        return;
      };
      setGames(data);
    })
  }, [currentTournament])

  return (
  <MNavbar p="md" hiddenBreakpoint="sm" hidden={!props.opened} width={{ sm: 200, lg: 300}}>
    <Select 
      label="Tournament"
      placeholder="Pick a Tournament"
      data={uniqueTournaments.map(tournament => ({ value: tournament, label: tournament }))}
      value={currentTournament}
      onChange={setCurrentTournament}
    />
    <Select
      label="Game"
      placeholder={currentTournament ? "Pick a Game" : "Tournament First"}
      disabled={currentTournament === null}
      data={games.map(game => ({ value: game.id, label: game.name}))}
      value={currentGameId}
      onChange={setCurrentGameId}
    />
  </MNavbar>
  )
}

export default Navbar;