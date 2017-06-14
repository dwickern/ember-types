window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "Ember.Handlebars.registerHelper is deprecated, please refactor to Ember.Helper.helper." },
    { handler: "silence", matchMessage: "`lookup` was called on a Registry. The `initializer` API no longer receives a container, and you should use an `instanceInitializer` to look up objects from the container." },
    { handler: "silence", matchMessage: "Using `Ember.HTMLBars.makeBoundHelper` is deprecated. Please refactor to using `Ember.Helper` or `Ember.Helper.helper`." },
    { handler: "silence", matchMessage: /Accessing 'template' in .* is deprecated. To determine if a block was specified to .* please use '{{#if hasBlock}}' in the components layout./ }
  ]
};
