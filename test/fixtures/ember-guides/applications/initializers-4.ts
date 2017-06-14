export function initialize(application) {
  // ... your code ...
};

export default {
  name: 'websocket-init',
  after: 'config-reader',
  initialize: initialize
};
