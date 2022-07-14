import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";
import { useGlobalContext } from "./context";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const idMovie = useParams().id;

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const fetchMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "False") {
        setError({ show: true, msg: data.Error });
      } else {
        setMovie(data);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${idMovie}`);
  }, [idMovie]);
  const {
    imdbID: id,
    Poster: poster,
    Title: title,
    Year: year,
    Plot: plot,
  } = movie;
  if (isLoading) {
    return <div className="loading"></div>;
  }
  if(error.show){
    return <div className="page-error">
      <h1>PAGE NOT FOUND</h1>
      <button className="btn">
            <Link to="/">Back to Home</Link>
          </button>
    </div>
  }
  return (
    <>
      <section key={idMovie} className="single-movie">
        <img src={poster === "N/A" ? url : poster} alt={title} />
        <div className="single-movie-info">
          <h2>{title}</h2>
          <p>{plot}</p>
          <p>{year}</p>
          <button className="btn">
            <Link to="/">Back to Home</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default SingleMovie;
