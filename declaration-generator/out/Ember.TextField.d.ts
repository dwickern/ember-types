//packages/ember-glimmer/lib/components/text_field.js
declare namespace Ember {
    /*
    The internal class used to create text inputs when the `{{input}}`
      helper is used with `type` of `text`.
    See [Ember.Templates.helpers.input](/api/classes/Ember.Templates.helpers.html#method_input)  for usage details.
    ## Layout and LayoutName properties
    Because HTML `input` elements are self closing `layout` and `layoutName`
      properties will not be applied. See [Ember.View](/api/classes/Ember.View.html)'s
      layout section for more information.
    */
    class TextField {
        /*
        The `value` attribute of the input element. As the user inputs text, this
        property is updated live.
        */
        value: string;
        /*
        The `type` attribute of the input element.
        */
        type: string;
        /*
        The `size` of the text field in characters.
        */
        size: string;
        /*
        The `pattern` attribute of input element.
        */
        pattern: string;
        /*
        The `min` attribute of input element used with `type="number"` or `type="range"`.
        */
        min: string;
        /*
        The `max` attribute of input element used with `type="number"` or `type="range"`.
        */
        max: string;
    }
}
