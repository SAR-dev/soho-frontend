import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import Router from './Router';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      {/* theme={{ colorScheme: 'dark' }} */}
      <MantineProvider theme={{ colorScheme }}>
        <NotificationsProvider>
          <Router />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App