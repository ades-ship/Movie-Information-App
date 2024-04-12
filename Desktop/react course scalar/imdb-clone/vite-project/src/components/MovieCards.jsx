import React from "react";

function MovieCards({
  movieObj,
  name,
  poster_path,
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        //this is static image
        // backgroundImage: `url(https://i.pinimg.com/originals/29/7d/e0/297de0761b0c756266d74ca50d03cc1d.jpg)`
        // image poster coming from api TMDB
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchlist(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#128525;
        </div>
      )}
      <div
        onClick={() => handleAddtoWatchlist(movieObj)}
        className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
      >
        &#128525;
      </div>
      <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60">
        {name}
      </div>
    </div>
  );
}

export default MovieCards;

// // withpout api
// import React from "react";

// function MovieCards() {
//   return (
//     <div
//       className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
//       style={{
//         //this is static image
//           backgroundImage: `url(https://i.pinimg.com/originals/29/7d/e0/297de0761b0c756266d74ca50d03cc1d.jpg)`
//         // image poster coming from api TMDB

//       }}
//     >
//       <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60">

//       </div>
//     </div>
//   );
// }

// export default MovieCards;
