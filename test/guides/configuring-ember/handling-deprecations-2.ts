window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "Ember.Handlebars.registerHelper is deprecated, please refactor to Ember.Helper.helper." },
    { handler: "silence", matchMessage: "`lookup` was called on a Registry. The `initializer` API no longer receives a container, and you should use an `instanceInitializer` to look up objects from the container." },
    { handler: "silence", matchMessage: "Using `Ember.HTMLBars.makeBoundHelper` is deprecated. Please refactor to using `Ember.Helper` or `Ember.Helper.helper`." },
    { handler: "silence", matchMessage: "Accessing 'template' in <web-directory@component:x-select::ember1381> is deprecated. To determine if a block was specified to <web-directory@component:x-select::ember1381> please use '{{#if hasBlock}}' in the components layout." },
    { handler: "silence", matchMessage: "Accessing 'template' in <web-directory@component:x-select::ember1402> is deprecated. To determine if a block was specified to <web-directory@component:x-select::ember1402> please use '{{#if hasBlock}}' in the components layout." },
    { handler: "silence", matchMessage: "Accessing 'template' in <web-directory@component:x-select::ember1407> is deprecated. To determine if a block was specified to <web-directory@component:x-select::ember1407> please use '{{#if hasBlock}}' in the components layout." }
  ]
};
