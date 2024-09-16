import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadMovie, removeMovie } from "../Store/Actions/MovieActions";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loading from "./Loading";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SiWikipedia } from "react-icons/si";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import HorizontalCards from "./Templates/HorizontalCards";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          info.detail.poster_path || info.detail.backdrop_path
        })`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full min-h-[170vh] px-[6%] relative"
    >
      <nav className="flex items-center justify-start  gap-10 h-[10vh]">
        <FaArrowLeftLong
          onClick={() => navigate(-1)}
          className="text-[1.7vw] cursor-pointer text-zinc-200"
        />

        <a
          href={`${info.detail.homepage}`}
          target="_blank"
          className="text-[1.7vw] cursor-pointer text-zinc-200"
        >
          <FaExternalLinkAlt />
        </a>

        <a
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
          target="_blank"
          className="text-[1.7vw] cursor-pointer text-zinc-200"
        >
          <SiWikipedia />
        </a>

        <a
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}
          target="_blank"
          className="text-[1.7vw] cursor-pointer text-zinc-200"
        >
          IMDB
        </a>
      </nav>

      <div className="parent flex items-start w-[100%]">
        <div className="leftChild flex flex-col w-[31%]">
          {" "}
          <div className="img-div w-[19vw] overflow-hidden rounded-lg  shadow-xl border mt-[3%]">
            <img
              className="w-full h-full object-cover object-center"
              src={`https://image.tmdb.org/t/p/original/${
                info.detail.poster_path || info.detail.backdrop_path
              }`}
              alt=""
            />
          </div>
          <div className="mt-[2%] ">
            <div className="flex gap-4 items-center">
              {info.watchProviders && info.watchProviders.flatrate && (
                <>
                  <h1>Available on Platform: </h1>
                  {info.watchProviders.flatrate.map((w, i) => (
                    <div key={i}>
                      <img
                        title={w.provider_name}
                        className="w-[8vh] rounded-lg"
                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                        alt={w.provider_name}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="flex gap-2 items-center my-[2%]">
              {info.watchProviders && info.watchProviders.rent && (
                <>
                  <h1>Available on Rent: </h1>
                  {info.watchProviders.rent.map((w, i) => (
                    <div key={i}>
                      <img
                        title={w.provider_name}
                        className="w-[8vh] rounded-lg"
                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                        alt={w.provider_name}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="flex gap-4 items-center">
              {info.watchProviders && info.watchProviders.buy && (
                <>
                  <h1>Available to Buy:</h1>
                  {info.watchProviders.buy.map((w, i) => (
                    <div key={i}>
                      <img
                        title={w.provider_name}
                        className="w-[8vh] rounded-lg"
                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                        alt={w.provider_name}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="rightChild w-[69%]">
          <div className="content">
            <h1 className="text-[3.8vw] font-black leading-none">
              {info.detail.original_name ||
                info.detail.title ||
                info.detail.name ||
                info.detail.original_title}

              <small className="text-[1.5vw]">
                ({info.detail.release_date.split("-", 1, [0])})
              </small>
            </h1>
            <div className="tagline text-[1.5vw] font-medium leading-10">
              {info.detail.tagline}
            </div>

            {info.detail.vote_average && (
              <div className="flex items-center gap-3">
                <h1 className="font-semibold">Ratings: </h1>
                <div className="rating bg-yellow-500 font-bold h-[7vh] w-[3.5vw] flex items-center justify-center rounded-full">
                  {info.detail.vote_average.toFixed(2)} <sup>*</sup>
                </div>
              </div>
            )}

            <div className="release-date flex items-center gap-2">
              <h1 className="font-semibold">Release Date: </h1>
              {new Date(info.detail.release_date).toDateString()}.
            </div>

            <div className="genre flex items-center gap-2">
              <h1 className="font-semibold">Genres: </h1>
              {info.detail.genres.map((g) => g.name).join(", ")}.
            </div>

            <div className="movieLength flex items-center gap-2">
              <h1 className="font-semibold">Movie Length: </h1>
              {info.detail.runtime} minutes.
            </div>

            <div className="overview flex items-start w-full gap-2">
              <h1 className="font-semibold">Overview: </h1>
              {info.detail.overview}
            </div>

            {/* <div className="translations flex items-start w-full gap-2">
              <h1 className="font-semibold">Translations: </h1>
              {info.translations.join(", ")}
            </div> */}

            <Link to={`${pathname}/trailer`}>
              <button className="bg-[#7F40D1] mt-6 py-4 rounded-lg px-5 font-medium flex items-center gap-2">
                <FaPlay className="text-[0.8vw]" />
                Watch Trailer
              </button>
            </Link>  
          </div>
        </div>
      </div>
      <h1 className="my-[2%] text-3xl font-black">Recommendations & Similar</h1>
      <hr className="my-[1%] h-[1px] border-gray-400" />
      <div className="flex flex-col gap-2 w-full"></div>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet/>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
