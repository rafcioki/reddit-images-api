// Extensions should have such format: "jpg;png;bmp"
const _splitExtensions = (extensions) => {
  const gluedExtensions = 
    extensions
    .split(';')
    .map(extension => {
      return `.${extension}`;
    });

    return gluedExtensions;
}

const filterOutEntriesWithIncorrectImageUrl = (extensions, entries) => {
  const allowedExtensions = _splitExtensions(extensions);

  return entries.filter(entry => {
    for (let i = 0; i < allowedExtensions.length; ++i) {
      if (entry.imageUrl.endsWith(allowedExtensions[i])) {
        return true;
      }
    }

    return false;
  });
};

export default filterOutEntriesWithIncorrectImageUrl;