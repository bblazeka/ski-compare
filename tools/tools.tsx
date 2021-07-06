import _ from "lodash";

export function generator() {
  var values = [];
  var possibleGroups = ['Lebensmittel', 'Wohnen', 'Verkehr'];
  for (var i = 0; i < 50; i++) {
    var randomNumber = Math.floor(Math.random() * 12);
    values.push({
      "date": new Date(2020, randomNumber, i%30 + 1, 0, 0, 0, 0),
      "group": possibleGroups[i%possibleGroups.length],
      "amount": -1 * Math.random() * 500,
      "description": "Test"
    })
  }
  return values;
}

export function groupMonthlyAmountsBy(list: any[], keyGetter: any) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    var section = map.get(key);
    if (!section) {
      map.set(key, { name: item.date.toLocaleString('default', { month: 'long' }), lebensmittel: 0, wohnen: 0, verkehr: 0 });
      section = map.get(key);
    }
    let value = section[item.group.toLowerCase()] + item.amount * - 1;
    section[item.group.toLowerCase()] = _.round(value, 2);
  });
  var elements = Array.from(map, ([key, value]) => { return Object.assign(value, { 'ind': key } )});
  return elements.sort((a, b) => { return a.ind - b.ind; });
}

export function generateSavings() {
  var savings = [];
  var sum = 0;
  for (var i = 0; i < 12; i++) {
    var month = (new Date(2009, i, 10)).toLocaleString('default', { month: 'long' });
    if (i < 5) {
      sum += 800;
    }
    else if (i === 5 || i === 6) {
      sum += 1500;
    }
    else {
      sum += 1000;
    }
    savings.push({ id: i, month: month, savings: sum });
  }
  return savings;
}

export function generateIncome() {
  var income = [];
  for (var i = 0; i < 12; i++) {
    var factor = Math.random() * 300;
    var month = (new Date(2009, i, 10)).toLocaleString('default', { month: 'long' });
    if (i < 6) {
      income.push({ id: i, month: month, income: _.round(2000 + factor, 2) });
    }
    else if (i === 6 || i === 10) {
      income.push({ id: i, month: month, income: _.round(3000 + factor, 2) });
    }
    else {
      income.push({ id: i, month: month, income: _.round(2000 + factor, 2) });
    }
  }
  return income;
}

module.exports = { generator, groupMonthlyAmountsBy, generateSavings, generateIncome };