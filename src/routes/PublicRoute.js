import useAppStateContext from "../hooks/useAppStateContext";
import {Navigate, Outlet} from "react-router-dom";

const publicRoutes = () => {
  const {appState} = useAppStateContext();

  return !appState.isAuthenticated && !appState.user ? (
    <Outlet/>
  ) : (
    <Navigate to="/home"/>
  )
}

export default publicRoutes;