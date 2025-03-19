import axios from 'axios';
import { resp } from '../main';

const myApiKey = '49287257-770ce306313139aeab99da771';
const url = 'https://pixabay.com/api/';
export function searchData() {
  return axios.get(url, {
    params: {
      key: myApiKey,
      q: resp.searchInput.value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  });
}
