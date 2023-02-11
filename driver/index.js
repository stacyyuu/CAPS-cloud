const { handlePickup } = require('./handler');

function startDriver() {
  console.log('Driver is ready!');
  handlePickup();
}

startDriver();
