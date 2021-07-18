function setupTestEnv() {
  const testEnvConfigs = require('../../.test-env.js')

  Object.keys(testEnvConfigs).forEach(name => {
    const sdk = testEnvConfigs[name]
    for (const [key, value] of Object.entries(sdk)) {
      process.env[`TEST_ENV_${name.toUpperCase()}_${key.toUpperCase()}`] = value
    }
  })
}

///// run
setupTestEnv()
