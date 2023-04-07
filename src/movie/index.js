import {
  movieTitle,
  btnAddToWatchlist,
  btnRemoveFromWatchlist,
  movieContent,
  movieImage,
  movieDetails,
  movieGenreList,
} from "../utils/variables.js";
import { API_MOVIES, API_WATCHLIST } from "../utils/constants.js";

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

const assignMovieData = (movieData) => {
  const title = movieData.title;
  const trailer = movieData.trailer;
  const image = movieData.image;
  const synopsis = movieData.synopsis;
  const rating = movieData.rating === undefined ? "-" : movieData.rating;
  const genre = movieData.genre;

  // Set position relative to the element when inserting text/html
  const insertPosition = "beforeend";

  movieTitle.insertAdjacentText(insertPosition, title);
  movieContent.insertAdjacentHTML(insertPosition, `
    <iframe src="${trailer}" title="${title} poster" frameborder="0" allowfullscreen class="w-full h-56 rounded-3xl sm:h-80 lg:w-2/5 lg:h-56 xl:h-64"></iframe>
  `);
  movieImage.insertAdjacentHTML(insertPosition, `
    <img src="${image}" alt="${title}" class="w-48 h-72 object-cover object-center rounded-2xl" />
  `);
  movieDetails.insertAdjacentHTML(insertPosition, `
    <p class="lg:line-clamp-5">${synopsis}</p>
  `);
  movieDetails.insertAdjacentHTML(insertPosition, `
    <div>
      <p class="text-xl">IMDB Rating</p>
      <span class="text-lg font-semibold">⭐ ${rating} / 10</span>
    </div>
  `);
  genre.forEach(text => {
    movieGenreList.insertAdjacentHTML(insertPosition, `
      <p class="px-5 py-1 rounded-full border border-gray-400 transition-all hover:border-transparent hover:bg-gray-200">${text}</p>
    `);
  });
};

const addMovieToWatchlist = async (movieData) => {
  const params = {
    method: "POST",
    body: JSON.stringify(movieData),
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch(API_WATCHLIST, params);
    const result = await response.json();
    toggleWatchlistButton();
    alert("Movie successfully added to your watchlist!");
  } catch (error) {
    alert("ERROR! Movie has already been added to the watchlist.")
  };
}

const removeMovieFromWatchlist = async (movieId) => {
  const params = {
    method: "DELETE",
  };

  try {
    const response = await fetch(`${API_WATCHLIST}/${movieId}`, params);
    const result = await response.json();
    toggleWatchlistButton();
    alert("Movie removed from your watchlist!");
  } catch (error) {
    alert("ERROR! Movie is not on the watchlist.")
  };
}

const isMovieInWatchlist = async (movieId) => {
  const response = await fetch(`${API_WATCHLIST}/${movieId}`);
  const json = await response.json();
  const movieExist = Object.keys(json).length !== 0;

  return movieExist ? true : false;
}

const toggleWatchlistButton = () => {
  const isHidden = btnRemoveFromWatchlist.classList.contains("hidden");
  if (isHidden) {
    btnRemoveFromWatchlist.classList.remove("hidden");
    btnAddToWatchlist.classList.add("hidden");
  } else {
    btnRemoveFromWatchlist.classList.add("hidden");
    btnAddToWatchlist.classList.remove("hidden");
  }
}

/* 
  ================================================
    EVENT LISTENERS
  ================================================
*/
window.onload = async () => {
  const params = new URLSearchParams(document.location.search);
  const paramId = params.get("id");
  const movieData = await getDataFromAPI(`${API_MOVIES}/${paramId}`);
  const movieInWatchlist = await isMovieInWatchlist(paramId);

  // Insert HTML elements using data from movie
  assignMovieData(movieData);

  btnAddToWatchlist.addEventListener('click', () => {
    addMovieToWatchlist(movieData);
  });

  btnRemoveFromWatchlist.addEventListener('click', () => {
    removeMovieFromWatchlist(movieData.id);
  });
  
  if (movieInWatchlist) {
    toggleWatchlistButton();
  }
};