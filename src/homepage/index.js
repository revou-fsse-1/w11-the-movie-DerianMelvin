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

/* 
  ================================================
    FUNCTIONS
  ================================================
*/
const getDataFromAPI = async (currentAPI) => {
  const response = await fetch(currentAPI);
  const result = await response.json();
  return result;
};

const displayMovieImage = (elementId, imgSource, title, rating, movieId) => {
  const movieRating = rating === undefined ? "-" : rating;
  const movieHTML = `
    <a href="../movie/index.html?id=${movieId}" class="min-w-max flex flex-col relative">
      <img src="${imgSource}" alt="${title}" class="w-36 h-52 object-cover object-center rounded-2xl" />
      <span class="absolute bottom-0 left-0 px-2 py-1 text-sm text-white rounded-bl-2xl rounded-tr-2xl bg-gray-900">⭐${movieRating}</span>
    </a>
  `;

  elementId.innerHTML += movieHTML;
};

const toggleSearchBar = () => {
  const isHidden = formSearchMobile.classList.contains("hidden");
  if (isHidden) {
    formSearchMobile.classList.remove("hidden");
  } else {
    formSearchMobile.classList.add("hidden");
  }
}

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
  toggleSearchBar();
})