import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadTv, removeTv } from "../Store/Actions/TvActions";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { FaArrowLeftLong, FaPlay } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SiWikipedia } from "react-icons/si";
import { Link } from "react-router-dom";
import HorizontalCards from "./Templates/HorizontalCards";
import noImg from '../Resources/no-img.webp'

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncLoadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
          info.details.poster_path || info.details.backdrop_path
        })`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full min-h-[240vh] px-[6%] relative"
    >
      <nav className="flex items-center justify-start  gap-10 h-[10vh]">
        <FaArrowLeftLong
          onClick={() => navigate(-1)}
          className="text-[1.7vw] cursor-pointer text-zinc-200"
        />

        <a
          href={`${info.details.homepage}`}
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
                info.details.poster_path || info.details.backdrop_path
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
              {info.details.original_name ||
                info.details.title ||
                info.details.name ||
                info.details.original_title}

              <small className="text-[1.5vw]">
                ({info.details.first_air_date.split("-", 1, [0])})
              </small>
            </h1>
            <div className="tagline text-[1.5vw] font-medium leading-10">
              {info.details.tagline}
            </div>

            {info.details.vote_average && (
              <div className="flex items-center gap-3">
                <h1 className="font-semibold">Ratings: </h1>
                <div className="rating bg-yellow-500 font-bold h-[7vh] w-[3.5vw] flex items-center justify-center rounded-full">
                  {info.details.vote_average.toFixed(2)} <sup>*</sup>
                </div>
              </div>
            )}

            <div className="release-date flex items-center gap-2">
              <h1 className="font-semibold">First Air Date: </h1>
              {new Date(info.details.first_air_date).toDateString()}.
            </div>

            <div className="movieLength flex items-center gap-2">
              <h1 className="font-semibold">Last Air Date: </h1>
              {info.details.last_air_date}
            </div>

            <div className="genre flex items-center gap-2">
              <h1 className="font-semibold">Genres: </h1>
              {info.details.genres.map((g) => g.name).join(", ")}.
            </div>

            <div className="overview flex items-start w-full gap-2">
              <h1 className="font-semibold">Overview: </h1>
              {info.details.overview}
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

      <h1 className="my-[2%] text-3xl font-black">Seasons</h1>
      <hr className="my-[1%] h-[1px] border-gray-400" />

      <div className="flex gap-2 w-full min-h-[40vh] px-5 py-3 overflow-y-auto">
        {info.details.seasons &&
          info.details.seasons.map((s, i) => (
            <div className="flex flex-col flex-shrink-0">
               
                <img
                  key={i}
                  className="w-[18vw]"
                  src={s.poster_path ? `https://image.tmdb.org/t/p/original/${s.poster_path}` : noImg}
                  alt=""
                />
              
              <h1 className="font-semibold">{s.name}</h1>
            </div>
          ))}
      </div>

      <h1 className="my-[2%] text-3xl font-black">Recommendations & Similar</h1>
      <hr className="my-[1%] h-[1px] border-gray-400" />
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
