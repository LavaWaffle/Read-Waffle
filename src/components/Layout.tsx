import { AppShell, useMantineTheme, Navbar, Burger, Header, MediaQuery, Text, Select } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import React, { useState } from "react";
import { useMediaQuery } from '@mantine/hooks';
import { useGamesContext } from '@/context/GamesContext';
type props = {
  children: JSX.Element
}


const Layout: React.FC<props> = (props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { uniqueTournaments, currentTournament, setCurrentTournament, games } = useGamesContext();
  return (
    <>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300}}>
            <Select 
              label="Tournament"
              placeholder="Pick a Tournament"
              data={uniqueTournaments.map(tournament => ({ value: tournament, label: tournament }))}
              value={currentTournament}
              onChange={setCurrentTournament}
            />
            <Select
              label="Game"
              placeholder="Pick a Game"
              data={games.map(game => ({ value: game.id, label: game.name}))}
            />
          </Navbar>
        }
        header={
          <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between'}}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Text className='text-3xl'>Read Waffle</Text>
              <ColorSchemeToggle />
            </div>
          </Header>
        }
      >
        <main>
          {props.children}
        </main>
      </AppShell>
    </>
  )
}

export default Layout;