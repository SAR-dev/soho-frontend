import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./components/pages/Home"
import { Error404 } from "./components/pages/Error404"


function Router() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="*" element={ <Error404/> } />
        <Route path="/" element={ <Home/> } />
      </Routes>
      </BrowserRouter>
  )
}

export default Router