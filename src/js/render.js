import refs from "../js/refs";
import photoCardsTpl from "../templates/photo-cards.hbs";

function renderPhotoCards(cards) {
  const markup = photoCardsTpl(cards);
  refs.gallery.insertAdjacentHTML("beforeend", markup);
}
export default renderPhotoCards;
