if (app.env === 'development') {
  // Only import when in development mode
  app.import('vendor/ember-renderspeed/ember-renderspeed.js');
}
if (app.env === 'test') {
  // Only import in test mode and place in test-support.js
  app.import(app.bowerDirectory + '/sinonjs/sinon.js', { type: 'test' });
  app.import(app.bowerDirectory + '/sinon-qunit/lib/sinon-qunit.js', { type: 'test' });
}
