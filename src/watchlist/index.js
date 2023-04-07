import {
  formSearch,
  searchMovieInput,
  myWatchlist,
  emptyWatchlist,
  btnToggleSearch,
  formSearchMobile,
  searchMovieInputMobile,
} from "../utils/variables.js";
import { API_WATCHLIST } from "../utils/constants.js";
import {
  getDataFromAPI,
  displayMovieImage,
  toggleSearchBar,
  displayEmptyAPIResult,
} from "../utils/functions.js";

/* 
  ================================================
    FUNCTIONS
  ================================================
*/

/* 
  ================================================
    EVENT LISTENERS
  ================================================
*/
window.onload = async () => {
  const myWatchlistData = await getDataFromAPI(API_WATCHLIST);

  if (myWatchlistData.length === 0) {
    displayEmptyAPIResult(emptyWatchlist);
  } else {
    myWatchlistData.forEach((movie) => {
      displayMovieImage(myWatchlist, movie.image, movie.title, movie.rating, movie.id);
    });
  };
};

btnToggleSearch.addEventListener("click", () => {
  toggleSearchBar(formSearchMobile);
});
