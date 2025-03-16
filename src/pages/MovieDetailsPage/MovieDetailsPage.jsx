import { useEffect, useState } from "react";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../../components/api";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";
import { VscArrowLeft } from "react-icons/vsc";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <button className={css.btn} onClick={() => navigate(-1)}>
        <VscArrowLeft /> Go back
      </button>
      <div className={css.container}>
        <img
          className={css.img}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
        />
        <div className={css.description}>
          <h2 className={css.title}>
            {movie.title} ({movie.release_date.substring(0, 4)})
          </h2>
          <p className={css.userScore}>
            User Score: {Math.round(movie.vote_average * 10)}%
          </p>
          <h3 className={css.titleOverview}>Overview</h3>
          <p className={css.overview}>{movie.overview}</p>
          <h3 className={css.genresTitle}>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(" ")}</p>
        </div>
      </div>
      <div className={css.aditional}>
        <p>Aditional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
