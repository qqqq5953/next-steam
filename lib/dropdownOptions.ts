export const platformOptions = [
  {
    name: 'PC',
    value: '1'
  },
  {
    name: 'PlayStation',
    value: '2',
    children: [
      {
        name: 'PlayStation 4',
        value: '18'
      },
      {
        name: 'PlayStation 5',
        value: '187'
      }
    ]
  },
  {
    name: 'Xbox',
    value: '3',
    children: [
      {
        name: 'Xbox One',
        value: '1'
      },
      {
        name: 'Xbox Series S/X',
        value: '186'
      }
    ]
  },
  {
    name: 'iOS',
    value: '4'
  },
  {
    name: 'Android',
    value: '8'
  },
  {
    name: 'Macintosh',
    value: '5'
  },
  {
    name: 'Linux',
    value: '6'
  },
  {
    name: 'Nintendo',
    value: '7'
  }
]

export const platformMap = {
  PC: '1',
  'PlayStation 4': '18',
  'PlayStation 5': '187',
  'Xbox One': '1',
  'Xbox Series S/X': '186',
  iOS: '4',
  Android: '8',
  Macintosh: '5',
  Linux: '6',
  Nintendo: '7'
}

export const orderOptions = [
  {
    name: 'Relevance',
    value: '-relevance'
  },
  {
    name: 'Date added',
    value: '-created'
  },
  {
    name: 'Name',
    value: '-name'
  },
  {
    name: 'Release date',
    value: '-released'
  },
  {
    name: 'Popularity',
    value: '-added'
  },
  {
    name: 'Average rating',
    value: '-rating'
  }
]

export const orderMap = {
  Relevance: '-relevance',
  'Date added': '-created',
  Name: '-name',
  'Release date': '-released',
  Popularity: '-added',
  'Average rating': '-rating'
}
