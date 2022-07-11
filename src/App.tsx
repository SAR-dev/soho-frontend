import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Router from "./Router";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SigninModalManager } from "@reusable/modal/SigninModalManager";
import { ModalsProvider } from "@mantine/modals";

const queryClient = new QueryClient();

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={{ colorScheme }}>
          <NotificationsProvider>
            <ModalsProvider modals={{ signin: SigninModalManager }}>
              <Router />
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
