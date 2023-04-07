export const displayError = (elementId, errorMsg) => {
  elementId.innerHTML = errorMsg;
};

export const removeError = (elementId) => {
  elementId.innerHTML = "";
};

export const getDataFromAPI = async (currentAPI) => {
  const response = await fetch(currentAPI);
  const result = await response.json();
  return result;
};

export const displayMovieImage = (elementId, imgSource, title, rating, movieId) => {
  const movieRating = rating === undefined ? "-" : rating;
  const movieHTML = `
    <a href="../movie/index.html?id=${movieId}" class="min-w-max flex flex-col relative group">
      <img src="${imgSource}" alt="${title}" class="w-36 h-52 object-cover object-center rounded-2xl transition-all group-hover:opacity-20" />
      <span class="absolute bottom-0 left-0 px-2 py-1 text-sm text-white rounded-bl-2xl rounded-tr-2xl bg-gray-900 transition-all group-hover:opacity-20">⭐${movieRating}</span>
      <div class="absolute inset-0 flex items-center justify-center p-2 text-center text-lg font-medium opacity-0 transition-all group-hover:opacity-100">${title}</div>
    </a>
  `;

  elementId.innerHTML += movieHTML;
};

export const toggleSearchBar = (elementId) => {
  const isHidden = elementId.classList.contains("hidden");
  if (isHidden) {
    elementId.classList.remove("hidden");
  } else {
    elementId.classList.add("hidden");
  }
}

export const displayEmptyAPIResult = (elementId) => {
  elementId.classList.remove("hidden");
}