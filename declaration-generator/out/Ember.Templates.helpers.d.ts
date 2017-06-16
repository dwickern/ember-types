declare namespace Ember {
    class helpers {
        /*
        The `{{link-to}}` component renders a link to the supplied
        `routeName` passing an optionally supplied model to the
        route as its `model` context of the route. The block
        for `{{link-to}}` becomes the innerHTML of the rendered
        element:
        
        ```handlebars
        {{#link-to 'photoGallery'}}
          Great Hamster Photos
        {{/link-to}}
        ```
        
        You can also use an inline form of `{{link-to}}` component by
        passing the link text as the first argument
        to the component:
        
        ```handlebars
        {{link-to 'Great Hamster Photos' 'photoGallery'}}
        ```
        
        Both will result in:
        
        ```html
        <a href="/hamster-photos">
          Great Hamster Photos
        </a>
        ```
        
        ### Supplying a tagName
        By default `{{link-to}}` renders an `<a>` element. This can
        be overridden for a single use of `{{link-to}}` by supplying
        a `tagName` option:
        
        ```handlebars
        {{#link-to 'photoGallery' tagName="li"}}
          Great Hamster Photos
        {{/link-to}}
        ```
        
        ```html
        <li>
          Great Hamster Photos
        </li>
        ```
        
        To override this option for your entire application, see
        "Overriding Application-wide Defaults".
        
        ### Disabling the `link-to` component
        By default `{{link-to}}` is enabled.
        any passed value to the `disabled` component property will disable
        the `link-to` component.
        
        static use: the `disabled` option:
        
        ```handlebars
        {{#link-to 'photoGallery' disabled=true}}
          Great Hamster Photos
        {{/link-to}}
        ```
        
        dynamic use: the `disabledWhen` option:
        
        ```handlebars
        {{#link-to 'photoGallery' disabledWhen=controller.someProperty}}
          Great Hamster Photos
        {{/link-to}}
        ```
        
        any passed value to `disabled` will disable it except `undefined`.
        to ensure that only `true` disable the `link-to` component you can
        override the global behaviour of `Ember.LinkComponent`.
        
        ```javascript
        Ember.LinkComponent.reopen({
          disabled: Ember.computed(function(key, value) {
            if (value !== undefined) {
              this.set('_isDisabled', value === true);
            }
            return value === true ? get(this, 'disabledClass') : false;
          })
        });
        ```
        
        see "Overriding Application-wide Defaults" for more.
        
        ### Handling `href`
        `{{link-to}}` will use your application's Router to
        fill the element's `href` property with a url that
        matches the path to the supplied `routeName` for your
        router's configured `Location` scheme, which defaults
        to Ember.HashLocation.
        
        ### Handling current route
        `{{link-to}}` will apply a CSS class name of 'active'
        when the application's current route matches
        the supplied routeName. For example, if the application's
        current route is 'photoGallery.recent' the following
        use of `{{link-to}}`:
        
        ```handlebars
        {{#link-to 'photoGallery.recent'}}
          Great Hamster Photos
        {{/link-to}}
        ```
        
        will result in
        
        ```html
        <a href="/hamster-photos/this-week" class="active">
          Great Hamster Photos
        </a>
        ```
        
        The CSS class name used for active classes can be customized
        for a single use of `{{link-to}}` by passing an `activeClass`
        option:
        
        ```handlebars
        {{#link-to 'photoGallery.recent' activeClass="current-url"}}
          Great Hamster Photos
        {{/link-to}}
        ```
        
        ```html
        <a href="/hamster-photos/this-week" class="current-url">
          Great Hamster Photos
        </a>
        ```
        
        To override this option for your entire application, see
        "Overriding Application-wide Defaults".
        
        ### Keeping a link active for other routes
        
        If you need a link to be 'active' even when it doesn't match
        the current route, you can use the `current-when` argument.
        
        ```handlebars
        {{#link-to 'photoGallery' current-when='photos'}}
          Photo Gallery
        {{/link-to}}
        ```
        
        This may be helpful for keeping links active for:
        
        * non-nested routes that are logically related
        * some secondary menu approaches
        * 'top navigation' with 'sub navigation' scenarios
        
        A link will be active if `current-when` is `true` or the current
        route is the route this link would transition to.
        
        To match multiple routes 'space-separate' the routes:
        
        ```handlebars
        {{#link-to 'gallery' current-when='photos drawings paintings'}}
          Art Gallery
        {{/link-to}}
        ```
        
        ### Supplying a model
        An optional model argument can be used for routes whose
        paths contain dynamic segments. This argument will become
        the model context of the linked route:
        
        ```javascript
        Router.map(function() {
          this.route("photoGallery", {path: "hamster-photos/:photo_id"});
        });
        ```
        
        ```handlebars
        {{#link-to 'photoGallery' aPhoto}}
          {{aPhoto.title}}
        {{/link-to}}
        ```
        
        ```html
        <a href="/hamster-photos/42">
          Tomster
        </a>
        ```
        
        ### Supplying multiple models
        For deep-linking to route paths that contain multiple
        dynamic segments, multiple model arguments can be used.
        As the router transitions through the route path, each
        supplied model argument will become the context for the
        route with the dynamic segments:
        
        ```javascript
        Router.map(function() {
          this.route("photoGallery", { path: "hamster-photos/:photo_id" }, function() {
            this.route("comment", {path: "comments/:comment_id"});
          });
        });
        ```
        This argument will become the model context of the linked route:
        
        ```handlebars
        {{#link-to 'photoGallery.comment' aPhoto comment}}
          {{comment.body}}
        {{/link-to}}
        ```
        
        ```html
        <a href="/hamster-photos/42/comments/718">
          A+++ would snuggle again.
        </a>
        ```
        
        ### Supplying an explicit dynamic segment value
        If you don't have a model object available to pass to `{{link-to}}`,
        an optional string or integer argument can be passed for routes whose
        paths contain dynamic segments. This argument will become the value
        of the dynamic segment:
        
        ```javascript
        Router.map(function() {
          this.route("photoGallery", { path: "hamster-photos/:photo_id" });
        });
        ```
        
        ```handlebars
        {{#link-to 'photoGallery' aPhotoId}}
          {{aPhoto.title}}
        {{/link-to}}
        ```
        
        ```html
        <a href="/hamster-photos/42">
          Tomster
        </a>
        ```
        
        When transitioning into the linked route, the `model` hook will
        be triggered with parameters including this passed identifier.
        
        ### Allowing Default Action
        
         By default the `{{link-to}}` component prevents the default browser action
         by calling `preventDefault()` as this sort of action bubbling is normally
         handled internally and we do not want to take the browser to a new URL (for
         example).
        
         If you need to override this behavior specify `preventDefault=false` in
         your template:
        
        ```handlebars
        {{#link-to 'photoGallery' aPhotoId preventDefault=false}}
          {{aPhotoId.title}}
        {{/link-to}}
        ```
        
        ### Overriding attributes
        You can override any given property of the `Ember.LinkComponent`
        that is generated by the `{{link-to}}` component by passing
        key/value pairs, like so:
        
        ```handlebars
        {{#link-to  aPhoto tagName='li' title='Following this link will change your life' classNames='pic sweet'}}
          Uh-mazing!
        {{/link-to}}
        ```
        
        See [Ember.LinkComponent](/api/classes/Ember.LinkComponent.html) for a
        complete list of overrideable properties. Be sure to also
        check out inherited properties of `LinkComponent`.
        
        ### Overriding Application-wide Defaults
        ``{{link-to}}`` creates an instance of `Ember.LinkComponent`
        for rendering. To override options for your entire
        application, reopen `Ember.LinkComponent` and supply the
        desired values:
        
        ``` javascript
        Ember.LinkComponent.reopen({
          activeClass: "is-active",
          tagName: 'li'
        })
        ```
        
        It is also possible to override the default event in
        this manner:
        
        ``` javascript
        Ember.LinkComponent.reopen({
          eventName: 'customEventName'
        });
        ```
        */
        "link-to"(routeName: string, ...context: any[], options: any): string;
        /*
        Use the `{{hash}}` helper to create a hash to pass as an option to your
        components. This is specially useful for contextual components where you can
        just yield a hash:
        
        ```handlebars
        {{yield (hash
           name='Sarah'
           title=office
        )}}
        ```
        
        Would result in an object such as:
        
        ```js
        { name: 'Sarah', title: this.get('office') }
        ```
        
        Where the `title` is bound to updates of the `office` property.
        */
        hash(options: any): any;
        /*
        The `{{#each}}` helper loops over elements in a collection. It is an extension
        of the base Handlebars `{{#each}}` helper.
        The default behavior of `{{#each}}` is to yield its inner block once for every
        item in an array passing the item as the first block parameter.
        
        ```javascript
        var developers = [{ name: 'Yehuda' },{ name: 'Tom' }, { name: 'Paul' }];
        ```
        
        ```handlebars
        {{#each developers key="name" as |person|}}
          {{person.name}}
          {{! `this` is whatever it was outside the #each }}
        {{/each}}
        ```
        
        The same rules apply to arrays of primitives.
        
        ```javascript
        var developerNames = ['Yehuda', 'Tom', 'Paul']
        ```
        
        ```handlebars
        {{#each developerNames key="@index" as |name|}}
          {{name}}
        {{/each}}
        ```
        
        During iteration, the index of each item in the array is provided as a second block parameter.
        
        ```handlebars
        <ul>
          {{#each people as |person index|}}
            <li>Hello, {{person.name}}! You're number {{index}} in line</li>
          {{/each}}
        </ul>
        ```
        
        ### Specifying Keys
        
        The `key` option is used to tell Ember how to determine if the array being
        iterated over with `{{#each}}` has changed between renders. By helping Ember
        detect that some elements in the array are the same, DOM elements can be
        re-used, significantly improving rendering speed.
        
        For example, here's the `{{#each}}` helper with its `key` set to `id`:
        
        ```handlebars
        {{#each model key="id" as |item|}}
        {{/each}}
        ```
        
        When this `{{#each}}` re-renders, Ember will match up the previously rendered
        items (and reorder the generated DOM elements) based on each item's `id`
        property.
        By default the item's own reference is used.
        
        ### {{else}} condition
        
        `{{#each}}` can have a matching `{{else}}`. The contents of this block will render
        if the collection is empty.
        
        ```handlebars
        {{#each developers as |person|}}
          {{person.name}}
        {{else}}
          <p>Sorry, nobody is available for this task.</p>
        {{/each}}
        ```
        */
        each(): any;
        /*
        `log` allows you to output the value of variables in the current rendering
        context. `log` also accepts primitive types such as strings or numbers.
        
        ```handlebars
        {{log "myVariable:" myVariable }}
        ```
        */
        log(params: Array): any;
        /*
        Concatenates the given arguments into a string.
        
        Example:
        
        ```handlebars
        {{some-component name=(concat firstName " " lastName)}}
        
        {{! would pass name="<first name value> <last name value>" to the component}}
        ```
        */
        concat(): any;
        /*
        Calls [Ember.String.loc](/api/classes/Ember.String.html#method_loc) with the
        provided string. This is a convenient way to localize text within a template.
        For example:
        
        ```javascript
        Ember.STRINGS = {
          '_welcome_': 'Bonjour'
        };
        ```
        
        ```handlebars
        <div class='message'>
          {{loc '_welcome_'}}
        </div>
        ```
        
        ```html
        <div class='message'>
          Bonjour
        </div>
        ```
        
        See [Ember.String.loc](/api/classes/Ember.String.html#method_loc) for how to
        set up localized string references.
        */
        loc(str: string): any;
        /*
        `{{textarea}}` inserts a new instance of `<textarea>` tag into the template.
        The attributes of `{{textarea}}` match those of the native HTML tags as
        closely as possible.
        
        The following HTML attributes can be set:
        
          * `value`
          * `name`
          * `rows`
          * `cols`
          * `placeholder`
          * `disabled`
          * `maxlength`
          * `tabindex`
          * `selectionEnd`
          * `selectionStart`
          * `selectionDirection`
          * `wrap`
          * `readonly`
          * `autofocus`
          * `form`
          * `spellcheck`
          * `required`
        
        When set to a quoted string, these value will be directly applied to the HTML
        element. When left unquoted, these values will be bound to a property on the
        template's current rendering context (most typically a controller instance).
        
        Unbound:
        
        ```handlebars
        {{textarea value="Lots of static text that ISN'T bound"}}
        ```
        
        Would result in the following HTML:
        
        ```html
        <textarea class="ember-text-area">
          Lots of static text that ISN'T bound
        </textarea>
        ```
        
        Bound:
        
        In the following example, the `writtenWords` property on `App.ApplicationController`
        will be updated live as the user types 'Lots of text that IS bound' into
        the text area of their browser's window.
        
        ```javascript
        App.ApplicationController = Ember.Controller.extend({
          writtenWords: "Lots of text that IS bound"
        });
        ```
        
        ```handlebars
        {{textarea value=writtenWords}}
        ```
        
         Would result in the following HTML:
        
        ```html
        <textarea class="ember-text-area">
          Lots of text that IS bound
        </textarea>
        ```
        
        If you wanted a one way binding between the text area and a div tag
        somewhere else on your screen, you could use `Ember.computed.oneWay`:
        
        ```javascript
        App.ApplicationController = Ember.Controller.extend({
          writtenWords: "Lots of text that IS bound",
          outputWrittenWords: Ember.computed.oneWay("writtenWords")
        });
        ```
        
        ```handlebars
        {{textarea value=writtenWords}}
        <div>
          {{outputWrittenWords}}
        </div>
        ```
        
        Would result in the following HTML:
        
        ```html
        <textarea class="ember-text-area">
          Lots of text that IS bound
        </textarea>
        <-- the following div will be updated in real time as you type -->
        <div>
          Lots of text that IS bound
        </div>
        ```
        
        Finally, this example really shows the power and ease of Ember when two
        properties are bound to eachother via `Ember.computed.alias`. Type into
        either text area box and they'll both stay in sync. Note that
        `Ember.computed.alias` costs more in terms of performance, so only use it when
        your really binding in both directions:
        
        ```javascript
        App.ApplicationController = Ember.Controller.extend({
          writtenWords: "Lots of text that IS bound",
          twoWayWrittenWords: Ember.computed.alias("writtenWords")
        });
        ```
        
        ```handlebars
        {{textarea value=writtenWords}}
        {{textarea value=twoWayWrittenWords}}
        ```
        
        ```html
        <textarea id="ember1" class="ember-text-area">
          Lots of text that IS bound
        </textarea>
        <-- both updated in real time -->
        <textarea id="ember2" class="ember-text-area">
          Lots of text that IS bound
        </textarea>
        ```
        
        ### Actions
        
        The helper can send multiple actions based on user events.
        The action property defines the action which is send when
        the user presses the return key.
        
        ```handlebars
        {{input action="submit"}}
        ```
        
        The helper allows some user events to send actions.
        
        * `enter`
        * `insert-newline`
        * `escape-press`
        * `focus-in`
        * `focus-out`
        * `key-press`
        
        For example, if you desire an action to be sent when the input is blurred,
        you only need to setup the action name to the event name property.
        
        ```handlebars
        {{textarea focus-out="alertMessage"}}
        ```
        
        See more about [Text Support Actions](/api/classes/Ember.TextArea.html)
        
        ### Extension
        
        Internally, `{{textarea}}` creates an instance of `Ember.TextArea`, passing
        arguments from the helper to `Ember.TextArea`'s `create` method. You can
        extend the capabilities of text areas in your application by reopening this
        class. For example, if you are building a Bootstrap project where `data-*`
        attributes are used, you can globally add support for a `data-*` attribute
        on all `{{textarea}}`s' in your app by reopening `Ember.TextArea` or
        `Ember.TextSupport` and adding it to the `attributeBindings` concatenated
        property:
        
        ```javascript
        Ember.TextArea.reopen({
          attributeBindings: ['data-error']
        });
        ```
        
        Keep in mind when writing `Ember.TextArea` subclasses that `Ember.TextArea`
        itself extends `Ember.Component`. Expect isolated component semantics, not
        legacy 1.x view semantics (like `controller` being present).
        
        See more about [Ember components](/api/classes/Ember.Component.html)
        */
        textarea(options: Hash): any;
        /*
        The `{{unbound}}` helper disconnects the one-way binding of a property,
        essentially freezing its value at the moment of rendering. For example,
        in this example the display of the variable `name` will not change even
        if it is set with a new value:
        
        ```handlebars
        {{unbound name}}
        ```
        
        Like any helper, the `unbound` helper can accept a nested helper expression.
        This allows for custom helpers to be rendered unbound:
        
        ```handlebars
        {{unbound (some-custom-helper)}}
        {{unbound (capitalize name)}}
        {{! You can use any helper, including unbound, in a nested expression }}
        {{capitalize (unbound name)}}
        ```
        
        The `unbound` helper only accepts a single argument, and it return an
        unbound value.
        */
        unbound(): any;
        /*
        The `mut` helper lets you __clearly specify__ that a child `Component` can update the
        (mutable) value passed to it, which will __change the value of the parent component__.
        
        To specify that a parameter is mutable, when invoking the child `Component`:
        
        ```handlebars
        {{my-child childClickCount=(mut totalClicks)}}
        ```
        
        The child `Component` can then modify the parent's value just by modifying its own
        property:
        
        ```javascript
        // my-child.js
        export default Component.extend({
          click() {
            this.incrementProperty('childClickCount');
          }
        });
        ```
        
        Note that for curly components (`{{my-component}}`) the bindings are already mutable,
        making the `mut` unnecessary.
        
        Additionally, the `mut` helper can be combined with the `action` helper to
        mutate a value. For example:
        
        ```handlebars
        {{my-child childClickCount=totalClicks click-count-change=(action (mut totalClicks))}}
        ```
        
        The child `Component` would invoke the action with the new click value:
        
        ```javascript
        // my-child.js
        export default Component.extend({
          click() {
            this.get('click-count-change')(this.get('childClickCount') + 1);
          }
        });
        ```
        
        The `mut` helper changes the `totalClicks` value to what was provided as the action argument.
        
        The `mut` helper, when used with `action`, will return a function that
        sets the value passed to `mut` to its first argument. This works like any other
        closure action and interacts with the other features `action` provides.
        As an example, we can create a button that increments a value passing the value
        directly to the `action`:
        
        ```handlebars
        {{! inc helper is not provided by Ember }}
        <button onclick={{action (mut count) (inc count)}}>
          Increment count
        </button>
        ```
        
        You can also use the `value` option:
        
        ```handlebars
        <input value={{name}} oninput={{action (mut name) value="target.value"}}>
        ```
        */
        mut(attr: any): any;
        /*
        This is a helper to be used in conjunction with the link-to helper.
        It will supply url query parameters to the target route.
        
        Example
        
        ```handlebars
        {{#link-to 'posts' (query-params direction="asc")}}Sort{{/link-to}}
        ```
        */
        "query-params"(hash: any): any;
        /*
        Dynamically look up a property on an object. The second argument to `{{get}}`
        should have a string value, although it can be bound.
        
        For example, these two usages are equivilent:
        
        ```handlebars
        {{person.height}}
        {{get person "height"}}
        ```
        
        If there were several facts about a person, the `{{get}}` helper can dynamically
        pick one:
        
        ```handlebars
        {{get person factName}}
        ```
        
        For a more complex example, this template would allow the user to switch
        between showing the user's height and weight with a click:
        
        ```handlebars
        {{get person factName}}
        <button {{action (action (mut factName)) "height"}}>Show height</button>
        <button {{action (action (mut factName)) "weight"}}>Show weight</button>
        ```
        
        The `{{get}}` helper can also respect mutable values itself. For example:
        
        ```handlebars
        {{input value=(mut (get person factName)) type="text"}}
        <button {{action (action (mut factName)) "height"}}>Show height</button>
        <button {{action (action (mut factName)) "weight"}}>Show weight</button>
        ```
        
        Would allow the user to swap what fact is being displayed, and also edit
        that fact via a two-way mutable binding.
        */
        get(): any;
        /*
        The `{{input}}` helper lets you create an HTML `<input />` component.
        It causes an `Ember.TextField` component to be rendered.  For more info,
        see the [Ember.TextField](/api/classes/Ember.TextField.html) docs and
        the [templates guide](https://emberjs.com/guides/templates/input-helpers/).
        
        ```handlebars
        {{input value="987"}}
        ```
        
        renders as:
        
        ```HTML
        <input type="text" value="987" />
        ```
        
        ### Text field
        
        If no `type` option is specified, a default of type 'text' is used.
        Many of the standard HTML attributes may be passed to this helper.
        <table>
          <tr><td>`readonly`</td><td>`required`</td><td>`autofocus`</td></tr>
          <tr><td>`value`</td><td>`placeholder`</td><td>`disabled`</td></tr>
          <tr><td>`size`</td><td>`tabindex`</td><td>`maxlength`</td></tr>
          <tr><td>`name`</td><td>`min`</td><td>`max`</td></tr>
          <tr><td>`pattern`</td><td>`accept`</td><td>`autocomplete`</td></tr>
          <tr><td>`autosave`</td><td>`formaction`</td><td>`formenctype`</td></tr>
          <tr><td>`formmethod`</td><td>`formnovalidate`</td><td>`formtarget`</td></tr>
          <tr><td>`height`</td><td>`inputmode`</td><td>`multiple`</td></tr>
          <tr><td>`step`</td><td>`width`</td><td>`form`</td></tr>
          <tr><td>`selectionDirection`</td><td>`spellcheck`</td><td>&nbsp;</td></tr>
        </table>
        When set to a quoted string, these values will be directly applied to the HTML
        element. When left unquoted, these values will be bound to a property on the
        template's current rendering context (most typically a controller instance).
        A very common use of this helper is to bind the `value` of an input to an Object's attribute:
        
        ```handlebars
        Search:
        {{input value=searchWord}}
        ```
        
        In this example, the initial value in the `<input />` will be set to the value of `searchWord`.
        If the user changes the text, the value of `searchWord` will also be updated.
        
        ### Actions
        
        The helper can send multiple actions based on user events.
        The action property defines the action which is sent when
        the user presses the return key.
        
        ```handlebars
        {{input action="submit"}}
        ```
        
        The helper allows some user events to send actions.
        
        * `enter`
        * `insert-newline`
        * `escape-press`
        * `focus-in`
        * `focus-out`
        * `key-press`
        * `key-up`
        
        For example, if you desire an action to be sent when the input is blurred,
        you only need to setup the action name to the event name property.
        
        ```handlebars
        {{input focus-out="alertMessage"}}
        ```
        See more about [Text Support Actions](/api/classes/Ember.TextField.html)
        
        ### Extending `Ember.TextField`
        
        Internally, `{{input type="text"}}` creates an instance of `Ember.TextField`, passing
        arguments from the helper to `Ember.TextField`'s `create` method. You can extend the
        capabilities of text inputs in your applications by reopening this class. For example,
        if you are building a Bootstrap project where `data-*` attributes are used, you
        can add one to the `TextField`'s `attributeBindings` property:
        
        ```javascript
        Ember.TextField.reopen({
          attributeBindings: ['data-error']
        });
        ```
        
        Keep in mind when writing `Ember.TextField` subclasses that `Ember.TextField`
        itself extends `Ember.Component`. Expect isolated component semantics, not
        legacy 1.x view semantics (like `controller` being present).
        See more about [Ember components](/api/classes/Ember.Component.html)
        
        ### Checkbox
        
        Checkboxes are special forms of the `{{input}}` helper.  To create a `<checkbox />`:
        
        ```handlebars
        Emberize Everything:
        {{input type="checkbox" name="isEmberized" checked=isEmberized}}
        ```
        
        This will bind checked state of this checkbox to the value of `isEmberized`  -- if either one changes,
        it will be reflected in the other.
        
        The following HTML attributes can be set via the helper:
        
        * `checked`
        * `disabled`
        * `tabindex`
        * `indeterminate`
        * `name`
        * `autofocus`
        * `form`
        
        ### Extending `Ember.Checkbox`
        
        Internally, `{{input type="checkbox"}}` creates an instance of `Ember.Checkbox`, passing
        arguments from the helper to `Ember.Checkbox`'s `create` method. You can extend the
        capablilties of checkbox inputs in your applications by reopening this class. For example,
        if you wanted to add a css class to all checkboxes in your application:
        
        ```javascript
        Ember.Checkbox.reopen({
          classNames: ['my-app-checkbox']
        });
        ```
        */
        input(options: Hash): any;
        /*
        The `{{mount}}` helper lets you embed a routeless engine in a template.
        Mounting an engine will cause an instance to be booted and its `application`
        template to be rendered.
        
        For example, the following template mounts the `ember-chat` engine:
        
        ```handlebars
        {{! application.hbs }}
        {{mount "ember-chat"}}
        ```
        
        Currently, the engine name is the only argument that can be passed to
        `{{mount}}`.
        */
        mount(): any;
        /*
        The `{{component}}` helper lets you add instances of `Ember.Component` to a
        template. See [Ember.Component](/api/classes/Ember.Component.html) for
        additional information on how a `Component` functions.
        `{{component}}`'s primary use is for cases where you want to dynamically
        change which type of component is rendered as the state of your application
        changes. This helper has three modes: inline, block, and nested.
        
        ### Inline Form
        
        Given the following template:
        
        ```app/application.hbs
        {{component infographicComponentName}}
        ```
        
        And the following application code:
        
        ```app/controllers/application.js
        export default Ember.Controller.extend({
          infographicComponentName: computed('isMarketOpen', {
            get() {
              if (this.get('isMarketOpen')) {
                return 'live-updating-chart';
              } else {
                return 'market-close-summary';
              }
            }
          })
        });
        ```
        
        The `live-updating-chart` component will be appended when `isMarketOpen` is
        `true`, and the `market-close-summary` component will be appended when
        `isMarketOpen` is `false`. If the value changes while the app is running,
        the component will be automatically swapped out accordingly.
        Note: You should not use this helper when you are consistently rendering the same
        component. In that case, use standard component syntax, for example:
        
        ```app/templates/application.hbs
        {{live-updating-chart}}
        ```
        
        ### Block Form
        
        Using the block form of this helper is similar to using the block form
        of a component. Given the following application template:
        
        ```app/templates/application.hbs
        {{#component infographicComponentName}}
          Last update: {{lastUpdateTimestamp}}
        {{/component}}
        ```
        
        The following controller code:
        
        ```app/controllers/application.js
        export default Ember.Controller.extend({
          lastUpdateTimestamp: computed(function() {
            return new Date();
          }),
        
          infographicComponentName: computed('isMarketOpen', {
            get() {
              if (this.get('isMarketOpen')) {
                return 'live-updating-chart';
              } else {
                return 'market-close-summary';
              }
            }
          })
        });
        ```
        
        And the following component template:
        
        ```app/templates/components/live-updating-chart.hbs
        {{! chart }}
        {{yield}}
        ```
        
        The `Last Update: {{lastUpdateTimestamp}}` will be rendered in place of the `{{yield}}`.
        
        ### Nested Usage
        
        The `component` helper can be used to package a component path with initial attrs.
        The included attrs can then be merged during the final invocation.
        For example, given a `person-form` component with the following template:
        
        ```app/templates/components/person-form.hbs
        {{yield (hash
          nameInput=(component "my-input-component" value=model.name placeholder="First Name")
        )}}
        ```
        
        When yielding the component via the `hash` helper, the component is invoked directly.
        See the following snippet:
        
        ```
        {{#person-form as |form|}}
          {{form.nameInput placeholder="Username"}}
        {{/person-form}}
        ```
        
        Which outputs an input whose value is already bound to `model.name` and `placeholder`
        is "Username".
        
        When yielding the component without the hash helper use the `component` helper.
        For example, below is a `full-name` component template:
        
        ```handlebars
        {{yield (component "my-input-component" value=model.name placeholder="Name")}}
        ```
        
        ```
        {{#full-name as |field|}}
          {{component field placeholder="Full name"}}
        {{/full-name}}
        ```
        */
        component(): any;
        /*
        Use the `if` block helper to conditionally render a block depending on a
        property. If the property is "falsey", for example: `false`, `undefined`,
        `null`, `""`, `0`, `NaN` or an empty array, the block will not be rendered.
        
        ```handlebars
        {{! will not render if foo is falsey}}
        {{#if foo}}
          Welcome to the {{foo.bar}}
        {{/if}}
        ```
        
        You can also specify a template to show if the property is falsey by using
        the `else` helper.
        
        ```handlebars
        {{! is it raining outside?}}
        {{#if isRaining}}
          Yes, grab an umbrella!
        {{else}}
          No, it's lovely outside!
        {{/if}}
        ```
        
        You are also able to combine `else` and `if` helpers to create more complex
        conditional logic.
        
        ```handlebars
        {{#if isMorning}}
          Good morning
        {{else if isAfternoon}}
          Good afternoon
        {{else}}
          Good night
        {{/if}}
        ```
        
        You can use `if` inline to conditionally render a single property or string.
        This helper acts like a ternary operator. If the first property is truthy,
        the second argument will be displayed, if not, the third argument will be
        displayed
        
        ```handlebars
        {{if useLongGreeting "Hello" "Hi"}} Dave
        ```
        
        Finally, you can use the `if` helper inside another helper as a subexpression.
        
        ```handlebars
        {{some-component height=(if isBig "100" "10")}}
        ```
        */
        if(): any;
        /*
        The `{{action}}` helper provides a way to pass triggers for behavior (usually
        just a function) between components, and into components from controllers.
        
        ### Passing functions with the action helper
        
        There are three contexts an action helper can be used in. The first two
        contexts to discuss are attribute context, and Handlebars value context.
        
        ```handlebars
        {{! An example of attribute context }}
        <div onclick={{action "save"}}></div>
        {{! Examples of Handlebars value context }}
        {{input on-input=(action "save")}}
        {{yield (action "refreshData") andAnotherParam}}
        ```
        
        In these contexts,
        the helper is called a "closure action" helper. Its behavior is simple:
        If passed a function name, read that function off the `actions` property
        of the current context. Once that function is read (or if a function was
        passed), create a closure over that function and any arguments.
        The resulting value of an action helper used this way is simply a function.
        
        For example, in the attribute context:
        
        ```handlebars
        {{! An example of attribute context }}
        <div onclick={{action "save"}}></div>
        ```
        
        The resulting template render logic would be:
        
        ```js
        var div = document.createElement('div');
        var actionFunction = (function(context){
          return function() {
            return context.actions.save.apply(context, arguments);
          };
        })(context);
        div.onclick = actionFunction;
        ```
        
        Thus when the div is clicked, the action on that context is called.
        Because the `actionFunction` is just a function, closure actions can be
        passed between components and still execute in the correct context.
        
        Here is an example action handler on a component:
        
        ```js
        import Ember from 'ember';
        
        export default Ember.Component.extend({
          actions: {
            save() {
              this.get('model').save();
            }
          }
        });
        ```
        
        Actions are always looked up on the `actions` property of the current context.
        This avoids collisions in the naming of common actions, such as `destroy`.
        Two options can be passed to the `action` helper when it is used in this way.
        
        * `target=someProperty` will look to `someProperty` instead of the current
          context for the `actions` hash. This can be useful when targetting a
          service for actions.
        * `value="target.value"` will read the path `target.value` off the first
          argument to the action when it is called and rewrite the first argument
          to be that value. This is useful when attaching actions to event listeners.
        
        ### Invoking an action
        
        Closure actions curry both their scope and any arguments. When invoked, any
        additional arguments are added to the already curried list.
        Actions should be invoked using the [sendAction](/api/classes/Ember.Component.html#method_sendAction)
        method. The first argument to `sendAction` is the action to be called, and
        additional arguments are passed to the action function. This has interesting
        properties combined with currying of arguments. For example:
        
        ```js
        export default Ember.Component.extend({
          actions: {
            // Usage {{input on-input=(action (action 'setName' model) value="target.value")}}
            setName(model, name) {
              model.set('name', name);
            }
          }
        });
        ```
        
        The first argument (`model`) was curried over, and the run-time argument (`event`)
        becomes a second argument. Action calls can be nested this way because each simply
        returns a function. Any function can be passed to the `{{action}}` helper, including
        other actions.
        
        Actions invoked with `sendAction` have the same currying behavior as demonstrated
        with `on-input` above. For example:
        
        ```app/components/my-input.js
        import Ember from 'ember';
        
        export default Ember.Component.extend({
          actions: {
            setName(model, name) {
              model.set('name', name);
            }
          }
        });
        ```
        
        ```handlebars
        {{my-input submit=(action 'setName' model)}}
        ```
        
        ```app/components/my-component.js
        import Ember from 'ember';
        
        export default Ember.Component.extend({
          click() {
            // Note that model is not passed, it was curried in the template
            this.sendAction('submit', 'bob');
          }
        });
        ```
        
        ### Attaching actions to DOM elements
        
        The third context of the `{{action}}` helper can be called "element space".
        For example:
        
        ```handlebars
        {{! An example of element space }}
        <div {{action "save"}}></div>
        ```
        
        Used this way, the `{{action}}` helper provides a useful shortcut for
        registering an HTML element in a template for a single DOM event and
        forwarding that interaction to the template's context (controller or component).
        If the context of a template is a controller, actions used this way will
        bubble to routes when the controller does not implement the specified action.
        Once an action hits a route, it will bubble through the route hierarchy.
        
        ### Event Propagation
        
        `{{action}}` helpers called in element space can control event bubbling. Note
        that the closure style actions cannot.
        
        Events triggered through the action helper will automatically have
        `.preventDefault()` called on them. You do not need to do so in your event
        handlers. If you need to allow event propagation (to handle file inputs for
        example) you can supply the `preventDefault=false` option to the `{{action}}` helper:
        
        ```handlebars
        <div {{action "sayHello" preventDefault=false}}>
          <input type="file" />
          <input type="checkbox" />
        </div>
        ```
        
        To disable bubbling, pass `bubbles=false` to the helper:
        
        ```handlebars
        <button {{action 'edit' post bubbles=false}}>Edit</button>
        ```
        
        To disable bubbling with closure style actions you must create your own
        wrapper helper that makes use of `event.stopPropagation()`:
        
        ```handlebars
        <div onclick={{disable-bubbling (action "sayHello")}}>Hello</div>
        ```
        
        ```app/helpers/disable-bubbling.js
        import Ember from 'ember';
        
        export function disableBubbling([action]) {
          return function(event) {
            event.stopPropagation();
            return action(event);
          };
        }
        export default Ember.Helper.helper(disableBubbling);
        ```
        
        If you need the default handler to trigger you should either register your
        own event handler, or use event methods on your view class. See
        ["Responding to Browser Events"](/api/classes/Ember.View.html#toc_responding-to-browser-events)
        in the documentation for Ember.View for more information.
        
        ### Specifying DOM event type
        
        `{{action}}` helpers called in element space can specify an event type.
        By default the `{{action}}` helper registers for DOM `click` events. You can
        supply an `on` option to the helper to specify a different DOM event name:
        
        ```handlebars
        <div {{action "anActionName" on="doubleClick"}}>
          click me
        </div>
        ```
        
        See ["Event Names"](/api/classes/Ember.View.html#toc_event-names) for a list of
        acceptable DOM event names.
        
        ### Specifying whitelisted modifier keys
        
        `{{action}}` helpers called in element space can specify modifier keys.
        By default the `{{action}}` helper will ignore click events with pressed modifier
        keys. You can supply an `allowedKeys` option to specify which keys should not be ignored.
        
        ```handlebars
        <div {{action "anActionName" allowedKeys="alt"}}>
          click me
        </div>
        ```
        
        This way the action will fire when clicking with the alt key pressed down.
        Alternatively, supply "any" to the `allowedKeys` option to accept any combination of modifier keys.
        
        ```handlebars
        <div {{action "anActionName" allowedKeys="any"}}>
          click me with any key pressed
        </div>
        ```
        
        ### Specifying a Target
        
        A `target` option can be provided to the helper to change
        which object will receive the method call. This option must be a path
        to an object, accessible in the current context:
        
        ```app/templates/application.hbs
        <div {{action "anActionName" target=someService}}>
          click me
        </div>
        ```
        
        ```app/controllers/application.js
        import Ember from 'ember';
        
        export default Ember.Controller.extend({
          someService: Ember.inject.service()
        });
        ```
        */
        action(): any;
        /*
        Calling ``{{render}}`` from within a template will insert another
        template that matches the provided name. The inserted template will
        access its properties on its own controller (rather than the controller
        of the parent template).
        
        If a view class with the same name exists, the view class also will be used.
        Note: A given controller may only be used *once* in your app in this manner.
        A singleton instance of the controller will be created for you.
        
        Example:
        
        ```javascript
        App.NavigationController = Ember.Controller.extend({
          who: "world"
        });
        ```
        
        ```handlebars
        <!-- navigation.hbs -->
        Hello, {{who}}.
        ```
        
        ```handlebars
        <!-- application.hbs -->
        <h1>My great app</h1>
        {{render "navigation"}}
        ```
        
        ```html
        <h1>My great app</h1>
        <div class='ember-view'>
          Hello, world.
        </div>
        ```
        
        Optionally you may provide a second argument: a property path
        that will be bound to the `model` property of the controller.
        If a `model` property path is specified, then a new instance of the
        controller will be created and `{{render}}` can be used multiple times
        with the same name.
        
        For example if you had this `author` template.
        
        ```handlebars
        <div class="author">
          Written by {{firstName}} {{lastName}}.
          Total Posts: {{postCount}}
        </div>
        ```
        
        You could render it inside the `post` template using the `render` helper.
        
        ```handlebars
        <div class="post">
          <h1>{{title}}</h1>
          <div>{{body}}</div>
          {{render "author" author}}
        </div>
        ```
        */
        render(name: string, context: Object?, options: Hash): string;
        /*
        The `{{outlet}}` helper lets you specify where a child route will render in
        your template. An important use of the `{{outlet}}` helper is in your
        application's `application.hbs` file:
        
        ```handlebars
        {{! app/templates/application.hbs }}
        <!-- header content goes here, and will always display -->
        {{my-header}}
        <div class="my-dynamic-content">
          <!-- this content will change based on the current route, which depends on the current URL -->
          {{outlet}}
        </div>
        <!-- footer content goes here, and will always display -->
        {{my-footer}}
        ```
        
        See [templates guide](https://emberjs.com/guides/templates/the-application-template/) for
        additional information on using `{{outlet}}` in `application.hbs`.
        You may also specify a name for the `{{outlet}}`, which is useful when using more than one
        `{{outlet}}` in a template:
        
        ```handlebars
        {{outlet "menu"}}
        {{outlet "sidebar"}}
        {{outlet "main"}}
        ```
        
        Your routes can then render into a specific one of these `outlet`s by specifying the `outlet`
        attribute in your `renderTemplate` function:
        
        ```javascript
        // app/routes/menu.js
        export default Ember.Route.extend({
          renderTemplate() {
            this.render({ outlet: 'menu' });
          }
        });
        ```
        
        See the [routing guide](https://emberjs.com/guides/routing/rendering-a-template/) for more
        information on how your `route` interacts with the `{{outlet}}` helper.
        Note: Your content __will not render__ if there isn't an `{{outlet}}` for it.
        */
        outlet(name: string): any;
        /*
        Use the `{{with}}` helper when you want to alias a property to a new name. This is helpful
        for semantic clarity as it allows you to retain default scope or to reference a property from another
        `{{with}}` block.
        
        If the aliased property is "falsey", for example: `false`, `undefined` `null`, `""`, `0`, NaN or
        an empty array, the block will not be rendered.
        
        ```handlebars
        {{! Will only render if user.posts contains items}}
        {{#with user.posts as |blogPosts|}}
          <div class="notice">
            There are {{blogPosts.length}} blog posts written by {{user.name}}.
          </div>
          {{#each blogPosts as |post|}}
            <li>{{post.title}}</li>
          {{/each}}
        {{/with}}
        ```
        
        Without the `as` operator, it would be impossible to reference `user.name` in the example above.
        
        NOTE: The alias should not reuse a name from the bound property path.
        
        For example: `{{#with foo.bar as |foo|}}` is not supported because it attempts to alias using
        the first part of the property path, `foo`. Instead, use `{{#with foo.bar as |baz|}}`.
        */
        with(options: any): string;
        /*
        The `{{each-in}}` helper loops over properties on an object.
        
        For example, given a `user` object that looks like:
        
        ```javascript
        {
          "name": "Shelly Sails",
          "age": 42
        }
        ```
        
        This template would display all properties on the `user`
        object in a list:
        
        ```handlebars
        <ul>
        {{#each-in user as |key value|}}
          <li>{{key}}: {{value}}</li>
        {{/each-in}}
        </ul>
        ```
        
        Outputting their name and age.
        */
        "each-in"(): any;
        /*
        The inline `if` helper conditionally renders a single property or string.
        This helper acts like a ternary operator. If the first property is truthy,
        the second argument will be displayed, otherwise, the third argument will be
        displayed
        
        ```handlebars
        {{if useLongGreeting "Hello" "Hi"}} Alex
        ```
        
        You can use the `if` helper inside another helper as a subexpression.
        
        ```handlebars
        {{some-component height=(if isBig "100" "10")}}
        ```
        */
        if(): any;
        /*
        `{{yield}}` denotes an area of a template that will be rendered inside
        of another template.
        
        ### Use with Ember.Component
        
        When designing components `{{yield}}` is used to denote where, inside the component's
        template, an optional block passed to the component should render:
        
        ```application.hbs
        {{#labeled-textfield value=someProperty}}
          First name:
        {{/labeled-textfield}}
        ```
        
        ```components/labeled-textfield.hbs
        <label>
          {{yield}} {{input value=value}}
        </label>
        ```
        
        Result:
        
        ```html
        <label>
          First name: <input type="text" />
        </label>
        ```
        
        Additionally you can `yield` properties into the context for use by the consumer:
        
        ```application.hbs
        {{#labeled-textfield value=someProperty validator=(action 'firstNameValidator') as |validationError|}}
          {{#if validationError}}
            <p class="error">{{ValidationError}}</p>
          {{/if}}
          First name:
        {{/labeled-textfield}}
        ```
        
        ```components/labeled-textfield.hbs
        <label>
          {{yield validationError}} {{input value=value}}
        </label>
        ```
        
        Result:
        
        ```html
        <label>
          <p class="error">First Name must be at least 3 characters long.</p>
          First name: <input type="text" />
        </label>
        ```
        */
        yield(options: Hash): string;
        /*
        The inline `unless` helper conditionally renders a single property or string.
        This helper acts like a ternary operator. If the first property is falsy,
        the second argument will be displayed, otherwise, the third argument will be
        displayed
        
        ```handlebars
        {{unless useLongGreeting "Hi" "Hello"}} Ben
        ```
        
        You can use the `unless` helper inside another helper as a subexpression.
        
        ```handlebars
        {{some-component height=(unless isBig "10" "100")}}
        ```
        */
        unless(): any;
        /*
        Execute the `debugger` statement in the current template's context.
        
        ```handlebars
        {{debugger}}
        ```
        
        When using the debugger helper you will have access to a `get` function. This
        function retrieves values available in the context of the template.
        For example, if you're wondering why a value `{{foo}}` isn't rendering as
        expected within a template, you could place a `{{debugger}}` statement and,
        when the `debugger;` breakpoint is hit, you can attempt to retrieve this value:
        
        ```
        > get('foo')
        ```
        
        `get` is also aware of keywords. So in this situation
        
        ```handlebars
        {{#each items as |item|}}
          {{debugger}}
        {{/each}}
        ```
        
        You'll be able to get values from the current item:
        
        ```
        > get('item.name')
        ```
        
        You can also access the context of the view to make sure it is the object that
        you expect:
        
        ```
        > context
        ```
        */
        debugger(): any;
        /*
        The `partial` helper renders another template without
        changing the template context:
        
        ```handlebars
        {{foo}}
        {{partial "nav"}}
        ```
        
        The above example template will render a template named
        "-nav", which has the same context as the parent template
        it's rendered into, so if the "-nav" template also referenced
        `{{foo}}`, it would print the same thing as the `{{foo}}`
        in the above example.
        
        If a "-nav" template isn't found, the `partial` helper will
        fall back to a template named "nav".
        
        ### Bound template names
        
        The parameter supplied to `partial` can also be a path
        to a property containing a template name, e.g.:
        
        ```handlebars
        {{partial someTemplateName}}
        ```
        
        The above example will look up the value of `someTemplateName`
        on the template context (e.g. a controller) and use that
        value as the name of the template to render. If the resolved
        value is falsy, nothing will be rendered. If `someTemplateName`
        changes, the partial will be re-rendered using the new template
        name.
        */
        partial(partialName: string): any;
    }
}
