import { MantineProvider, ColorSchemeProvider, ColorScheme, Paper } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import DoubleNav from './components/DoubleNav';
import Sidenav from './components/Sidenav';
import Routes from './Routes';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }}>
        <Paper radius={0} style={{height: "100vh", display: "flex"}}>
          <DoubleNav />
          <Routes />
        </Paper>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App