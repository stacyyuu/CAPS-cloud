const { chance } = require('../utils');
const { sendPickup } = require('./handler');

function startVendor() {
  console.log('Vendor is ready!');

  function ready() {
    const vendorId = chance.word({ syllables: 3 });

    sendPickup(vendorId);
    setTimeout(ready, chance.integer({ min: 5000, max: 6000 }));
  }

  ready();
}

startVendor();
