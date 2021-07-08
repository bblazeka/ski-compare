import jsdom from 'jsdom';
const { JSDOM } = jsdom;

export async function scrap(name: string) {
  const url = `https://www.bergfex.at/${name}/`;
  const response = await fetch(url);
  const text = await response.text();
  const dom = new JSDOM(text);

  const list = dom.window.document.getElementsByClassName('dd-dense')[0];
  var children = list.children;
  var easy = parseInt(children[1].textContent?.split(' ')[0] ?? '0');
  var medium = parseInt(children[3].textContent?.split(' ')[0] ?? '0');
  var hard = parseInt(children[5].textContent?.split(' ')[0] ?? '0');

  var rating = dom.window.document.getElementsByClassName('rating-number')[0].textContent ?? '0,0';
  var count = dom.window.document.getElementsByClassName('rating-count')[0].textContent;
  return {
    'easy': easy,
    'medium': medium,
    'hard': hard,
    'rating': parseFloat(rating.replace(/,/, '.')),
    'count': count
  };
}

module.exports = { scrap };