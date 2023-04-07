import {
  formSearch,
  searchMovieInput,
  currentWatchlist,
  suggestedList,
  previouslyWatchedList,
  btnToggleSearch,
  formSearchMobile,
  searchMovieInputMobile,
} from "../utils/variables.js";
import {
  API_CURRENT_WATCH,
  API_SUGGESTED,
  API_PREVIOUS,
} from "../utils/constants.js";
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
  const currentlyWatchingData = await getDataFromAPI(API_CURRENT_WATCH);
  const suggestedData = await getDataFromAPI(API_SUGGESTED);
  const previousData = await getDataFromAPI(API_PREVIOUS);

  currentlyWatchingData.forEach((movie) => {
    displayMovieImage(currentWatchlist, movie.image, movie.title, movie.rating, movie.id);
  });

  suggestedData.forEach((movie) => {
    displayMovieImage(suggestedList, movie.image, movie.title, movie.rating, movie.id);
  });

  previousData.forEach((movie) => {
    displayMovieImage(previouslyWatchedList, movie.image, movie.title, movie.rating, movie.id);
  });
};

btnToggleSearch.addEventListener("click", () => {
  toggleSearchBar(formSearchMobile);
})