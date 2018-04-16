import axios from "axios";
import credentials from "./flickrApiCredentials";
export const getImage = (index, tags, text) => {
  return axios.get(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
      credentials.key
    }&tags=${tags}&text=${text}&sort=interestingness-desc&per_page=1&page=${index}&extras=url_c&format=json&nojsoncallback=1`
  );
};
