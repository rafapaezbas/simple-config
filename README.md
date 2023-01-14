# Simple-config
    
A super simple opinionated persistent configuration mechanism. Reads from disk only once, after that `getConfig` always reads from RAM while `setConfig` modifies buffered configuration and writes to disk. Default config is only used if not confiiguration was found on disk.

 ``` js
const configFolder = path.join(os.homedir(), '.example')

const defaultConfig = {
  foo: 'bar',
}
const { getConfig, setConfig } = require('simple-config')(configFolder, defaultConfig)
await setConfig('hello', 'world') # persist config in configFolder

console.log(getConfig('hello')) # world
console.log(getConfig('foo')) # bar
 ``` 
