const { join } = require('path')
const { mkdir, stat, writeFile, readFile } = require('fs/promises')

let buffered = null

module.exports = async (configFolder, defaultConfig) => {
  const configFile = join(configFolder, 'config.json')

  if (await !exists(configFolder)) {
    await mkdir(configFolder)
  }

  if (!(await exists(configFile))) {
    await writeFile(configFile, JSON.stringify(defaultConfig))
    buffered = defaultConfig
  } else {
    buffered = JSON.parse((await readFile(configFile)).toString())
  }

  const setConfig = async (key, value) => {
    buffered[key] = value
    return writeFile(configFile, JSON.stringify(buffered))
  }

  const getConfig = (key) => {
    return buffered[key]
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
