import axios from "axios";
import credentials from "./flickrApiCredentials";
export const getImage = index => {
  return axios.get(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
      credentials.key
    }&tags=bokeh&text=music&sort=interestingness-desc&per_page=1&page=${index}&extras=url_o&format=json&nojsoncallback=1`
  );
};
