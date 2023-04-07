import {
  formSearch,
  searchMovieInput,
  currentWatchlist,
  suggestedList,
  previouslyWatchedList,
  emptyCurrentlyWatching,
  emptySuggestedList,
  emptyPreviouslyWatchedList,
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
  const currentlyWatchingData = await getDataFromAPI(API_CURRENT_WATCH);
  const suggestedData = await getDataFromAPI(API_SUGGESTED);
  const previousData = await getDataFromAPI(API_PREVIOUS);

  if (currentlyWatchingData.length === 0) {
    displayEmptyAPIResult(emptyCurrentlyWatching);
  } else {
    currentlyWatchingData.forEach((movie) => {
      displayMovieImage(currentWatchlist, movie.image, movie.title, movie.rating, movie.id);
    });
  };

  if (suggestedData.length === 0) {
    displayEmptyAPIResult(emptySuggestedList);
  } else {
    suggestedData.forEach((movie) => {
      displayMovieImage(suggestedList, movie.image, movie.title, movie.rating, movie.id);
    });
  };

  if (previousData.length === 0) {
    displayEmptyAPIResult(emptyPreviouslyWatchedList);
  } else {
    previousData.forEach((movie) => {
      displayMovieImage(previouslyWatchedList, movie.image, movie.title, movie.rating, movie.id);
    });
  };
};

btnToggleSearch.addEventListener("click", () => {
  toggleSearchBar(formSearchMobile);
})