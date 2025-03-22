import axios from 'axios';

const myApiKey = '49287257-770ce306313139aeab99da771';
const url = 'https://pixabay.com/api/';

export async function fetchData(searchQuery, currentPage) {
  try {
    const respData = await axios.get(url, {
      params: {
        key: myApiKey,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 15,
        page: currentPage,
      },
    });
    return respData.data;
  } catch (error) {
    console.log(error);
  }
}
