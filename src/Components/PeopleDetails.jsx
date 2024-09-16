import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadPeople, removePeople } from "../Store/Actions/PeopleActions";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loading from "./Loading";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SiWikipedia } from "react-icons/si";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import HorizontalCards from "./Templates/HorizontalCards";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import noImg from "../Resources/no-img.webp";
import DropDown from "../Components/Templates/DropDown";

const PeopleDetails = () => {
  const { info } = useSelector((state) => state.people);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncLoadPeople(id));
    return () => {
      dispatch(removePeople());
    };
  }, [id]);

  return info ? (
    <div className="w-full min-h-[250vh] px-[6%] bg-[#1D1C23] relative">
      <nav className="flex items-center justify-start gap-10 h-[10vh]">
        <FaArrowLeftLong
          onClick={() => navigate(-1)}
          className="text-[1.7vw] cursor-pointer text-zinc-200"
        />

        {/* <a
          href={`${info.details.homepage}`}
          target="_blank"
          className="text-[1.7vw] cursor-pointer text-zinc-200"
        >
          <FaExternalLinkAlt />
        </a> */}

        {info.externalId.wikidata_id ? (
          <a
            href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
            target="_blank"
            className="text-[1.7vw] cursor-pointer text-zinc-200"
          >
            <SiWikipedia />
          </a>
        ) : null}

        {info.externalId.imdb_id ? (
          <a
            href={`https://www.imdb.com/name/${info.externalId.imdb_id}/`}
            target="_blank"
            className="text-[1.7vw] cursor-pointer text-zinc-200"
          >
            IMDB
          </a>
        ) : null}
      </nav>

      <div className="parent flex items-start w-[100%]">
        <div className="leftChild flex flex-col w-[31%]">
          <div className="img-div w-[19vw] overflow-hidden rounded-lg  shadow-xl border mt-[3%]">
            <img
              className="w-full h-full object-cover object-center"
              src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
              alt=""
            />
          </div>

          <div className="mt-[4%] ">
            <div className="flex gap-4 items-center">
              {info.externalId.facebook_id ? (
                <Link
                  target="_blank"
                  to={`https://www.facebook.com/${info.externalId.facebook_id}`}
                >
                  <FaFacebook className="text-2xl" />
                </Link>
              ) : null}

              {info.externalId.instagram_id ? (
                <Link
                  target="_blank"
                  to={`https://www.instagram.com/${info.externalId.instagram_id}`}
                >
                  <FaInstagram className="text-2xl" />
                </Link>
              ) : null}

              {info.externalId.twitter_id ? (
                <Link
                  target="_blank"
                  to={`https://www.instagram.com/${info.externalId.instagram_id}`}
                >
                  <FaXTwitter className="text-2xl" />
                </Link>
              ) : null}

              {info.externalId.youtube_id ? (
                <Link
                  target="_blank"
                  to={`https://www.youtube.com/channel/${info.externalId.youtube_id}`}
                >
                  <FaYoutube className="text-2xl" />
                </Link>
              ) : null}
            </div>

            <hr className="my-[3%] h-[1px] border-[gray] w-[70%]" />

            <div className="flex flex-col gap-2 items-start my-[2%] text-sm leading-none">
              {info.details.birthday ? (
                <p>
                  Birthday: {new Date(info.details.birthday).toDateString()}.
                </p>
              ) : null}

              {info.details.deathday ? (
                <p>Death: {new Date(info.details.deathday).toDateString()}.</p>
              ) : (
                <p>Death: Still Alive.</p>
              )}

              {info.details.gender === 2 ? (
                <p>Gender: Male.</p>
              ) : (
                <p>Gender: Female.</p>
              )}

              {info.details.known_for_department ? (
                <p className="capitalize">
                  known for department: {info.details.known_for_department}.
                </p>
              ) : null}

              {info.details.place_of_birth ? (
                <p className="capitalize">
                  place of birth: {info.details.place_of_birth}.
                </p>
              ) : null}
            </div>

            {/* <div className="flex gap-4 items-center">
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
            </div> */}
          </div>
        </div>

        <div className="rightChild w-[69%]">
          <div className="content">
            <h1 className="text-[3.8vw] font-black leading-none">
              {info.details.name}

              {/* <small className="text-[1.5vw]">
                ({info.details.birthday.split("-", 1, [0])})
              </small> */}
            </h1>

            {/* <div className="tagline text-[1.5vw] font-medium leading-10">
              {info.details.place_of_birth}
            </div> */}

            {/* {info.details.vote_average && (
              <div className="flex items-center gap-3">
                <h1 className="font-semibold">Ratings: </h1>
                <div className="rating bg-yellow-500 font-bold h-[7vh] w-[3.5vw] flex items-center justify-center rounded-full">
                  {info.details.vote_average.toFixed(2)} <sup>*</sup>
                </div>
              </div>
            )} */}

            {/* <div className="release-date flex items-center gap-2">
              <h1 className="font-semibold">Release Date: </h1>
              {new Date(info.details.birthday).toDateString()}.
            </div> */}

            {/* <div className="genre flex items-center gap-2">
              <h1 className="font-semibold">Genres: </h1>
              {info.details.genres.map((g) => g.name).join(", ")}.
            </div> */}

            {/* <div className="movieLength flex items-center gap-2">
              <h1 className="font-semibold">Movie Length: </h1>
              {info.details.runtime} minutes.
            </div> */}

            <div className="biography mt-[2%] flex items-start w-full gap-2">
              <h1 className="font-semibold">Biography: </h1>
              <p>{info.details.biography}</p>
            </div>

            <div className="worked mt-[3%]">
              <h1 className="font-semibold">Worked In: </h1>
              <div className="flex gap-2 w-full max-h-[58vh] px-5 py-3 overflow-y-auto">
                {info.combinedCredits.cast.map((c, i) => (
                  <div className="flex w-[15vw] flex-col flex-shrink-0">
                    <img
                      key={i}
                      className="w-[15vw]"
                      src={
                        c.poster_path
                          ? `https://image.tmdb.org/t/p/original/${c.poster_path}`
                          : noImg
                      }
                      alt=""
                    />

                    <h1 className="font-semibold">{c.name}</h1>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="translations flex items-start w-full gap-2">
              <h1 className="font-semibold">Translations: </h1>
              {info.translations.join(", ")}
            </div> */}

            {/* <Link to={`${pathname}/trailer`}>
              <button className="bg-[#7F40D1] mt-6 py-4 rounded-lg px-5 font-medium flex items-center gap-2">
                <FaPlay className="text-[0.8vw]" />
                Watch Trailer
              </button>
            </Link> */}
          </div>
        </div>
      </div>

      <div className="w-full mt-[5%] flex justify-start items-center gap-20">
        <h1 className="text-4xl font-semibold">Cast Detials</h1>

        <DropDown
          title="Category"
          options={["tv", "movie"]}
          Func={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className=" w-full h-[50vh] flex flex-col overflow-x-hidden overflow-y-auto mt-[3%]">
        {info[category + "Credits"].cast.map((c, i) => (
          <Link to={`/${category}/details/${c.id}`} className="elem flex flex-col items-start justify-center px-[5%] h-[10vh] p-5 border-[1px] rounded-md border-[#807f7f] duration-300 bg-zinc-800 hover:bg-zinc-700 ">
            
            <h1 className="font-bold capitalize">
              {category}:{" "}
              {c.original_name ||
                c.title ||
                c.name ||
                c.original_title}
            </h1>

            {c.character ? <h1 className="font-bold">Character: {c.character}</h1> : null}
            
          </Link>
        ))}
      </div>

      {/* <h1 className="my-[2%] text-3xl font-black">Recommendations & Similar</h1> */}
      {/* <hr className="my-[1%] h-[1px] border-gray-400" /> */}
      {/* <div className="flex flex-col gap-2 w-full"></div> */}

      {/* <Outlet /> */}
    </div>
  ) : (
    <Loading />
  );
};

export default PeopleDetails;
