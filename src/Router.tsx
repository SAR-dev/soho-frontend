import { useLayoutEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CHome } from "./components/pages/c/CHome";
import { Error404 } from "./components/pages/Error404";
import { auth } from "./config/firebase";
import useStore from "./store";
import {
  getTokenFromLocal,
  removeTokenFromLocal,
  setTokenToLocal,
} from "./helpers";
import { Offline, Online } from "react-detect-offline";
import { Error503 } from "./components/pages/Error503";
import { Home } from "./components/pages/Home";
import { SHome } from "./components/pages/c/s/SHome";
import { PType } from "./components/pages/t/PType";
import { PDetails } from "./components/pages/p/PDetails";
import { useNotifications } from "@mantine/notifications";
import { X } from "tabler-icons-react";

const polling = {
  enabled: true,
  interval: 5000,
  timeout: 5000,
  url: "https://ipv4.icanhazip.com",
};

function Router() {
  const { setToken, removeToken } = useStore();
    const notifications = useNotifications();
    useLayoutEffect(() => {
    const t = getTokenFromLocal();
    if (t) {
      setTokenToLocal(t);
      setToken(t);
    }
    auth.onAuthStateChanged((credential) => {
      if (credential) {
        credential.getIdToken(true).then((token) => {
          setTokenToLocal(token);
          setToken(token);
        });
      } else {
        removeTokenFromLocal();
        removeToken();
        notifications.showNotification({
          title: "Session expired!",
          message: "Please sign in again to continue",
          color: "red",
          icon: <X size={18} />,
      });
      }
    });
  }, []);

  return (
    <>
      {/* <Online polling={polling}> */}
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Home />} />
            <Route path="/c/:author" element={<PType />} />
            <Route path="/c/:author/p/:pId" element={<PDetails />} />
            <Route path="/c/:author/t/:pType" element={<PType />} />
            <Route path="/c/:author/ch/:cName" element={<CHome />} />
            <Route path="/c/:author/sch/:sName" element={<SHome />} />
          </Routes>
        </BrowserRouter>
      {/* </Online> */}
      {/* <Offline polling={polling}> */}
        {/* <Error503 /> */}
      {/* </Offline> */}
    </>
  );
}

export default Router;
