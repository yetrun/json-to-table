const test = require('ava')
const generateTable = require('../lib/generateTable')
const { Table, Row, Data } = require('../lib/table_defs')

test('simple generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = { a: 1, b: 2, c: 3 }

  const table = generateTable(data, props)
  t.deepEqual(table, new Table(
    [1, 2, 3]
  ))
})

test('nested generate', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { key: 'e' }
  ]
  const data = { a: 1, b: { c: 2, d: 3 }, e: 4 }

  const table = generateTable(data, props)
  t.deepEqual(table, new Table(
    [
      1,
      [
        [2, 3]
      ],
      4
    ]
  ))
})

test('array generate', t => {
  const props = [ { key: 'a' }, { key: 'b' }, { key: 'c' } ]
  const data = [
    { a: 1, b: 2, c: 3 },
    { a: 4, b: 5, c: 6 }
  ]

  const table = generateTable(data, props)
  t.deepEqual(table, new Table(
    [1, 2, 3],
    [4, 5, 6]
  ))
})

test('nested array generate', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'c' }, { key: 'd' } ]
    },
    { key: 'e' }
  ]
  const data = {
    a: 1,
    b: [
      { c: 2, d: 3 },
      { c: 4, d: 5 }
    ],
    e: 6
  }

  const table = generateTable(data, props)
  t.deepEqual(table, new Table(
    [
      1,
      [
        [2, 3],
        [4, 5]
      ],
      6
    ]
  ))
})

test('two nested array generate', t => {
  const props = [
    { key: 'a' },
    { 
      key: 'b', 
      props: [ { key: 'd' }, { key: 'e' } ]
    },
    { 
      key: 'c', 
      props: [ { key: 'd' }, { key: 'e' }, { key: 'f' } ]
    }
  ]
  const data = {
    a: 1,
    b: [
      { d: 2, e: 3 },
      { d: 4, e: 5 }
    ],
    c: [
      { d: 6, e: 7, f: 8 },
      { d: 9, e: 10, f: 11 },
      { d: 12, e: 13, f: 14 }
    ]
  }

  const table = generateTable(data, props)
  t.deepEqual(table, new Table(
    [
      1,
      [
        [2, 3],
        [4, 5]
      ],
      [
        [6, 7, 8],
        [9, 10, 11],
        [12, 13, 14]
      ]
    ]
  ))
})
