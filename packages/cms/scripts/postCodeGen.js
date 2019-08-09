const fs = require('fs')
const path = require('path')

const codegenPath = path.join(
  __dirname,
  '..',
  'src',
  'generated',
  'components.tsx'
)

const data = fs.readFileSync(codegenPath)
const fd = fs.openSync(codegenPath, 'w+')
const insert = String('/* eslint-disable */ \n')
fs.writeSync(fd, insert, 0, insert.length, 0)
fs.writeSync(fd, data, 0, data.length, insert.length)
fs.close(fd, err => {
  if (err) throw err
})
