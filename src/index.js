import "./scss/common.scss";
import "material-design-icons/iconfont/material-icons.css";
import refs from "./js/refs";
import fetchPhotos from "./js/fetchPhotos";
import renderPhotoCards from "./js/render";

import "./js/pnotify-cfg";
import { success, error, notice } from "@pnotify/core";

import debounce from "lodash.debounce";

import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

refs.searchForm.addEventListener("input", debounce(onSearch, 500));
refs.loadBtn.addEventListener("click", onSearch);
refs.gallery.addEventListener("click", onGalleryClick);

refs.loadBtn.disabled = true;

let searchQuery = "";
let page = null;
const perPage = 12;

async function onSearch(e) {
  try {
    e.preventDefault();
    const newSearchQuery = refs.searchForm.elements.query.value;
    if (!newSearchQuery) return;
    if (searchQuery !== newSearchQuery) {
      whenNewSearchQuery(newSearchQuery);
    } else {
      whenOldSearchQuery();
    }
    const data = await fetchPhotos(searchQuery, page, perPage);
    onFetchSuccess(data);
    loadCheck(data);
  } catch (e) {
    onFetchError(e);
  }
}

function whenNewSearchQuery(query) {
  page = 1;
  searchQuery = query;
  refs.gallery.innerHTML = "";
}

function whenOldSearchQuery() {
  page += 1;
}

function onFetchSuccess(data) {
  let top = refs.gallery.offsetHeight;
  renderPhotoCards(data);
  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

function onFetchError(err) {
  error(`Reboot`);
  console.log(err.name);
}
function loadCheck(data) {
  const uploaded = page * perPage - perPage + data.hits.length;
  if (uploaded >= data.totalHits) {
    refs.loadBtn.disabled = true;
    notice(`Uploaded all images out of ${data.totalHits}`);
    return;
  }
  refs.loadBtn.disabled = false;
  success(`Uploaded ${uploaded} images out of ${data.totalHits}`);
}

function onGalleryClick({ target: { nodeName, dataset } }) {
  if (nodeName !== "IMG") return;
  const instance = basicLightbox.create(`
    <div class="modal">
        <img src="${dataset.src}">
    </div>
`);
  instance.show();
}
