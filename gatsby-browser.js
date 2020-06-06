'use strict';

require('./src/assets/scss/init.scss');

exports.onClientEntry = () => {};
// refresh cache on visit
exports.onServiceWorkerUpdateFound = () => {
    if (
      window.confirm(
        "This site has been updated with new data. Do you wish to reload the site to get the new data?"
      )
    ) {
      window.location.reload(true);
    }
  };