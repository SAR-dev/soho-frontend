import { useEffect, useLayoutEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Error404 } from "./components/pages/Error404";
import { auth } from "./config/firebase";
import useStore from "./store";
import {
  getTokenFromLocal,
  removeTokenFromLocal,
  setTokenToLocal,
} from "./helpers";

function Router() {
  const { setToken, removeToken } = useStore();
  useLayoutEffect(() => {
    const t = getTokenFromLocal();
    if (t) {
      setTokenToLocal(t);
      setToken(t);
    }
    auth.onAuthStateChanged((credential) => {
      if (credential) {
        credential.getIdToken().then((token) => {
          setTokenToLocal(token);
          setToken(token);
        });
      } else {
        removeTokenFromLocal();
        removeToken();
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
