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

const FilterNonImageUrls = (extensions, urls) => {
  const allowedExtensions = _splitExtensions(extensions);

  return urls.filter(url => {
    for (let i = 0; i < allowedExtensions.length; ++i) {
      if (url.endsWith(allowedExtensions[i])) {
        return true;
      }
    }

    return false;
  });
};

export default FilterNonImageUrls;