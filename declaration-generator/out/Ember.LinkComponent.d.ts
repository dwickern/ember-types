//packages/ember-glimmer/lib/components/link-to.js
declare namespace Ember {
    /*
    `Ember.LinkComponent` renders an element whose `click` event triggers a
    transition of the application's instance of `Ember.Router` to
    a supplied route by name.
    
    `Ember.LinkComponent` components are invoked with {{#link-to}}. Properties
    of this class can be overridden with `reopen` to customize application-wide
    behavior.
    */
    class LinkComponent {
        /*
        Used to determine when this `LinkComponent` is active.
        */
        currentWhen: any;
        /*
        Sets the `title` attribute of the `LinkComponent`'s HTML element.
        */
        title: any;
        /*
        Sets the `rel` attribute of the `LinkComponent`'s HTML element.
        */
        rel: any;
        /*
        Sets the `tabindex` attribute of the `LinkComponent`'s HTML element.
        */
        tabindex: any;
        /*
        Sets the `target` attribute of the `LinkComponent`'s HTML element.
        */
        target: any;
        /*
        The CSS class to apply to `LinkComponent`'s element when its `active`
        property is `true`.
        */
        activeClass: string;
        /*
        Determines whether the `LinkComponent` will trigger routing via
        the `replaceWith` routing strategy.
        */
        replace: boolean;
        /*
        By default the `{{link-to}}` component will bind to the `href` and
        `title` attributes. It's discouraged that you override these defaults,
        however you can push onto the array if needed.
        */
        attributeBindings: Array | string;
        /*
        By default the `{{link-to}}` component will bind to the `active`, `loading`,
        and `disabled` classes. It is discouraged to override these directly.
        */
        classNameBindings: Array;
    }
}
