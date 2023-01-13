# Simple-config
    
A super simple opinionated persistent configuration mechanism.

 ``` js
const configFolder = path.join(os.homedir(), '.example')

const defaultConfig = {
  foo: 'bar',
}
const { getConfig, setConfig } = require('simple-config')(configFolder, defaultConfig)
await setConfig('hello', 'world') # persist config in configFolder

console.log(await getConfig('hello')) # world
console.log(await getConfig('foo')) # bar
 ``` 
