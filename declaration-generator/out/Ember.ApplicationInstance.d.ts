//packages/ember-application/lib/system/application-instance.js
declare namespace Ember {
    /*
    The `ApplicationInstance` encapsulates all of the stateful aspects of a
    running `Application`.
    
    At a high-level, we break application boot into two distinct phases:
    
    * Definition time, where all of the classes, templates, and other
      dependencies are loaded (typically in the browser).
    * Run time, where we begin executing the application once everything
      has loaded.
    
    Definition time can be expensive and only needs to happen once since it is
    an idempotent operation. For example, between test runs and FastBoot
    requests, the application stays the same. It is only the state that we want
    to reset.
    
    That state is what the `ApplicationInstance` manages: it is responsible for
    creating the container that contains all application state, and disposing of
    it once the particular test run or FastBoot request has finished.
    */
    class ApplicationInstance {
    }
}
