import { MantineProvider, ColorSchemeProvider, ColorScheme, Paper } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import Router from './Router';

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
        <Router />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App