export function initialize(application) {
  // ... your code ...
};

export default {
  name: 'asset-init',
  after: ['config-reader', 'websocket-init'],
  initialize: initialize
};
