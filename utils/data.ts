export function getTestData() {
  return [{
    name: 'Kreischberg',
    lat: 47.067936905855106,
    long: 14.033547742358444,
    key: 'kreischberg',
    slopes: {
      easy: 17,
      medium: 16,
      hard: 9,
      rating: 4.4,
      count: '1.087',
      lifts: [
        { name: 'Schlepplifte', value: 5 },
        { name: 'Sessellifte', value: 4 },
        { name: 'Kabinenbahn', value: 3 },
        { name: 'Zauberteppiche', value: 1 }
      ],
      snow: '-',
      liftStatus: '3 von 15'
    },
    weather: {}
  },
  {
    name: 'Weinebene',
    lat: 46.841560462820716,
    long: 15.012484931548778,
    key: 'weinebene',
    slopes: {
      easy: 8,
      medium: 8,
      hard: 2,
      rating: 3.5,
      count: '1.279',
      lifts: [],
      snow: '-',
      liftStatus: '3 von 15'
    },
    weather: {}
  },
  {
    name: 'Klippitztörl',
    lat: 46.95380931856665,
    long: 14.685330031644156,
    key: 'klippitztoerl',
    slopes: {
      easy: 18,
      medium: 10,
      hard: 0,
      rating: 4,
      count: '3.394',
      lifts: [],
      snow: '-',
      liftStatus: '3 von 15'
    },
    weather: {}
  },
  {
    name: 'Lachtal', 
    lat: 47.25481438588727,
    long: 14.365432326564457,
    key: 'lachtal',
    slopes: {
      easy: 7,
      medium: 16,
      hard: 3,
      rating: 4.8,
      count: '751',
      lifts: [],
      snow: '-',
      liftStatus: '3 von 15'
    },
    weather: {}
  },
  {
    name: 'Turracher Höhe', 
    lat: 46.91441997836233,
    long: 13.87499425135462,
    key: 'turracherhoehe',
    slopes: {
      easy: 14.5,
      medium: 24,
      hard: 3.5,
      rating: 3.9,
      count: '1.975',
      lifts: [
        { name: 'Schlepplifte', value: 6 },
        { name: 'Sessellifte', value: 2 },
        { name: 'Seillifte', value: 1 },
        { name: 'Zauberteppiche', value: 1 }
      ],
      snow: '-',
      liftStatus: '3 von 15'
    },
    weather: {}
  }];
}

module.exports = { getTestData };