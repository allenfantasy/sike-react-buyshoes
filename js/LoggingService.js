import AppDispatcher from './AppDispatcher'

module.exports = function enableLogging() {
  AppDispatcher.register((action) => {
    console.log(JSON.stringify({
      timestamp: new Date(),
      action
    }, undefined, 2))
  })
}
