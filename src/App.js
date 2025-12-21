import {Route, Routes} from "react-router-dom";
import MoviePage from "pages/MoviePage";
import LoginPage from "pages/LoginPage";
import MovieDetailPage from "pages/MovieDetailPage";
import NotFoundPage from "pages/NotFoundPage";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";


function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<MoviePage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </>
  );
}

export default App;
