import { AppShell, useMantineTheme, Burger, Header, MediaQuery, Text } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import React, { useState } from "react";

import Navbar from './Navbar';
type props = {
  children: JSX.Element
}


const Layout: React.FC<props> = (props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  

  return (
    <>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbar={
          <Navbar opened={opened} />
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