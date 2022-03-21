# Simple-config

A super simple opinionated persistent configuration mechanism.

 ``` js
const configFolder = path.join(os.homedir(), '.example')
const defaultConfig = {
  foo: 'bar',
}
const { getConfig, setConfig } = require('simple-config')(configFolder, defaultConfig)

const config = await getConfig()
console.log(config.foo) # bar

config.hello = 'world'
await setConfig(config) # persist config in configFolder

 ``` 
