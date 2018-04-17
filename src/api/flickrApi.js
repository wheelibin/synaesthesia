import axios from "axios";
import credentials from "./flickrApiCredentials";
export const getImage = (index, group) => {
  // return axios.get(
  //   `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
  //     credentials.key
  //   }&tags=${tags}&text=${text}&sort=interestingness-desc&per_page=25&page=${index}&extras=url_c&format=json&nojsoncallback=1`
  // );

  return axios.get(
    `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${
      credentials.key
    }&group_id=${group}&extras=url_c&per_page=1&page=${index}&format=json&nojsoncallback=1`
  );
};
