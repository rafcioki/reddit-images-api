import rp from 'request-promise';
import * as constants from './consts';
import filterOutEntriesWithIncorrectImageUrl from './parsing';

export function getPosts(subreddit,
    sort = constants.SortTop,
    timespan = constants.TimespanAll,
    count = constants.DefaultFetchSize,
    after = '') {
  return rp(`https://www.reddit.com/r/${subreddit}/${sort}.json?sort=${sort}&t=${timespan}&count=${count}&after=${after}`)
    .then(response => {
      const parsedRootJson = JSON.parse(response);

      const posts = parsedRootJson.data.children.map(child => {
        return {
          id: child.data.id,
          score: child.data.score,
          created_utc: child.data.created_utc,
          permalink: child.data.permalink,
          title: child.data.title,
          imageUrl: child.data.url
        }
      });
      
      return filterOutEntriesWithIncorrectImageUrl(constants.AllowedImageExtensions, posts);
    })
    .catch(error => {
      console.log(error);
    });
};

export function getImages(subreddit,
    sort = constants.SORT_TOP,
    timespan = constants.TimespanAll,
    count = constants.DefaultFetchSize,
    after = '') {
      return getPosts(subreddit, sort, timespan, count, after)
        .then(posts => posts.map(post => post.imageUrl));
}
