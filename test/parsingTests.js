import FilterNonImageUrls from '../src/parsing';
import assert from 'assert';

describe('Parsing tests.', () => {
  it('Should filter out urls that are not proper image urls.', () => {
    const extensions = "jpg;png";
    const urls = [
      'www.google.com',
      'faf.com/image.png',
      'imgur.com/image.jpg',
      'imgur.com/image.bmp'
    ];
    const expectedUrls = [
      'faf.com/image.png',
      'imgur.com/image.jpg'
    ];

    assert.deepEqual(FilterNonImageUrls(extensions, urls), expectedUrls);
  });
});