import rp from 'request-promise';
import * as constants from './consts';
import filterOutEntriesWithIncorrectImageUrl from './parsing';

export function getPosts(subreddit,
    after = '',
    count = constants.DefaultFetchSize,
    sort = constants.SortTop,
    timespan = constants.TimespanAll) {
  return rp(`https://www.reddit.com/r/${subreddit}/${sort}.json?after=${after}&count=${count}&sort=${sort}&t=${timespan}`)
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
    after = '',
    count = constants.DefaultFetchSize,
    sort = constants.SORT_TOP,
    timespan = constants.TimespanAll
    ) {
      return getPosts(subreddit, after, count, sort, timespan)
        .then(posts => posts.map(post => post.imageUrl));
}

export default constants;
