import { AppShell, Footer, useMantineTheme, Button } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import React from "react";
import { useMediaQuery } from '@mantine/hooks';
type props = {
  children: JSX.Element
}


const Layout: React.FC<props> = (props) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useMantineTheme();
  return (
    <>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        footer={
          <Footer height={60} p="md">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>   
              <ColorSchemeToggle />
              {/* middle */}
              <div style={{paddingLeft: isMobile === false ? "4.5rem" : "", gap: "2rem"}} >
                <Button 
                  style={{marginTop: '-0.25rem', marginRight: '1rem'}} 
                  variant="outline" 
                  color='pink'
                >
                  Auto Data
                </Button>

                <Button 
                  style={{marginTop: '-0.25rem'}} 
                  variant="outline" 
                  color='pink'
                >
                  End Game Data
                </Button>
              </div>
              {/* right */}
              <div>
                <Button 
                    style={{marginTop: '-0.25rem'}} 
                    variant="outline" 
                    color='pink'
                  >
                  Upload
                </Button>
              </div>
              </div>
          </Footer>
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