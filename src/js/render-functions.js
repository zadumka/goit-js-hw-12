export const createMarkUp = images =>
  images
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
            title="${tags}"
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
