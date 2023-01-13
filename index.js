const { join } = require('path')
const { mkdir, stat, writeFile, readFile } = require('fs/promises')

let buffered = null

module.exports = (configFolder, defaultConfig) => {
  const configFile = join(configFolder, 'config.json')

  const setConfig = async (key, value) => {
    buffered[key] = value
    return writeFile(configFile, JSON.stringify(buffered))
  }

  const getConfig = async (key) => {
    if (await !exists(configFolder)) {
      await mkdir(configFolder)
    }

    if (!(await exists(configFile))) {
      await setConfig(defaultConfig)
      return defaultConfig[key]
    }

    if (buffered) {
      return buffered[key]
    }

    try {
      buffered = JSON.parse((await readFile(configFile)).toString())
      return buffered[key]
    } catch (err) {

    }
  }

  return {
    setConfig,
    getConfig
  }
}

async function exists (path) {
  try {
    await stat(path)
    return true
  } catch (err) {
    return false
  }
}
