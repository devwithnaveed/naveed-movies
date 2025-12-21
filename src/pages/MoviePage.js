import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { movieApi } from "constants/axios";
import { movieRequests } from "constants/requests";
import Navbar from "components/Navbar";
import Banner from "components/Banner";
import "styles/Row.css";
import "styles/Banner.css";

const BASE_URL = "http://localhost:8080";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const navigate = useNavigate();

  const fetchMovies = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await movieApi.get(movieRequests.movies, {
        params: {
          page,
          limit: 10,
        },
      });
      const { data, meta } = response.data;

      setMovies(data);
      setPagination({
        page: meta.page,
        limit: meta.limit,
        total: meta.total,
        totalPages: meta.totalPages,
        hasNextPage: meta.hasNextPage,
        hasPrevPage: meta.hasPrevPage,
      });
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchMovies(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPosterUrl = (poster) => {
    if (!poster) return "https://via.placeholder.com/300x450?text=No+Image";
    if (poster.startsWith("http")) return poster;
    return `${BASE_URL}${poster}`;
  };

  const featuredMovie =
    movies.find((movie) => movie.poster?.startsWith("http")) || movies[0];

  if (loading && movies.length === 0) {
    return (
      <div className="movie-page">
        <Navbar />
        <div className="no-comments-message">
          <span>Loading movies...</span>
        </div>
      </div>
    );
  }

  if (error && movies.length === 0) {
    return (
      <div className="movie-page">
        <Navbar />
        <div className="no-comments-message">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-page">
      <Navbar />

      {/* Hero Banner */}
      <Banner movie={featuredMovie} />

      {/* Movies Row */}
      <div className="row">
        <h2>Popular Movies</h2>

        <div className="row_posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row_poster row_posterLarge"
              src={getPosterUrl(movie.poster)}
              alt={movie.title}
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
          ))}
        </div>

        {pagination.totalPages > 1 && (
          <div className="movie_options">
            <button
              className="movie_button"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPrevPage}
            >
              ← Previous
            </button>

            <span style={{ color: "white", margin: "0 15px" }}>
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              className="movie_button"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNextPage}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
