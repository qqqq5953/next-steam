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
