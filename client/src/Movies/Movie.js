import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const history = useHistory()
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res => {getMovieList(); history.push('/')})
    .catch(err => console.log(err))
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div>
        <button className="save-button" onClick={saveMovie} >Save</button>
        <button onClick={() =>history.push(`/update-movie/${params.id}`)}>Edit</button>
        <button onClick={deleteMovie}>Delete</button>
      </div>
    </div>
  );
}

export default Movie;
