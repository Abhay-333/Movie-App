import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncLoadMovie, removeMovie } from "../Store/Actions/MovieActions";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, []);
  return <div>MovieDetials</div>;
};

export default MovieDetails;
