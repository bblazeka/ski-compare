import jsdom from 'jsdom';
const { JSDOM } = jsdom;

export async function scrap(name: string) {
  const url = `https://www.bergfex.at/${name}/`;
  const response = await fetch(url);
  const text = await response.text();
  const dom = new JSDOM(text);

  const list = dom.window.document.getElementsByClassName('dd-dense')[0];
  var children = list.children;
  var easy = parseFloat(children[1].textContent?.split(' ')[0].replace(/,/, '.') ?? '0.0');
  var medium = parseFloat(children[3].textContent?.split(' ')[0].replace(/,/, '.') ?? '0.0');
  var hard = parseFloat(children[5].textContent?.split(' ')[0].replace(/,/, '.') ?? '0.0');

  var rating = dom.window.document.getElementsByClassName('rating-number')[0].textContent ?? '0,0';
  var count = dom.window.document.getElementsByClassName('rating-count')[0].textContent;

  var skiLiftCounts: any[] = [];
  var skiLifts = dom.window.document.getElementsByClassName('lifte');
  for (let i = 0; i < skiLifts.length; i++) {
    var liftCount = skiLifts[i].children[0].textContent ?? '0';
    var liftName = skiLifts[i].children[1].getAttribute('title');
    if (liftCount != '0') {
      skiLiftCounts.push({name: liftName, value: parseInt(liftCount)});
    }
  }

  var reportInfos = dom.window.document.getElementsByClassName('report-info');
  var snow = reportInfos[1].children[0].textContent?.trim();
  var liftStatus = reportInfos[3].children[0].textContent?.trim().replace('\n',' ');

  return {
    'easy': easy,
    'medium': medium,
    'hard': hard,
    'rating': parseFloat(rating.replace(/,/, '.')),
    'count': count,
    'lifts': skiLiftCounts,
    'snow': snow,
    'liftStatus': liftStatus
  };
}

module.exports = { scrap };