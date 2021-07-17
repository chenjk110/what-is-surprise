const child_process = require('child_process')
const fs = require('fs')
const path = require('path')

child_process.execSync('rm -rf ./dist')
child_process.execSync('tsc')
child_process.execSync('cp README.md surprise.jpeg ./dist/')

const pkg = require('./package.json')

Reflect.set(pkg, 'main', 'index.js')
Reflect.deleteProperty(pkg, 'scripts')

fs.writeFileSync('./dist/package.json', JSON.stringify(pkg, null, 2))
