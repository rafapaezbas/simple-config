const path = require('path')
const fs = require('fs')

var buffered = null

module.exports = (configFolder, defaultConfig) => {
  const setConfig = async (obj) => {
    buffered = obj
    const configFile = path.join(configFolder, 'config.json')
    return await fs.promises.writeFile(configFile, JSON.stringify(obj))
  }
  const getConfig = async () => {
    if (!fs.existsSync(configFolder)) {
      fs.mkdirSync(configFolder)
      setConfig(defaultConfig)
      return defaultConfig
    } else {
      if(buffered) {
        return buffered
      }else {
        try {
          const configFile = path.join(configFolder, 'config.json')
          return JSON.parse((await fs.promises.readFile(configFile)).toString())
        } catch (err) {
          return {}
        }
      }
    }
  }
  return {
    setConfig,
    getConfig
  }
}

