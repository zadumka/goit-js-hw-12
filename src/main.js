import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderMarkup } from './js/render-functions';
import { fetchData } from './js/pixabay-api';
import errorIcon from '/img/error.png';

export const refs = {
  formEl: document.querySelector('.form'),
  galleryEl: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
  searchInput: document.querySelector('.form-input'),
  moreBtnEl: document.querySelector('.more-btn'),
};

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'title',
  captionDelay: 250,
  scrollZoom: false,
});
export let searchQuery = '';
let totalPages = 0;
let currentPage = 1;

refs.formEl.addEventListener('submit', onSubmit);
refs.moreBtnEl.addEventListener('click', onLoadMore);

async function onSubmit(evt) {
  evt.preventDefault();
  currentPage = 1;
  searchQuery = refs.searchInput.value;
  if (searchQuery.trim() === '') {
    refs.galleryEl.innerHTML = '';
    refs.moreBtnEl.classList.add('visually-hidden');
    iziToast.warning({
      position: 'topRight',
      message: 'Please enter something',
    });
    return;
  }
  refs.moreBtnEl.classList.add('visually-hidden');
  refs.loaderEl.classList.remove('visually-hidden');
  refs.galleryEl.innerHTML = '';
  try {
    const data = await fetchData(searchQuery, currentPage);
    totalPages = Math.ceil(data.totalHits / data.hits.length);
    if (data.hits.length === 0) {
      refs.formEl.reset();
      iziToast.error({
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        iconUrl: errorIcon,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }    
    renderMarkup(data.hits);
    if (currentPage >= totalPages) {
      refs.moreBtnEl.classList.add('visually-hidden');
      refs.loaderEl.classList.add('visually-hidden');
      refs.formEl.reset();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }
    refs.moreBtnEl.classList.remove('visually-hidden');
    gallery.refresh();
  } catch (error) {
    console.log(error);
  }
  refs.loaderEl.classList.add('visually-hidden');
  refs.formEl.reset();
}

async function onLoadMore() {
  refs.loaderEl.classList.remove('visually-hidden');
  currentPage += 1;
  try {
    const nextImages = await fetchData(searchQuery, currentPage);
    renderMarkup(nextImages.hits);
    gallery.refresh();
    const galleryItemEl = document.querySelector('.gallery-item');
    const cardElement = galleryItemEl.getBoundingClientRect();
    const cardElementHeight = cardElement.height;
    window.scrollBy({
      top: cardElementHeight * 2,
      behavior: 'smooth',
    });
    if (currentPage >= totalPages) {
      refs.moreBtnEl.classList.add('visually-hidden');
      refs.loaderEl.classList.add('visually-hidden');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }
    
  } catch (error) {
    console.log(error);
  }
  refs.loaderEl.classList.add('visually-hidden');
}
