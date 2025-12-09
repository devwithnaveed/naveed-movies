import {Navigate, Route, Routes} from "react-router-dom";
import MoviePage from "pages/MoviePage";
import LoginPage from "pages/LoginPage";
import MovieDetailPage from "pages/MovieDetailPage";
import NotFoundPage from "pages/NotFoundPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<MoviePage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
