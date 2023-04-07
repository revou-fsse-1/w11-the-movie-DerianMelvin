import {
  formSearch,
  searchMovieInput,
  myWatchlist,
  btnToggleSearch,
  formSearchMobile,
  searchMovieInputMobile,
} from "../utils/variables.js";
import { API_WATCHLIST } from "../utils/constants.js";
import {
  getDataFromAPI,
  displayMovieImage,
  toggleSearchBar,
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

  myWatchlistData.forEach((movie) => {
    displayMovieImage(myWatchlist, movie.image, movie.title, movie.rating, movie.id);
  });
};

btnToggleSearch.addEventListener("click", () => {
  toggleSearchBar(formSearchMobile);
});
