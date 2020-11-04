const BASE_URL = "https://pixabay.com/api/";
const KEY = "18969106-b552d166da3dfed7b4523ee16";
const PER_PAGE = 12;

function fetchPhotos(searchQuery, page = 1) {
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${PER_PAGE}&key=${KEY}`
  ).then((r) => r.json());
}
export default fetchPhotos;
