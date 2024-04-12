import React, { useEffect, useState } from "react";
import MovieCards from "./MovieCards";
import axios from "axios";
import Pagination from "./Pagination";
function Movies({
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo === 1) {
      setPageNo(pageNo);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  // Fetch movies data from tmdb api
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=d29aa45e411375dcfb8c032a4308ac09&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        console.log(res.data.results);
        // console.log(res.data.results.original_title);
        setMovies(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-2xl font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-8">
        {/* render the movies card to the the UI */}
        {movies.map((movieObj) => {
          return (
            <MovieCards
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            />
          );
        })}
      </div>
      {/* call the normal static movie cards with out api attributes */}
      {/* <MovieCards/> 
        <MovieCards/> 
        <MovieCards/> 
        <MovieCards/>  */}

      <Pagination
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}

export default Movies;

// tmdb api key
// https://api.themoviedb.org/3/movie/{}?api_key=d29aa45e411375dcfb8c032a4308ac09&language=en-US
// d29aa45e411375dcfb8c032a4308ac09
//  https://api.themoviedb.org/3/movie/popular?api_key=d29aa45e411375dcfb8c032a4308ac09&language=en-US&page=1
