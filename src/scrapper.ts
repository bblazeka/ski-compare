import jsdom from 'jsdom';
const { JSDOM } = jsdom;

export async function scrap(name: string) {
  const url = `https://www.bergfex.at/${name}/`;
  const response = await fetch(url);
  const text = await response.text();
  const dom = new JSDOM(text);

  const list = dom.window.document.getElementsByClassName('dd-dense')[0];
  const children = list.children;
  const easy = parseFloat(children[1].textContent?.split(' ')[0].replace(/,/, '.') ?? '0.0');
  const medium = parseFloat(children[3].textContent?.split(' ')[0].replace(/,/, '.') ?? '0.0');
  const hard = parseFloat(children[5].textContent?.split(' ')[0].replace(/,/, '.') ?? '0.0');

  const rating = dom.window.document.getElementsByClassName('rating-number')[0].textContent ?? '0,0';
  const count = dom.window.document.getElementsByClassName('rating-count')[0].textContent;

  const skiLiftCounts: any[] = [];
  const skiLifts = dom.window.document.getElementsByClassName('lifte');
  for (let i = 0; i < skiLifts.length; i++) {
    const liftCount = skiLifts[i].children[0].textContent ?? '0';
    const liftName = skiLifts[i].children[1].getAttribute('title');
    if (liftCount != '0') {
      skiLiftCounts.push({name: liftName, value: parseInt(liftCount)});
    }
  }

  const reportInfos = dom.window.document.getElementsByClassName('report-info');
  const snow = reportInfos[1].children[0].textContent?.trim();
  const liftStatus = reportInfos[3].children[0].textContent?.trim().replace('\n',' ');

  return {
    'easy': easy,
    'medium': medium,
    'hard': hard,
    'rating': parseFloat(rating.replace(/,/, '.')),
    'count': count,
    'lifts': skiLiftCounts,
    'snow': snow,
    'liftStatus': liftStatus ? liftStatus : '-'
  };
}

module.exports = { scrap };