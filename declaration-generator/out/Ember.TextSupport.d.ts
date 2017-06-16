//packages/ember-views/lib/mixins/text_support.js
declare namespace Ember {
    /*
    `TextSupport` is a shared mixin used by both `Ember.TextField` and
    `Ember.TextArea`. `TextSupport` adds a number of methods that allow you to
    specify a controller action to invoke when a certain event is fired on your
    text field or textarea. The specifed controller action would get the current
    value of the field passed in as the only argument unless the value of
    the field is empty. In that case, the instance of the field itself is passed
    in as the only argument.
    
    Let's use the pressing of the escape key as an example. If you wanted to
    invoke a controller action when a user presses the escape key while on your
    field, you would use the `escape-press` attribute on your field like so:
    
    ```handlebars
      {{! application.hbs}}
    
      {{input escape-press='alertUser'}}
    ```
    
    ```javascript
        App = Ember.Application.create();
    
        App.ApplicationController = Ember.Controller.extend({
          actions: {
            alertUser: function ( currentValue ) {
              alert( 'escape pressed, current value: ' + currentValue );
            }
          }
        });
    ```
    
    The following chart is a visual representation of what takes place when the
    escape key is pressed in this scenario:
    
    ```
    The Template
    +---------------------------+
    |                           |
    | escape-press='alertUser'  |
    |                           |          TextSupport Mixin
    +----+----------------------+          +-------------------------------+
         |                                 | cancel method                 |
         |      escape button pressed      |                               |
         +-------------------------------> | checks for the `escape-press` |
                                           | attribute and pulls out the   |
         +-------------------------------+ | `alertUser` value             |
         |     action name 'alertUser'     +-------------------------------+
         |     sent to controller
         v
    Controller
    +------------------------------------------ +
    |                                           |
    |  actions: {                               |
    |     alertUser: function( currentValue ){  |
    |       alert( 'the esc key was pressed!' ) |
    |     }                                     |
    |  }                                        |
    |                                           |
    +-------------------------------------------+
    ```
    
    Here are the events that we currently support along with the name of the
    attribute you would need to use on your field. To reiterate, you would use the
    attribute name like so:
    
    ```handlebars
      {{input attribute-name='controllerAction'}}
    ```
    
    ```
    +--------------------+----------------+
    |                    |                |
    | event              | attribute name |
    +--------------------+----------------+
    | new line inserted  | insert-newline |
    |                    |                |
    | enter key pressed  | insert-newline |
    |                    |                |
    | cancel key pressed | escape-press   |
    |                    |                |
    | focusin            | focus-in       |
    |                    |                |
    | focusout           | focus-out      |
    |                    |                |
    | keypress           | key-press      |
    |                    |                |
    | keyup              | key-up         |
    |                    |                |
    | keydown            | key-down       |
    +--------------------+----------------+
    ```
    */
    private class TextSupport {
    }
}
