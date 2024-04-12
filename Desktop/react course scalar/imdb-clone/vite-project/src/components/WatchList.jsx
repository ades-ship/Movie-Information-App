import React, { useEffect, useState } from "react";
import genreids from "../Utility/genre";
function WatchList({ watchlist, setWatchList, handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genre"]);
  const [currGenre, setCurrGenre] = useState("All Genres");

  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });

    setWatchList([...sortedIncreasing]);
  };

  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });

    setWatchList([...sortedDecreasing]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
    console.log(temp);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4 hover:cursor-pointer">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => handleFilter(genre)}
              className={
                currGenre == genre
                  ? " hover:cursor-pointer flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4"
                  : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      {/* // make the input search text area */}
      <div>
        <div className="flex justify-center my-4">
          <input
            onChange={handleSearch}
            value={search}
            type="text"
            placeholder="search movie"
            className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
          />
        </div>
      </div>
      {/* // make the table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div onClick={sortIncreasing} className="p-2">
                  <i class="fa-solid fa-arrow-up hover:cursor-pointer"></i>
                </div>
                <div className="p-2">Ratings</div>
                <div onClick={sortDecreasing} className="p-2">
                  <i class="fa-solid fa-arrow-down hover:cursor-pointer"></i>
                </div>
              </th>

              <th>
                <div onClick={sortIncreasing}>
                  <i class="fa-solid fa-arrow-up hover:cursor-pointer"></i>
                </div>
                <div>Popularity</div>
                <div onClick={sortDecreasing}>
                  <i class="fa-solid fa-arrow-down hover:cursor-pointer"></i>
                </div>
              </th>

              <th>Genres</th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currGenre == "All Genres") {
                  return true;
                } else {
                  return genreids[movieObj.genre_ids[0]] == currGenre;
                }
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt=""
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>

                    <td
                      onClick={() => handleRemoveFromWatchlist(movieObj)}
                      className="text-red-800"
                    >
                      <div className="hover:cursor-pointer">Delete</div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
