export function initialize(application) {
  // ... your code ...
};

export default {
  name: 'config-reader',
  before: 'websocket-init',
  initialize: initialize
};
