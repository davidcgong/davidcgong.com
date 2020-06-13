'use strict';

require('./src/assets/scss/init.scss');

exports.onClientEntry = () => {};
export function onServiceWorkerUpdateReady(){window.location.reload(true)};