import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from '../main';

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'title',
  captionDelay: 250,
  scrollZoom: false,
});

export function renderMarkup(images) {
  const markup = images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<li class="gallery-item">
      <div>
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}" 
            title="${tags.slice(0, 50)}"
            width="360"
            height="152"
          />
          </a>
          <div class="img-descr">
            <ul class="list-descr">
              <li class="item-descr">
                <p class="descr-name">Likes</p>
                <p class="descr-value">${likes}</p>
              </li>
              <li class="item-descr">
                <p class="descr-name">Views</p>
                <p class="descr-value">${views}</p>
              </li>
              <li class="item-descr">
                <p class="descr-name">Comments</p>
                <p class="descr-value">${comments}</p>
              </li>
              <li class="item-descr">
                <p class="descr-name">Downloads</p>
                <p class="descr-value">${downloads}</p>
              </li>
            </ul>          
          </div>
          </div>
      </li>
      `;
    })
    .join('');
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}
