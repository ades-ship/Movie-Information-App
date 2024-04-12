import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";
import Pagination from "./components/Pagination";
import { useState, useEffect } from "react";
function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddtoWatchlist = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    // add movies item to localstorage
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  };

  // use the useEffect Hook to parse the movie to watchlist component from local storage
  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  }, []);

  let handleRemoveFromWatchlist = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });
    setWatchList(filteredWatchlist);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist));
    console.log(filteredWatchlist);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                  watchlist={watchlist}
                />
              </>
            }
          ></Route>

          <Route
            path="/watchlist"
            element={
              <WatchList
                watchlist={watchlist}
                setWatchList={setWatchList}
                handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
