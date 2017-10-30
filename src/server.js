import rp from 'request-promise';
import * as constants from './consts';
import FilterNonImageUrls from './parsing';

const GetTopImagesFromSubreddit = (subreddit,
    sort = constants.SORT_TOP) => {
  rp(`https://www.reddit.com/r/${subreddit}.json?sort=${sort}`)
    .then(response => {
      const parsedRootJson = JSON.parse(response);

      const imageUrls = parsedRootJson.data.children.map(child => {
        return child.data.url;
      });
      
      const validImageUrls = FilterNonImageUrls(constants.AllowedImageExtensions, imageUrls);
    })
    .catch(error => {
      console.log(error);
    });
};

// GetTopImagesFromSubreddit('architectureporn');

export default GetTopImagesFromSubreddit;