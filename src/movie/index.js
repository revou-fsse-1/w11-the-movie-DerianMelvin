import {
  movieTitle,
  btnAddToWatchlist,
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
      <p>IMDB Rating</p>
      <span>⭐ ${rating} / 10</span>
    </div>
  `);
  genre.forEach(text => {
    movieGenreList.insertAdjacentHTML(insertPosition, `
      <p class="px-5 py-1 rounded-full border border-gray-400">${text}</p>
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
  }

  try {
    const response = await fetch(API_WATCHLIST, params);
    const result = await response.json();
    alert("Movie successfully added to your watchlist!");
  } catch (error) {
    alert("ERROR! Movie has already been added to the watchlist.")
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

  assignMovieData(movieData);

  btnAddToWatchlist.addEventListener('click', () => {
    addMovieToWatchlist(movieData);
  });
};