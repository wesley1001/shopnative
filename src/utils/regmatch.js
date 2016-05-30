//
// this module contains reg exp utils to extract data from html response
//

export const getMatches = (text, patten, index) => {
  let idx = index || 1; // default to the first capturing group
  const matches = [];
  let match;
  while (match = patten.exec(text)) {
    matches.push(match[idx]);
  }
  return matches;
};

export const getWideImages = (text) => {
	const wideImg = /<img class=img-hide-alt width=1364 .* data-lazy="(.+?)"/g;
  return getMatches(text, wideImg, 1);
}

export const getTileImages = (text) => {
	
}