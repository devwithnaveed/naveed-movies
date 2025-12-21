import React from "react";
import { useNavigate } from "react-router-dom";
import "styles/Banner.css";

const BASE_URL = "http://localhost:8080";

const Banner = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const getPosterUrl = (poster) => {
    if (!poster) return "";
    if (poster.startsWith("http")) return poster;
    return `${BASE_URL}${poster}`;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${getPosterUrl(movie.poster)})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">{movie.title}</h1>
        <div>
          <button
            className="banner_button"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            Play
          </button>
          <button
            className="banner_button"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            My List
          </button>
        </div>
        <h1 className="banner_description">
          {truncate(movie.description, 150)}
        </h1>
        <p className="banner_release_date">
          Release Date: {movie.releaseDate}
        </p>
      </div>
      <div className="fade" />
    </header>
  );
};

export default Banner;
