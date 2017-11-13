import filterOutEntriesWithIncorrectImageUrl from '../src/parsing';
import assert from 'assert';

describe('Parsing tests.', () => {
  it('Should filter out urls that are not proper image urls.', () => {
    const extensions = "jpg;png";
    const entries = [
      { id: 1, imageUrl: 'www.google.com' },
      { id: 2, imageUrl: 'faf.com/image.png' },
      { id: 3, imageUrl: 'imgur.com/image.jpg' },
      { id: 4, imageUrl: 'imgur.com/image.bmp' }
    ];

    const expectedEntries = [
      { id: 2, imageUrl: 'faf.com/image.png' },
      { id: 3, imageUrl: 'imgur.com/image.jpg' }
    ];

    assert.deepEqual(filterOutEntriesWithIncorrectImageUrl(extensions, entries), expectedEntries);
  });
});