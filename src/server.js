import rp from 'request-promise';
import * as constants from './consts';

const GetTopImagesFromSubreddit = (subreddit,
    sort = constants.SORT_TOP) => {
  rp(`https://www.reddit.com/r/${subreddit}.json?sort=${sort}`)
    .then(response => {
      const allowedExtensions = constants
        .AllowedImageExtensions
        .split(';')
        .map(extension => {
          return `.${extension}`;
      });

      console.log(allowedExtensions);

      const parsedRootJson = JSON.parse(response);

      const validImageUrls = parsedRootJson.data.children.map(child => {
        return child.data.url;
      }).filter(url => {
        for (let i = 0; i < allowedExtensions.length; ++i) {
          if (url.endsWith(allowedExtensions[i])) {
            return true;
          }
        }

        return false;
      });

      console.log(validImageUrls);
    })
    .catch(error => {
    });
};

GetTopImagesFromSubreddit('architectureporn');

export default GetTopImagesFromSubreddit;