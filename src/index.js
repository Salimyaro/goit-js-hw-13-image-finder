import "./css/common.scss";
import "material-design-icons/iconfont/material-icons.css";
import refs from "./js/refs";
import fetchPhotos from "./js/fetchPhotos";
import renderPhotoCards from "./js/render";
import "./js/pnotify-cfg";
import { error } from "@pnotify/core";
import debounce from "lodash.debounce";

refs.searchForm.addEventListener("input", debounce(onSearch, 500));
refs.loadBtn.addEventListener("click", onSearch);

let searchQuery = "";
let page = null;

function onSearch(e) {
  e.preventDefault();
  const newSearchQuery = refs.searchForm.elements.query.value;
  if (!newSearchQuery) return;
  if (searchQuery !== newSearchQuery) {
    whenNewSearchQuery(newSearchQuery);
  } else {
    whenOldSearchQuery();
  }
  fetchPhotos(searchQuery, page).then(onFetchSuccess).catch(onFetchError);
}

function whenOldSearchQuery() {
  page += 1;
}

function whenNewSearchQuery(query) {
  page = 1;
  searchQuery = query;
  refs.gallery.innerHTML = "";
}

function onFetchSuccess(data) {
  let top = refs.gallery.offsetHeight;
  renderPhotoCards(data);
  window.scrollTo({
    top,
    left: 0,
    behavior: "smooth",
  });
}

function onFetchError(error) {
  console.log(error);
}
